"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import CoursesService from "@/services/courses";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";

export default function AddChapterForm({ onCreate, chapterNumber }) {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    videos: [],
  });
  const { courseId } = useParams();
  const videosRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoader(() => true);

    const response = await CoursesService.createChapter({
      title: formData.title,
      number: chapterNumber,
      courseId: courseId,
      videos: formData.videos,
    });

    if (response.success) {
      onCreate(response.data);
      setFormData(() => ({
        title: "",
        videos: [],
      }));
      if (videosRef.current) videosRef.current.value = "";
    }

    if (!response.success)
      toast({
        variant: "destructive",
        title: "Error creating chapter",
        description: response.message,
      });

    setLoader(() => false);
  };

  return (
    <form className="flex gap-4 w-full p-4 bg-gray-100" onSubmit={submit}>
      <Input
        type="text"
        placeholder="Chapter Title"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <Input
        type="file"
        placeholder="Chapter Videos"
        accept="video/mp4, video/wmv, video/mkv, video/webm"
        multiple
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            videos: Array.from(e.target.files),
          }))
        }
        ref={videosRef}
      />
      <Button type="submit" disabled={loader}>
        Add Chapter
      </Button>
    </form>
  );
}
