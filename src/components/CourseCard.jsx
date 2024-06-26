import { CldImage } from "next-cloudinary";
import React from "react";

export default function CourseCard({ course }) {
  return (
    <div className="block w-full shadow-md rounded-lg overflow-hidden relative">
      <CldImage
        width={course.thumbnail.width}
        height={course.thumbnail.height}
        src={course.thumbnail.public_id}
        alt={course.title}
        version={Date.now()}
        className="w-full"
      />
      <div className="space-y-3 p-4">
        <h2 className="font-semibold text-xl">{course.title}</h2>
        <p className="text-lg">₹ {course.price}</p>
      </div>
    </div>
  );
}
