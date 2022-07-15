import urls from "@/constants/urls";
import type { AddProject, Project } from "@/domain/project";
import { useProjectStore } from "@/stores/project";
import axiosInstance from "@/utils/axiosInstance";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export const useProject = () => {
  const projectStore = useProjectStore();
  const { project, projects } = storeToRefs(projectStore);
  const errors = ref<any>();
  const isSuccess = ref<boolean>(false);

  const useAddProject = () => {
    const isAddingProject = ref<boolean>(false);

    const addProject = async (project: AddProject) => {
      try {
        isAddingProject.value = true;

        const response = await axiosInstance.post(urls.project.projects, {
          title: project.title,
          description: project.description,
        });

        projectStore.addProject(response.data.data);
        isSuccess.value = true;
        isAddingProject.value = false;
      } catch (error: any) {
        if (error?.response?.status === 422) {
          errors.value = error.response.data.errors;
        }
        isSuccess.value = false;
        isAddingProject.value = false;
      }
    };

    return { addProject, isAddingProject };
  };

  const useFetchProjects = () => {
    const isFetchingProjects = ref<boolean>(false);

    const fetchProjects = async () => {
      try {
        isFetchingProjects.value = true;

        const response = await axiosInstance.get(urls.project.projects);

        projectStore.setProjects(response.data.data);
        isSuccess.value = true;
        isFetchingProjects.value = false;
      } catch (error: any) {
        if (error?.response?.status === 422) {
          errors.value = error.response.data.errors;
        }
        isSuccess.value = false;
        isFetchingProjects.value = false;
      }
    };

    const fetchProject = async (id: string) => {
      try {
        isFetchingProjects.value = true;
        const response = await axiosInstance.get(
          urls.project.project(Number(id)),
        );

        projectStore.setProject(response.data.data);
        isSuccess.value = true;
        isFetchingProjects.value = false;
      } catch (error: any) {
        if (error?.response?.status === 422) {
          errors.value = error.response.data.errors;
        }
        isSuccess.value = false;
        isFetchingProjects.value = false;
      }
    };

    return { fetchProjects, fetchProject, isFetchingProjects };
  };

  const useDeleteProject = () => {
    const isDeletingProject = ref<boolean>(false);

    const deleteProject = async (id: number) => {
      try {
        isDeletingProject.value = true;

        await axiosInstance.delete(urls.project.project(id));

        projectStore.deleteProject(id);
        isSuccess.value = true;
        isDeletingProject.value = false;
      } catch (error: any) {
        if (error?.response?.status === 422) {
          errors.value = error.response.data.errors;
        }
        isSuccess.value = false;
        isDeletingProject.value = false;
      }
    };

    return { deleteProject, isDeletingProject };
  };

  const useUpdateProject = () => {
    const isUpdatingProject = ref<boolean>(false);

    const updateProject = async (project: Project) => {
      try {
        isUpdatingProject.value = true;

        const response = await axiosInstance.put(
          urls.project.project(project.id),
          project,
        );

        projectStore.updateProject(response.data.data);
        isSuccess.value = true;
        isUpdatingProject.value = false;
      } catch (error: any) {
        if (error?.response?.status === 422) {
          errors.value = error.response.data.errors;
        }
        isSuccess.value = false;
        isUpdatingProject.value = false;
      }
    };

    return { updateProject, isUpdatingProject };
  };

  return {
    useAddProject,
    useFetchProjects,
    useDeleteProject,
    useUpdateProject,
    isSuccess,
    project,
    projects,
    errors,
  };
};
