import BuyingRequest from "@models/BuyingRequest";
import User from "@models/User";
import {
	IProjectBrInput,
	ICreateProjectInput,
	IProjectBr
} from "../graphql/types";
import Project from "../models/Project";
import { uploadImage } from "../repositories/uploads.repository";
import {
	errorResponse,
	generateSlug,
	PROJECTS_GET_LIMIT,
	RESPONSE_MESSAGE,
	successResponse
} from "../utils";

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

function removeBrProject(buyingRequests: BuyingRequest[], projectId: number) {
	buyingRequests.forEach(br => {
		const currentProjects: string[] = br.getDataValue("projectIds");

		if (!currentProjects) return;
		const newProjectIds =
			currentProjects.filter(cp => parseInt(cp) !== projectId) || [];
		br.setDataValue("projectIds", newProjectIds);
		br.save();
	});
}

class ProjectController {
	async getProjects(companyId: number, offset: number) {
		const { rows: projects, count } = await Project.findAndCountAll({
			where: { companyId },
			offset: offset,
			limit: PROJECTS_GET_LIMIT
		});
		return { projects, count };
	}

	async getProject(slug: string) {
		const project = await Project.findOne({
			where: { slug }
		});

		const createdBy = await User.findOne({
			where: { id: project.getDataValue("createdById") }
		});

		let updatedBy;
		const updatedById = project.getDataValue("updatedById");

		if (updatedById)
			updatedBy = await User.findOne({
				where: { id: updatedById }
			});

		return { project, createdBy, updatedBy };
	}

	async addToProject(projectId: number, buyingRequests: IProjectBrInput[]) {
		try {
			const project = await Project.findOne({ where: { id: projectId } });

			const currentBrs = project.getDataValue("buyingRequests");

			project.setDataValue(
				"buyingRequests",
				!!currentBrs?.length
					? [...currentBrs, ...buyingRequests]
					: buyingRequests
			);
			project.save();

			return successResponse();
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	async createProject({ name, ...project }: ICreateProjectInput) {
		const duplicateProject = await Project.findOne({
			where: { name, companyId: project.companyId }
		});
		if (duplicateProject) return errorResponse(RESPONSE_MESSAGE.DUPLICATE);

		const newProject = await Project.create({
			name,
			slug: generateSlug(name),
			...project
		});

		if (project.image) {
			uploadImage(project.companyName, project.image).then(
				projectImage => {
					newProject.setDataValue("image", projectImage);
					newProject.save();
				}
			);
		}

		const brIds = project.buyingRequests.map(br => br.id);
		const buyingRequests = await BuyingRequest.findAll({
			where: { id: brIds }
		});

		setBuyingRequestsProject(buyingRequests, newProject.getDataValue("id"));

		return newProject.save().then(() => successResponse());
	}

	async deleteProjects(ids: number[]) {
		try {
			await Project.findAll({ where: { id: ids } });

			return successResponse();
		} catch (error) {
			console.log(error);

			return errorResponse();
		}
	}

	async deleteProject(id: number) {
		try {
			const project = await Project.findByPk(id);

			const buyingRequests = project.getDataValue("buyingRequests");

			if (buyingRequests) {
				removeBrProject(buyingRequests, id);
			}

			return successResponse();
		} catch (error) {
			console.log(error);

			return errorResponse();
		}
	}

	async removeRequestFromProject(id: number, brIds: number[]) {
		try {
			const project = await Project.findByPk(id);

			const projectBrs: IProjectBr[] = project.getDataValue(
				"buyingRequests"
			);

			const newProjectBrs = projectBrs.filter(pbr => {
				const idx = brIds.findIndex(
					brId => brId === parseInt(pbr.id + "")
				);

				return idx === -1;
			});

			const buyingRequests = await BuyingRequest.findAll({
				where: { id: brIds }
			});
			removeBrProject(buyingRequests, id);

			project.setDataValue("buyingRequests", newProjectBrs);

			return project.save().then(() => successResponse());
		} catch (error) {
			console.log(error);
		}
	}
}

export default ProjectController;
