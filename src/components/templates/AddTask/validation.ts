import Yup from "yup";

export const AddTaskSchema = Yup.object().shape({
  name: Yup.string().required("Task Name is required"),
  projectId: Yup.string().test(
    "isDefaultValue",
    "Project is required",
    (value) => {
      console.log(value);

      return false;
    },
  ),
});
