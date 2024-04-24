import conf from "@/conf";
import { databases } from "./config/node-appwrite";
import { uploadFile } from "./config/cloudinary";
import { ID } from "node-appwrite";

export default class CoursesService {
  static async createCourse(title, price, thumbnail) {
    try {
      const result = await uploadFile(thumbnail);

      const course = await databases.createDocument(
        conf.appwrite.databaseId,
        conf.appwrite.coursesColectionId,
        ID.unique(),
        { title, price: Number(price), thumbnail: result.public_id }
      );

      return {
        success: true,
        data: course,
      };
    } catch (error) {
      return {
        success: false,
        message: String(error?.message) || "Error creating course",
      };
    }
  }

  /**
   * @param {{ title: string; number: number; courseId: string; videos: File[] }} chapterData
   */
  static async createChapter(chapterData) {
    try {
      const cloudinaryPromises = chapterData.videos.map(uploadFile);

      const videoResults = await Promise.all(cloudinaryPromises);

      const videoPublicIds = videoResults.map((res) => res.data.public_id);

      const chapter = await databases.createDocument(
        conf.appwrite.databaseId,
        conf.appwrite.chaptersCollectionId,
        ID.unique(),
        { ...chapterData, videos: videoPublicIds }
      );

      return {
        success: true,
        data: chapter,
      };
    } catch (error) {
      return {
        success: false,
        message: String(error?.message) || "Error creating chapter",
      };
    }
  }
}
