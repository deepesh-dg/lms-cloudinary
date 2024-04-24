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
                {chapter.videos.map((video) => (
                  <div className="block" key={video.public_id}>
                    <CldVideoPlayer
                      width={video.width}
                      height={video.height}
                      src={video.public_id}
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
