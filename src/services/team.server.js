import { teams } from "./config/node-appwrite";

export default class TeamService {
  /**
   * @param {string} teamId
   */
  static async getTeam(teamId) {
    try {
      const team = await teams.get(teamId);

      return {
        success: true,
        data: team,
      };
    } catch (error) {
      return {
        success: true,
        message: error?.message || "Error fetching team detail...",
      };
    }
  }

  /**
   * @param {string} teamId
   * @param {string} teamName
   * @param {string[]} roles
   */
  static async getOrCreateTeam(teamId, teamName, roles = []) {
    const teamResponse = await this.getTeam(teamId);

    if (teamResponse.success) return teamResponse;

    try {
      const team = await teams.create(teamId, teamName, roles);

      return {
        success: true,
        data: team,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Error creating team...",
      };
    }
  }

  /**
   * @param {string} teamId
   * @param {string[]} roles
   * @param {string} userId
   */
  static async createMembership(teamId, roles, userId) {
    try {
      const member = await teams.createMembership(
        teamId,
        roles,
        undefined, // email to be added when there is no user, appwrite will create new user
        userId
      );

      return {
        success: true,
        data: member,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Error adding member...",
      };
    }
  }

  static async getMembership(teamId, userId) {
    try {
      const { total, memberships } = await teams.listMemberships(
        teamId,
        [],
        userId
      );

      if (total === 0) throw new Error("Not Found");

      return {
        success: true,
        data: memberships[0],
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Error fetching member...",
      };
    }
  }
}
