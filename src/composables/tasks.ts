import { ref } from "vue";
import axiosInstance from "@/utils/axiosInstance";
import urls from "@/constants/urls";
import { useTaskStore } from "@/stores/task";
import type { AddTask } from "@/domain/task";
import { storeToRefs } from "pinia";

export const useTask = () => {
  const authStore = useTaskStore();
  const { tasks, task } = storeToRefs(authStore);

  const useFetchTasks = () => {
    const isFetchingTasks = ref<boolean>(false);
    const fetchTasks = async () => {
      try {
        isFetchingTasks.value = true;

        const response = await axiosInstance.get(urls.task.tasks);

        authStore.setTasks(response.data.data);
        isFetchingTasks.value = false;
      } catch (error) {
        isFetchingTasks.value = false;
      }
    };

    const fetchTask = async (id: number) => {
      try {
        isFetchingTasks.value = true;
        const response = await axiosInstance.get(urls.task.task(id));

        authStore.setTask(response.data.data);
        isFetchingTasks.value = false;
      } catch (error: any) {
        isFetchingTasks.value = false;
      }
    };

    return { fetchTasks, fetchTask, isFetchingTasks };
  };

  const useAddTask = () => {
    const isAddingTask = ref<boolean>(false);
    const addTask = async (task: AddTask) => {
      try {
        isAddingTask.value = true;
        const { projectId, ...payload } = task;
        const response = await axiosInstance.post(urls.task.tasks, {
          ...payload,
          project_id: projectId,
        });

        authStore.addTask(response.data.data);
        isAddingTask.value = false;
      } catch (error: any) {
        isAddingTask.value = false;
      }
    };

    return { addTask, isAddingTask };
  };

  const useDeleteTask = () => {
    const isDeletingTask = ref<boolean>(false);
    const deleteTask = async (id: number) => {
      try {
        isDeletingTask.value = true;

        await axiosInstance.delete(urls.task.task(id));

        authStore.deleteTask(id);
        isDeletingTask.value = false;
      } catch (error: any) {
        isDeletingTask.value = false;
      }
    };

    return { isDeletingTask, deleteTask };
  };

  const useUpdateTask = () => {
    const isUpdatingTask = ref<boolean>(false);
    const updateTask = async (task: AddTask & { id: number }) => {
      try {
        isUpdatingTask.value = true;

        const { projectId, ...payload } = task;
        const response = await axiosInstance.put(urls.task.task(task.id), {
          ...payload,
          project_id: projectId,
        });

        authStore.updateTask(response.data.data);
        isUpdatingTask.value = false;
      } catch (error: any) {
        isUpdatingTask.value = false;
      }
    };

    return { isUpdatingTask, updateTask };
  };

  return {
    useFetchTasks,
    useAddTask,
    useDeleteTask,
    useUpdateTask,
    tasks,
    task,
  };
};
