import type { Project } from "@/domain/project";

export interface FormProps {
  isLoading?: boolean;
  project?: Project;
  errors?: { title: string; description?: string };
}

export interface TouchedInputProps {
  title: boolean;
  description: boolean;
}
