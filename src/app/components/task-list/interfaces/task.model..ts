import { TaskStatus } from "../enum/taskState";

export interface Task {
  taskId?: string;
  name: string;
  estado?: TaskStatus;
  proyectoId?: string;
  projectName?: string;
}
