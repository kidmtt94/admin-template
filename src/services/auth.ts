import { cookies } from "next/headers";

export interface IAuthService {
  login(email: string, password: string): Promise<boolean>;
  logout(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
}

export class SimpleLoginService implements IAuthService {
  async login(email: string, password: string): Promise<boolean> {
    const validEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const validPassword = process.env.ADMIN_PASSWORD || "password123";
    
    if (email === validEmail && password === validPassword) {
      // Mocking session server-side using next/headers cookies
      const cookieStore = await cookies();
      cookieStore.set("auth_token", "mock_token", { httpOnly: true, path: "/" });
      return true;
    }
    throw new Error("Invalid email or password");
  }

  async logout(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
  }

  async isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    return cookieStore.has("auth_token");
  }
}

// Export a singleton instance of the service
export const authService: IAuthService = new SimpleLoginService();
