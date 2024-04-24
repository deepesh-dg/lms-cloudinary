import CoursesService from "@/services/courses.server";
import { NextRequest, NextResponse } from "next/server";

/**
 * @param {NextRequest} request
 */
export async function POST(request) {
  const formData = await request.formData();

  const title = formData.get("title");
  const number = formData.get("number");
  const courseId = formData.get("courseId");
  const videos = formData.get("videos");

  const response = await CoursesService.createChapter({
    title,
    number,
    courseId,
    videos,
  });

  return NextResponse.json(response);
}
