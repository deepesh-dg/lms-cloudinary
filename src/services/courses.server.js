import conf from "@/conf";
import { databases } from "./config/node-appwrite";
import { cloudinary, uploadBuffer, uploadVideo } from "./config/cloudinary";
import { ID } from "node-appwrite";

export default class CoursesService {
  /**
   * @param {string} title
   * @param {string} price
   * @param {File} thumbnail
   * @returns
   */
  static async createCourse(title, price, thumbnail) {
    try {
      const arrayBuffer = await thumbnail.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const result = await uploadBuffer(buffer, "image");

      const course = await databases.createDocument(
        conf.appwrite.databaseId,
        conf.appwrite.coursesColectionId,
        ID.unique(),
        { title, price: Number(price), thumbnail: JSON.stringify(result) }
      );

      course.thumbnail = result;

      return {
        success: true,
        data: course,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Error creating course",
      };
    }
  }

  /**
   * @param {{ title: string; number: number; courseId: string; videos: File[] }} chapterData
   */
  static async createChapter(chapterData) {
    try {
      const cloudinaryPromises = chapterData.videos.map(async (video) => {
        const arrayBuffer = await video.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const result = await uploadBuffer(buffer, "video");

        return result;
      });

      const videoResults = await Promise.all(cloudinaryPromises);

      const videos = videoResults.map((res) => JSON.stringify(res));

      const chapter = await databases.createDocument(
        conf.appwrite.databaseId,
        conf.appwrite.chaptersCollectionId,
        ID.unique(),
        {
          ...chapterData,
          videos: videoResults.map((res) => JSON.stringify(res)),
        }
      );

      chapter.videos = videos;

      return {
        success: true,
        data: chapter,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Error creating chapter",
      };
    }
  }

  static async updateThumbnail(url, courseId) {
    try {
      // For cloudinary to process the image in background so that next time it is readily available for downloading and uploading image in line no. 88
      await fetch(url);

      // We can pass old public_id in upload options but it won't make effect immediately due to browser url cache since url will be the same.
      const result = await cloudinary.uploader.upload(url);

      const document = await databases.updateDocument(
        conf.appwrite.databaseId,
        conf.appwrite.coursesColectionId,
        courseId,
        {
          thumbnail: JSON.stringify(result),
        }
      );

      document.thumbnail = result;

      return {
        success: true,
        data: document,
      };
    } catch (error) {
      console.log({ error });
      return {
        success: false,
        message: error?.message || "Error updating thumbnail",
      };
    }
  }
}
