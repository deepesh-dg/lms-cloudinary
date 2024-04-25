import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import CoursesService from "@/services/courses";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function UpdateThumbnail({ image: _image }) {
  const [image, setImage] = useState(_image);
  const [version, setVersion] = useState(Date.now());
  const [loader, setLoader] = useState(false);
  const [transformation, setTransformation] = useState({});
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
      setTransformation(() => ({}));
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
        <div className="flex flex-col">
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
            <Button
              variant={
                transformation?.crop?.aspectRatio === "16:9"
                  ? "default"
                  : "outline"
              }
              onClick={() => {
                setTransformation((prev) => ({
                  ...prev,
                  crop:
                    prev?.crop?.aspectRatio === "16:9"
                      ? undefined
                      : {
                          aspectRatio: "16:9",
                          type: "fill",
                          gravity: "auto", // default
                        },
                }));
              }}
            >
              16:9
            </Button>
            <Button
              variant={
                transformation?.crop?.aspectRatio === "1:1"
                  ? "default"
                  : "outline"
              }
              onClick={() => {
                setTransformation((prev) => ({
                  ...prev,
                  crop:
                    prev?.crop?.aspectRatio === "1:1"
                      ? undefined
                      : {
                          aspectRatio: "1:1",
                          type: "fill",
                          gravity: "auto", // default
                        },
                }));
              }}
            >
              1:1
            </Button>
            <Button
              variant={
                transformation?.crop?.aspectRatio === "4:3"
                  ? "default"
                  : "outline"
              }
              onClick={() => {
                setTransformation((prev) => ({
                  ...prev,
                  crop:
                    prev?.crop?.aspectRatio === "4:3"
                      ? undefined
                      : {
                          aspectRatio: "4:3",
                          type: "fill",
                          gravity: "auto", // default
                        },
                }));
              }}
            >
              4:3
            </Button>
            <Input
              value={transformation.remove || ""}
              placeholder="remove any object"
              onChange={(e) => {
                setTransformation((prev) => ({
                  ...prev,
                  remove: e.target.value,
                }));
              }}
            />
            <div className="flex gap-4 w-full items-center">
              <p>Replace:</p>
              <Input
                value={
                  transformation?.replace && transformation?.replace[0]
                    ? transformation?.replace[0]
                    : ""
                }
                placeholder="replace any object"
                onChange={(e) => {
                  setTransformation((prev) => ({
                    ...prev,
                    replace: [
                      e.target.value,
                      prev?.replace && prev?.replace[1] ? prev?.replace[1] : "",
                    ],
                  }));
                }}
              />
              <p>With:</p>
              <Input
                value={
                  transformation?.replace && transformation?.replace[1]
                    ? transformation?.replace[1]
                    : ""
                }
                placeholder="with another object"
                onChange={(e) => {
                  setTransformation((prev) => ({
                    ...prev,
                    replace: [
                      prev?.replace && prev?.replace[0]
                        ? prev?.replace[0]
                        : "" || "",
                      e.target.value,
                    ],
                  }));
                }}
              />
            </div>
          </div>
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
