import http from "./http.service";
import { UserRequest } from "@/models/user.model";

class UserService {
  private _userUrl = "/users/me";

  public get(): Promise<any> {
    return http.get(this._userUrl);
  }

  public update(req: UserRequest): Promise<any> {
    return http.put(`${this._userUrl}/update`, req);
  }
}

export default new UserService();
