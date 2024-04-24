import conf from "@/conf";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: conf.cloudinary.cloutName,
  api_key: conf.cloudinary.apiKey,
  api_secret: conf.cloudinary.apiSecret,
});

/**
 * @param {Uint8Array} buffer
 * @returns {Promise<import("cloudinary").UploadApiResponse>}
 */
function uploadBuffer(buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      })
      .end(buffer);
  });
}

/**
 * @param {File} file
 */
async function uploadFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const result = await uploadBuffer(buffer);

  return result;
}

export { cloudinary, uploadFile };
