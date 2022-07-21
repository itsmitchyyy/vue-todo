import * as Yup from "yup";

export const AddProjectSchema = Yup.object().shape({
  title: Yup.string().required("Project Name is required"),
});
