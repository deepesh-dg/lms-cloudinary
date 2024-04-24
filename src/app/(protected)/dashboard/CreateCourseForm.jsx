"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CoursesService from "@/services/courses";
import React, { useState } from "react";

export default function CreateCourseForm({ onCreate }) {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    thumbnail: null,
    loader: false,
  });

  const submit = async (e) => {
    e.preventDefault();
    setLoader(() => true);

    const response = await CoursesService.createCourse(
      formData.title,
      formData.price,
      formData.thumbnail
    );

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
      />
      <Button type="submit">Create Course</Button>
    </form>
  );
}
