import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import CoursesService from "@/services/courses";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function UpdateThumbnail({ image: _image }) {
  const [image, setImage] = useState(_image);
  const [version, setVersion] = useState(Date.now());
  const [loader, setLoader] = useState(false);
  const [transformation, setTransformation] = useState({
    restore: false,
    improve: false,
    removeBackground: false,
  });
  const { courseId } = useParams();

  const update = async () => {
    setLoader(() => true);
    const url = getCldImageUrl({
      width: image.width,
      height: image.height,
      src: image.public_id,
      format: "default",
      quality: "default",
      ...transformation,
    });

    const result = await CoursesService.updateThumbnail(
      url,
      image.public_id,
      courseId
    );

    if (!result.success)
      toast({
        variant: "destructive",
        title: "Error updating thumbnail",
        description: result.message,
      });

    if (result.success) {
      setTransformation(() => ({
        restore: false,
        improve: false,
        removeBackground: false,
      }));
      setImage(() => result.data.thumbnail);
      setVersion(() => Date.now());
    }

    setLoader(() => false);
  };

  return (
    <div className="relative space-y-4 bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-semibold">Edit Thumbnail</h2>
      <div className="flex gap-4">
        <CldImage
          width={image.width}
          height={image.height}
          src={image.public_id}
          alt="image"
          className="w-1/2 block shrink-0"
          version={version}
          {...transformation}
        />
        <div className="flex flex-wrap gap-4 w-full">
          <Button
            variant={transformation.improve ? "default" : "outline"}
            onClick={() => {
              setTransformation((prev) => ({
                ...prev,
                improve: !prev.improve,
              }));
            }}
          >
            Enhance
          </Button>
          <Button
            variant={transformation.restore ? "default" : "outline"}
            onClick={() => {
              setTransformation((prev) => ({
                ...prev,
                restore: !prev.restore,
              }));
            }}
          >
            Restore
          </Button>
          <div className="w-full mt-auto">
            <Button onClick={update} className="w-full" disabled={loader}>
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
