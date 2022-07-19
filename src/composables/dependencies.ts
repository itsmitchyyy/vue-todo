import urls from "@/constants/urls";
import HttpAdapterAxiosImpl from "@/interface/adapters/HttpAdapterAxiosImpl";
import axiosInstance from "@/utils/axiosInstance";
import TaskRepositoryImpl from "@/interface/repositories/TaskRepositoryImpl";
import tasksUseCases from "@/usecases/modules/tasks";

const { task: taskUrls } = urls;

const httpAdapter = new HttpAdapterAxiosImpl(axiosInstance);
const taskRepository = new TaskRepositoryImpl(httpAdapter, taskUrls);

const taskInteractor = tasksUseCases({ taskRepository });

export { taskInteractor };
