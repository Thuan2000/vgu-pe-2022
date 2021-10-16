import BuyingRequest from "@models/BuyingRequest";
import { IProjectInput } from "../graphql/types";
import Project from "../models/Project";
import { uploadImage } from "../repositories/uploads.repository";
import { errorResponse, RESPONSE_MESSAGE, successResponse } from "../utils";

function setBuyingRequestsProject(
	buyingRequests: BuyingRequest[],
	projectId: number
) {
	buyingRequests.forEach(br => {
		const currentProjects = br.getDataValue("projectIds");
		br.setDataValue(
			"projectIds",
			!currentProjects ? [projectId] : [...currentProjects, projectId]
		);
		br.save();
	});
}

class ProjectController {
	async getProjects(companyId: number) {
		const projects = await Project.findAll({
			where: { companyId },
			limit: 15
		});

		return projects;
	}

	async createProject(project: IProjectInput) {
		const duplicateProject = await Project.findOne({
			where: { name: project.name, companyId: project.companyId }
		});
		if (duplicateProject) return errorResponse(RESPONSE_MESSAGE.DUPLICATE);

		const newProject = await Project.create(project);
		if (project.image) {
			uploadImage(project.companyName, project.image).then(
				projectImage => {
					newProject.setDataValue("image", projectImage);
				}
			);
		}

		newProject.save();

		const buyingRequests = await BuyingRequest.findAll({
			where: { id: project.buyingRequests }
		});

		setBuyingRequestsProject(buyingRequests, newProject.getDataValue("id"));
		console.log("Returning response");

		return successResponse();
	}
}

export default ProjectController;
