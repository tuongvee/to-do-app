import http from "./http.service";
import { TaskDetailRequest } from "@/models/task.model";

class TaskDetailService {
  public add(req: TaskDetailRequest, id: number): Promise<any> {
    return http.post(`/tasks/${id}/tasks_detail/store`, req);
  }

  public update(req: TaskDetailRequest, id: number): Promise<any> {
    return http.put(`/tasks-detail/${id}`, req);
  }

  public delete(id: number): Promise<any> {
    return http.delete(`/tasks-detail/${id}`);
  }
}

export default new TaskDetailService();
