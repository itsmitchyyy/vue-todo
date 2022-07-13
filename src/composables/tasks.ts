import { ref } from "vue";
import axiosInstance from "@/utils/axiosInstance";
import urls from "@/constants/urls";
import { useTaskStore } from "@/stores/task";
import type { AddTask } from "@/domain/task";

export const useTask = () => {
  const tasksStore = useTaskStore();

  const useFetchTasks = () => {
    const isFetchingTasks = ref<boolean>(false);
    const fetchTasks = async () => {
      try {
        isFetchingTasks.value = true;

        const response = await axiosInstance.get(urls.task.tasks);

        tasksStore.setTasks(response.data.data);
        isFetchingTasks.value = false;
      } catch (error) {
        isFetchingTasks.value = false;
      }
    };

    return { fetchTasks, isFetchingTasks };
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

        tasksStore.addTask(response.data.data);
        isAddingTask.value = false;
      } catch (error: any) {
        isAddingTask.value = false;
      }
    };

    return { addTask, isAddingTask };
  };

  return { useFetchTasks, useAddTask, tasksStore };
};
