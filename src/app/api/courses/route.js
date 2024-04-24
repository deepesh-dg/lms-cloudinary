import CoursesService from "@/services/courses.server";
import { NextRequest, NextResponse } from "next/server";

/**
 * @param {NextRequest} request
 */
export async function POST(request) {
  const formData = await request.formData();

  const title = formData.get("title");
  const price = formData.get("price");
  const thumbnail = formData.get("thumbnail");

  const response = await CoursesService.createCourse(title, price, thumbnail);

  return NextResponse.json(response);
}
