import type { AddTask } from "@/domain/task";

export interface FormProps {
  errors?: {
    title: string;
    description?: string;
    project_id: string;
  };
  isLoading?: boolean;
  task?: AddTask;
}

export interface TouchedInputProps {
  title: boolean;
  description: boolean;
  project_id: boolean;
}
