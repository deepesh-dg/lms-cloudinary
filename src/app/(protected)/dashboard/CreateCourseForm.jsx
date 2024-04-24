"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import CoursesService from "@/services/courses";
import React, { useRef, useState } from "react";

export default function CreateCourseForm({ onCreate }) {
  const { toast } = useToast();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    thumbnail: null,
  });

  const thumbnailRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoader(() => true);

    const response = await CoursesService.createCourse(
      formData.title,
      formData.price,
      formData.thumbnail
    );

    if (response.success) {
      onCreate(response.data);
      setFormData(() => ({
        title: "",
        price: "",
        thumbnail: null,
      }));

      if (thumbnailRef.current) {
        thumbnailRef.current.value = "";
      }
    }

    if (!response.success)
      toast({
        variant: "destructive",
        title: "Error creating course",
        description: response.message,
      });

    setLoader(() => false);
  };

  return (
    <form className="flex gap-4 w-full p-4 bg-gray-100" onSubmit={submit}>
      <Input
        type="text"
        placeholder="Course Title"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <Input
        type="number"
        placeholder="Course Price"
        value={formData.price}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, price: e.target.value }))
        }
      />
      <Input
        type="file"
        placeholder="Course Thumbnail"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }))
        }
        ref={thumbnailRef}
      />
      <Button type="submit" disabled={loader}>
        Create Course
      </Button>
    </form>
  );
}
