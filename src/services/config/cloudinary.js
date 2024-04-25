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

export { cloudinary, uploadBuffer };
