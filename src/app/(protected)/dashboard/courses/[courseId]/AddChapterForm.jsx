"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import CoursesService from "@/services/courses";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function AddChapterForm({ onCreate, chapterNumber }) {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    videos: [],
  });
  const { courseId } = useParams();

  const submit = async (e) => {
    e.preventDefault();
    setLoader(() => true);

    const response = await CoursesService.createChapter({
      title: formData.title,
      number: chapterNumber,
      courseId: courseId,
      videos: formData.videos,
    });

    if (response.success) onCreate(response.data);

    if (!response.success)
      toast({
        varient: "destructive",
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
        multiple
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            videos: Array.from(e.target.files),
          }))
        }
      />
      <Button type="submit" disabled={loader}>
        Create Chapter
      </Button>
    </form>
  );
}
