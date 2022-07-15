export interface FormProps {
  errors?: { name?: string; email: string; password: string };
  isLoading?: boolean;
}

export interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
}

export interface TouchedInputProps {
  email: boolean;
  name: boolean;
  password: boolean;
}
