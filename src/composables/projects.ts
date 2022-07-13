import urls from "@/constants/urls";
import type { AddProject, Project } from "@/domain/project";
import { useProjectStore } from "@/stores/project";
import axiosInstance from "@/utils/axiosInstance";
import { ref } from "vue";

export const useProject = () => {
  const projectStore = useProjectStore();

  const useAddProject = () => {
    const isAddingProject = ref<boolean>(false);
    const errors = ref<{ name: string; description?: string }>({
      name: "",
      description: "",
    });

    const addProject = async (project: AddProject) => {
      try {
        isAddingProject.value = true;

        const response = await axiosInstance.post(urls.project.projects, {
          title: project.title,
          description: project.description,
        });

        projectStore.addProject(response.data.data);
        isAddingProject.value = false;
      } catch (error: any) {
        if (error?.response?.status === 422) {
          setErrors(error.response.data.errors);
        }
        isAddingProject.value = false;
      }
    };

    const setErrors = (errorValue: { name: string; description?: string }) => {
      errors.value = errorValue;
    };

    return { addProject, setErrors, isAddingProject };
  };

  const useFetchProjects = () => {
    const isFetchingProjects = ref<boolean>(false);

    const fetchProjects = async () => {
      try {
        isFetchingProjects.value = true;

        const response = await axiosInstance.get(urls.project.projects);

        projectStore.setProjects(response.data.data);
        isFetchingProjects.value = false;
      } catch (error: any) {
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
        isFetchingProjects.value = false;
      } catch (error) {
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
        isDeletingProject.value = false;
      } catch (error: any) {
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

        await axiosInstance.put(urls.project.project(project.id), project);

        projectStore.updateProject(project);
        isUpdatingProject.value = false;
      } catch (error: any) {
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
    projectStore,
  };
};
