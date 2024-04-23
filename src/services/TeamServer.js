import AppwriteServerService from "./AppwriteServer";

export class TeamServerService extends AppwriteServerService {
  /**
   * @param {string} teamId
   */
  async getTeam(teamId) {
    try {
      const team = await this.teams.get(teamId);

      return {
        success: true,
        msg: "Team Fetched Successfully",
        data: team,
      };
    } catch (error) {
      return {
        success: true,
        msg: String(error?.message) || "Error fetching team detail...",
      };
    }
  }

  /**
   * @param {string} teamId
   * @param {string} teamName
   * @param {string[]} roles
   */
  async createTeam(teamId, teamName, roles = []) {
    const teamResponse = await this.getTeam(teamId);

    if (teamResponse.success) return teamResponse;

    try {
      const team = await this.teams.create(teamId, teamName, roles);

      return {
        success: true,
        msg: "Team created successfully",
        data: team,
      };
    } catch (error) {
      return {
        success: false,
        msg: String(error?.message) || "Error creating team...",
      };
    }
  }

  /**
   * @param {string} teamId
   * @param {string[]} roles
   * @param {string} userId
   */
  async createMembership(teamId, roles, userId) {
    try {
      const member = await this.teams.createMembership(
        teamId,
        roles,
        undefined, // email to be added when there is no user, appwrite will create new user
        userId
      );

      return {
        success: true,
        msg: "Member added successfully",
        data: member,
      };
    } catch (error) {
      return {
        success: false,
        msg: String(error?.message) || "Error adding member...",
      };
    }
  }

  async getMembership(teamId, userId) {
    try {
      const { total, memberships } = await this.teams.listMemberships(
        teamId,
        [],
        userId
      );

      if (total === 0) throw new Error("Not Found");

      return {
        success: true,
        msg: "Found",
        data: memberships[0],
      };
    } catch (error) {
      return {
        success: false,
        msg: String(error?.message) || "Error fetching member...",
      };
    }
  }
}

const teamServerService = new TeamServerService();

export default teamServerService;
