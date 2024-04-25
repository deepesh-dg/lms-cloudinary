"use client";

import CourseDetails from "@/components/CourseDetails";
import CoursesService from "@/services/courses";
import React from "react";
import AddChapterForm from "./AddChapterForm";
import UpdateThumbnail from "./UpdateThumbnail";

export default function Page({ params }) {
  const [course, setCourse] = React.useState(null);

  React.useEffect(() => {
    CoursesService.getCourse(params.courseId).then((res) => {
      if (res.success) setCourse(res.data);
    });
  }, [params.courseId]);

  return (
    <div className="w-full max-w-7xl mx-auto py-12 space-y-12">
      {course ? <UpdateThumbnail image={course.thumbnail} /> : null}
      <AddChapterForm
        chapterNumber={(course?.chapters.total || 0) + 1}
        onCreate={(chapter) => {
          setCourse((prev) => {
            if (!prev) return;

            return {
              ...prev,
              chapters: {
                documents: [...prev.chapters.documents, chapter],
                total: prev.chapters.total + 1,
              },
            };
          });
        }}
      />
      {course ? <CourseDetails course={course} /> : null}
    </div>
  );
}
