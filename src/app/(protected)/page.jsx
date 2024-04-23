"use client";

import coursesService from "@/services/Courses";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    coursesService.getAllCourses().then(console.log);
  }, []);

  return <div>Home</div>;
}
