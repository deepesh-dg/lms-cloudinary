"use client";

import CourseDetails from "@/components/CourseDetails";
import CoursesService from "@/services/courses";
import React from "react";

export default function Page({ params }) {
  const [course, setCourse] = React.useState(null);

  React.useEffect(() => {
    CoursesService.getCourse(params.courseId).then((res) => {
      if (res.success) setCourse(res.data);
    });
  }, [params.courseId]);

  return (
    <div className="w-full max-w-7xl mx-auto py-12">
      {course ? <CourseDetails course={course} /> : null}
    </div>
  );
}
