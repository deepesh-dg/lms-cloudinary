import { ID } from "appwrite";
import { account } from "./config/appwrite";
import axios from "axios";

export default class AuthService {
  /**
   * @param {string} email
   * @param {string} password
   */
  static async login(email, password) {
    try {
      const session = await account.createEmailSession(email, password);
      return {
        success: true,
        data: session,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Login failed...",
      };
    }
  }

  /**
   * @param { { email: string; password: string; name?: string; role?: "teacher" | "student" } } param0
   */
  static async register({ email, password, name, role = "student" }) {
    try {
      const [user, axiosResponse] = await Promise.all([
        account.create(ID.unique(), email, password, name),
        // A team supports variery of roles which we can define. in this case we are defining "teacher" and "student" role. we can create users and add the into a team where the have their specific role.
        axios.post("/api/teams", {
          teamId: "lms",
          teamName: "LMS",
          roles: ["teacher", "student"],
        }),
      ]);

      const teamResponse = axiosResponse.data;

      if (!teamResponse.success) throw new Error(teamResponse.message);

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
        message: error?.message || "Register failed...",
      };
    }
  }

  static async getLoggedinUserDetails() {
    try {
      const user = await account.get();
      const axiosResponse = await axios.get("/api/teams", {
        params: {
          teamId: "lms",
          userId: user.$id,
        },
      });

      const membershipResponse = axiosResponse.data;

      if (!membershipResponse.success)
        throw new Error(membershipResponse.message);

      return {
        success: true,
        message: "Account fetching successfully",
        data: {
          user: user,
          member: membershipResponse.data,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Error fetching details...",
      };
    }
  }

  static async logout() {
    try {
      const data = await account.deleteSessions();

      return {
        success: true,
        message: "Logged out successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Logout failed...",
      };
    }
  }
}
