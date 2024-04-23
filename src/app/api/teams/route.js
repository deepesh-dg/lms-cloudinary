import teamServerService from "@/services/TeamServer";
import { NextRequest, NextResponse } from "next/server";

/**
 * For reading team membership details
 * @param {NextRequest} request
 */
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const teamId = searchParams.get("teamId");
  const userId = searchParams.get("userId");

  const response = await teamServerService.getMembership(teamId, userId);

  return NextResponse.json(response);
}

/**
 * for creating team (if already exists, it returns existed team)
 * @param {NextRequest} request
 */
export async function POST(request) {
  const { teamId, teamName, roles = [] } = await request.json();

  const response = await teamServerService.createTeam(teamId, teamName, roles);

  return NextResponse.json(response);
}

/**
 * for adding members to teams
 * @param {NextRequest} request
 */
export async function PATCH(request) {
  const { teamId, userId, role } = await request.json();

  const response = await teamServerService.createMembership(
    teamId,
    [role],
    userId
  );

  return NextResponse.json(response);
}
