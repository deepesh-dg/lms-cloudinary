import { ID } from "appwrite";
import AppwriteService from "./Appwrite";
import axios from "axios";

export class AuthService extends AppwriteService {
  /**
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return {
        success: true,
        msg: "Logged in successfully...",
        data: session,
      };
    } catch (error) {
      return {
        success: false,
        msg: String(error?.message) || "Login failed...",
      };
    }
  }

  /**
   * @param { { email: string; password: string; name?: string; role?: "teacher" | "student" } } param0
   */
  async register({ email, password, name, role = "student" }) {
    try {
      const [user, axiosResponse] = await Promise.all([
        this.account.create(ID.unique(), email, password, name),
        // A team supports variery of roles which we can define. in this case we are defining "teacher" and "student" role. we can create users and add the into a team where the have their specific role.
        axios.post("/api/teams", {
          teamId: "lms",
          teamName: "LMS",
          roles: ["teacher", "student"],
        }),
      ]);

      const teamResponse = axiosResponse.data;

      if (!teamResponse.success) throw teamResponse;

      // Adding created user to team
      const member = await axios.patch("/api/teams", {
        teamId: teamResponse.data.$id,
        role: role,
        userId: user.$id,
      });

      const loginResponse = await this.login(user.email, password);

      return loginResponse;
    } catch (error) {
      return {
        success: false,
        msg: String(error?.message) || "Register failed...",
      };
    }
  }

  async getLoggedinUserDetails() {
    try {
      const user = await this.account.get();
      const axiosResponse = await axios.get("/api/teams", {
        params: {
          teamId: "lms",
          userId: user.$id,
        },
      });

      const membershipResponse = axiosResponse.data;

      if (!membershipResponse.success) throw membershipResponse;

      return {
        success: true,
        msg: "Account fetching successfully",
        data: {
          user: user,
          member: membershipResponse.data,
        },
      };
    } catch (error) {
      return {
        success: false,
        msg: String(error?.message) || "Error fetching details...",
      };
    }
  }

  async logout() {
    try {
      const data = await this.account.deleteSessions();

      return {
        success: true,
        msg: "Logged out successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        msg: String(error?.message) || "Logout failed...",
      };
    }
  }
}

const authService = new AuthService();

export default authService;
