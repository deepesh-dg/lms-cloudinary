"use client";

import CourseCard from "@/components/CourseCard";
import CoursesService from "@/services/courses";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    CoursesService.getAllCourses().then((courses) =>
      setCourses(courses.data.documents)
    );
  }, []);

  return (
    <main className="block">
      <section className="block relative pt-[40%] overflow-hidden">
        <picture className="absolute block inset-0">
          <img
            src="https://images.pexels.com/photos/1739858/pexels-photo-1739858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="hero-banner"
            className="w-full"
          />
        </picture>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-4">
            {courses.map((course) => (
              <Link key={course.$id} href={`/courses/${course.$id}`}>
                <CourseCard course={course} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
