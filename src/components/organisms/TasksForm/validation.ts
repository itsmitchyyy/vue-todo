import * as Yup from "yup";

export const AddTaskSchema = Yup.object().shape({
  title: Yup.string().required("Task Name is required"),
  projectId: Yup.number()
    .required("Project is required")
    .test("isDefaultValue", "Project is required", (value) => {
      return value !== 0;
    }),
});
