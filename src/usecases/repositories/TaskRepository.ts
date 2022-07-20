import type { AddTask, Task } from "@/domain/task";

export default interface TaskRepository {
  fetchTasks: (search?: string) => Promise<Task[]>;
  fetchTask: (id: number) => Promise<Task>;
  addTask: (task: AddTask) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  updateTask: (task: AddTask & { id: number }) => Promise<Task>;
}
