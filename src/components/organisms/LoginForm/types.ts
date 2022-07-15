export interface FormProps {
  errors?: LoginFormProps;
  isLoading?: boolean;
}

export interface LoginFormProps {
  email: string;
  password: string;
}

export interface TouchedInputProps {
  email: boolean;
  password: boolean;
}
