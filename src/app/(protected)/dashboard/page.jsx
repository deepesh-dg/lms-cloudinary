"use client";

import CoursesService from "@/services/courses";
import React, { useEffect, useState } from "react";
import CreateCourseForm from "./CreateCourseForm";

export default function Page() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    CoursesService.getAllCourses().then((res) =>
      setCourses((prev) => (res.success ? res.data.documents : prev))
    );
  }, []);

  return (
    <main className="block">
      <div className="w-full max-w-7xl mx-auto px-4 space-y-8 py-12">
        <CreateCourseForm
          onCreate={(course) => setCourses((prev) => [course, ...prev])}
        />
        <div className="grid grid-cols-5 gap-4">
          {courses.map((course) => (
            <div key={course.$id}></div>
          ))}
        </div>
      </div>
    </main>
  );
}
