import conf from "@/conf";
import { Account, Client, Databases, ID } from "appwrite";

export class AppwriteClientService {
  /** @type {Client} */
  client;

  /** @type {Databases} */
  databases;

  /** @type {Account} */
  account;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(conf.appwrite.url)
      .setProject(conf.appwrite.projectId);

    this.databases = new Databases(this.client);
    this.account = new Account(this.client);
  }

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
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      const loginResponse = await this.login(user.email, password);

      await this.account.updatePrefs({
        role: role,
      });

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

      return {
        success: true,
        msg: "Account fetching successfully",
        data: user,
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

const appwriteClientService = new AppwriteClientService();

export default appwriteClientService;
