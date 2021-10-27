import ProjectController from "../../controllers/project.controller";

const projectController = new ProjectController();

export const Query = {
	projects: (_, { companyId, offset }) =>
		projectController.getProjects(companyId, offset),
	project: (_, { slug }) => projectController.getProject(slug)
};

export const Mutation = {
	createProject: (_, { input }) => projectController.createProject(input),
	deleteProject: (_, { id }) => projectController.deleteProject(id),
	deleteProjects: (_, { ids }) => projectController.deleteProjects(ids),
	addToProject: (_, { projectId, buyingRequests }) =>
		projectController.addToProject(projectId, buyingRequests),
	updateBuyingRequests: (_, { id, brIds }) =>
		projectController.updateBuyingRequests(id, brIds)
};
