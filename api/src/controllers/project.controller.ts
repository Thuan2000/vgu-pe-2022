import BuyingRequest from "@models/BuyingRequest";
import User from "@models/User";
import { ICreateProjectInput } from "../graphql/types";
import Project from "../models/Project";
import UploaderRepository from "../repositories/uploads.repository";
import {
	errorResponse,
	generateSlug,
	PROJECTS_GET_LIMIT,
	RESPONSE_MESSAGE,
	successResponse
} from "../utils";

class ProjectController {
	async getProjects(companyId: number, offset: number) {
		const { rows: projects, count } = await Project.findAndCountAll({
			where: { companyId },
			offset: offset,
			limit: PROJECTS_GET_LIMIT,
			include: [
				{ model: User, as: "createdBy" },
				{
					model: BuyingRequest,
					attributes: ["id", "gallery"]
				}
			]
		});

		return { projects, count };
	}

	async getProject(slug: string) {
		const project = await Project.findOne({
			where: { slug },
			include: [
				{ model: User, as: "createdBy" },
				{
					model: User,
					as: "updatedBy",
					association: Project.belongsTo(User, {
						foreignKey: "updatedById"
					})
				},
				{
					model: BuyingRequest,
					attributes: [
						"id",
						"name",
						"createdAt",
						"updatedAt",
						"location",
						"minOrder",
						"unit",
						"status",
						"gallery",
						"endDate",
						"slug"
					]
				}
			]
		});

		console.log(project);

		return project;
	}

	async addToProject(projectId: number, buyingRequests: number[]) {
		try {
			const project = await Project.findOne({ where: { id: projectId } });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(project as any).setBuyingRequests(buyingRequests);

			await project.save();

			return successResponse();
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	async createProject({
		name,
		buyingRequests,
		...project
	}: ICreateProjectInput) {
		const duplicateProject = await Project.findOne({
			where: { name, companyId: project.companyId }
		});
		if (duplicateProject) return errorResponse(RESPONSE_MESSAGE.DUPLICATE);

		const newProject = await Project.create({
			name,
			slug: generateSlug(name),
			...project
		});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(newProject as any).setBuyingRequests(buyingRequests);

		// if (project.image) {
		// 	UploaderRepository.uploadImage(
		// 		project.companyName,
		// 		project.image
		// 	).then(projectImage => {
		// 		newProject.setDataValue("image", projectImage);
		// 		newProject.save();
		// 	});
		// }

		return newProject.save().then(() => successResponse());
	}

	async deleteProjects(ids: number[]) {
		try {
			return Project.destroy({ where: { id: ids } }).then(() =>
				successResponse()
			);
		} catch (error) {
			console.log(error);

			return errorResponse();
		}
	}

	async deleteProject(id: number) {
		try {
			return Project.destroy({ where: { id } }).then(() =>
				successResponse()
			);
		} catch (error) {
			console.log(error);

			return errorResponse();
		}
	}

	async updateBuyingRequests(id: number, brIds: number[]) {
		try {
			const project = await Project.findByPk(id);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(project as any).setBuyingRequests(brIds);

			return project.save().then(() => successResponse());
		} catch (error) {
			console.log(error);
		}
	}
}

export default ProjectController;
