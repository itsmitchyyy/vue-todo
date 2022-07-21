import * as Yup from "yup";

export const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});
