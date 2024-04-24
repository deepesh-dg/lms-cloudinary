import conf from "@/conf";
import { databases } from "./config/node-appwrite";
import { uploadImage, uploadVideo } from "./config/cloudinary";
import { ID } from "node-appwrite";

export default class CoursesService {
  static async createCourse(title, price, thumbnail) {
    try {
      const result = await uploadImage(thumbnail);

      const course = await databases.createDocument(
        conf.appwrite.databaseId,
        conf.appwrite.coursesColectionId,
        ID.unique(),
        { title, price: Number(price), thumbnail: JSON.stringify(result) }
      );

      course.thumbnail = JSON.parse(course.thumbnail);

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
      const cloudinaryPromises = chapterData.videos.map(uploadVideo);

      const videoResults = await Promise.all(cloudinaryPromises);

      const videos = videoResults.map((res) => JSON.stringify(res));

      const chapter = await databases.createDocument(
        conf.appwrite.databaseId,
        conf.appwrite.chaptersCollectionId,
        ID.unique(),
        { ...chapterData, videos: videos }
      );

      chapter.videos = chapter.videos.map(JSON.parse);

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
