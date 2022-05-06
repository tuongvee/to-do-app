import { LoginRequest, RegisterRequest } from "@/models/auth.model";
import http from "./http.service";

class AuthService {
  private _authUrl = "/auth";

  public login(req: LoginRequest): Promise<any> {
    return http.post(`${this._authUrl}/login`, req);
  }

  public register(req: RegisterRequest): Promise<any> {
    return http.post(`${this._authUrl}/register`, req);
  }
}

export default new AuthService();
