import http from "./http.service";
import { TaskRequest } from "@/models/task.model";

class TaskService {
  private _taskUrl = "/users/me/tasks";
  private _modifyTaskUrl = "/tasks";

  public get(): Promise<any> {
    return http.get(`${this._taskUrl}/all`);
  }

  public add(req: TaskRequest): Promise<any> {
    return http.post(`${this._taskUrl}/store`, req);
  }

  public update(req: TaskRequest, id: number): Promise<any> {
    return http.put(`${this._modifyTaskUrl}/${id}`, req);
  }

  public delete(id: number): Promise<any> {
    return http.delete(`${this._modifyTaskUrl}/${id}`);
  }
}

export default new TaskService();
