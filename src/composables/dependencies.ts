import urls from "@/constants/urls";
import HttpAdapterAxiosImpl from "@/interface/adapters/HttpAdapterAxiosImpl";
import axiosInstance from "@/utils/axiosInstance";
import TaskRepositoryImpl from "@/interface/repositories/TaskRepositoryImpl";
import tasksUseCases from "@/usecases/modules/tasks";
import projectsUseCases from "@/usecases/modules/projects";
import authUseCases from "@/usecases/modules/auth";
import ProjectRepositoryImpl from "@/interface/repositories/ProjectRepositoryImpl";
import AuthServiceRestImpl from "@/interface/services/AuthServiceRestImpl";

const { task: taskUrls, project: projectUrls, auth: authUrls } = urls;

const httpAdapter = new HttpAdapterAxiosImpl(axiosInstance);
const taskRepository = new TaskRepositoryImpl(httpAdapter, taskUrls);
const projectRepository = new ProjectRepositoryImpl(httpAdapter, projectUrls);
const authService = new AuthServiceRestImpl(httpAdapter, authUrls);

const taskInteractor = tasksUseCases({ taskRepository });
const projectInteractor = projectsUseCases({ projectRepository });
const authInteractor = authUseCases({ authService });

export { taskInteractor, projectInteractor, authInteractor };
