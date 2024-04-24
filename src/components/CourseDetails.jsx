import { CldVideoPlayer } from "next-cloudinary";
import React from "react";
import "next-cloudinary/dist/cld-video-player.css";

export default function CourseDetails({ course }) {
  return (
    <div className="rounded-xl bg-gray-100 border border-black/40 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="font-lg">₹ {course.price}</p>
      </div>
      <div className="py-4 space-y-4">
        {course.chapters.documents.map((chapter) => {
          return (
            <div
              className="block rounded-xl bg-white p-4 space-y-2"
              key={chapter.$id}
            >
              <h2 className="text-xl font-semibold">{chapter.title}</h2>
              <div className="grid grid-cols-2 gap-4">
                {chapter.videos.map((videoPublicId) => (
                  <div className="block" key={videoPublicId}>
                    <CldVideoPlayer
                      width="1920"
                      height="1080"
                      src={videoPublicId}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
