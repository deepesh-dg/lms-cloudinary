import conf from "@/conf";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: conf.cloudinary.cloutName,
  api_key: conf.cloudinary.apiKey,
  api_secret: conf.cloudinary.apiSecret,
});

/**
 * @param {Uint8Array} buffer
 * @param {"image" | "video"} resource_type
 * @returns {Promise<import("cloudinary").UploadApiResponse>}
 */
function uploadBuffer(buffer, resource_type = "image") {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      )
      .end(buffer);
  });
}

/**
 * @param {File} image
 */
async function uploadImage(image) {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const result = await uploadBuffer(buffer, "image");

  return result;
}

/**
 * @param {File} video
 */
async function uploadVideo(video) {
  const arrayBuffer = await video.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const result = await uploadBuffer(buffer, "video");

  return result;
}

/**
 * @param {string} imgUrl
 * @param {string} public_id
 */
async function replaceImage(imgUrl, public_id) {
  const result = await cloudinary.uploader.upload(imgUrl, { public_id });

  return result;
}

export { cloudinary, uploadImage, uploadVideo, replaceImage };
