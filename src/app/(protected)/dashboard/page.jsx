"use client";

import CoursesService from "@/services/courses";
import React, { useEffect, useState } from "react";
import CreateCourseForm from "./CreateCourseForm";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { toast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

export default function Page() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    CoursesService.getAllCourses().then((res) =>
      setCourses((prev) => (res.success ? res.data.documents : prev))
    );
  }, []);

  const onDelete = async (courseId) => {
    const res = await CoursesService.deleteCourse(courseId);

    if (!res.success)
      toast({
        variant: "destructive",
        title: "Error deleting course",
        description: res.message,
      });

    if (res.success) {
      setCourses((prev) => prev.filter((c) => c.$id !== courseId));
    }
  };

  return (
    <main className="block">
      <div className="w-full max-w-7xl mx-auto px-4 space-y-8 py-12">
        <CreateCourseForm
          onCreate={(course) => setCourses((prev) => [...prev, course])}
        />
        <div className="grid grid-cols-4 gap-4">
          {courses.map((course) => (
            <div className="relative" key={course.$id}>
              <Link href={`/dashboard/courses/${course.$id}`}>
                <CourseCard course={course} />
              </Link>
              <button
                onClick={() => {
                  onDelete(course.$id);
                }}
                className="absolute top-2 right-2 p-1 bg-white rounded-full text-red-600 shadow-md"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
