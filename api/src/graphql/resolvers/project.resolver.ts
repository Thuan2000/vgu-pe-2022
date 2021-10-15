import ProjectController from "../../controllers/project.controller";

const projectController = new ProjectController();

export const Query = {
	projects: (_, { companyId }) => projectController.getProjects(companyId)
};

export const Mutation = {
	createProject: (_, { input }) => projectController.createProject(input)
};
