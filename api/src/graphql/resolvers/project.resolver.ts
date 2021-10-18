import ProjectController from "../../controllers/project.controller";

const projectController = new ProjectController();

export const Query = {
	projects: (_, { companyId, offset }) =>
		projectController.getProjects(companyId, offset)
};

export const Mutation = {
	createProject: (_, { input }) => projectController.createProject(input),
	deleteProject: (_, { id }) => projectController.deleteProject(id),
	addToProject: (_, { projectId, buyingRequests }) =>
		projectController.addToProject(projectId, buyingRequests)
};
