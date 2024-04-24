import conf from "@/conf";
import { databases } from "./config/appwrite";
import { Query } from "appwrite";
import axios from "axios";

export default class CoursesService {
  static async getAllCourses(queries = []) {
    try {
      const documents = await databases.listDocuments(
        conf.appwrite.databaseId,
        conf.appwrite.coursesColectionId,
        queries
      );

      documents.documents = documents.documents.map((doc) => ({
        ...doc,
        thumbnail: JSON.parse(doc.thumbnail),
      }));

      return {
        success: true,
        data: documents,
      };
    } catch (error) {
      return {
        success: false,
        message: String(error?.message) || "Error fetching courses",
      };
    }
  }

  static async getCourse(courseId) {
    try {
      const [document, chapters] = await Promise.all([
        databases.getDocument(
          conf.appwrite.databaseId,
          conf.appwrite.coursesColectionId,
          courseId
        ),
        databases.listDocuments(
          conf.appwrite.databaseId,
          conf.appwrite.chaptersCollectionId,
          [Query.equal("courseId", courseId)]
        ),
      ]);

      document.thumbnail = JSON.parse(document.thumbnail);

      chapters.documents = chapters.documents.map((doc) => ({
        ...doc,
        videos: doc.videos.map(JSON.parse),
      }));

      return {
        success: true,
        data: { ...document, chapters },
      };
    } catch (error) {
      return {
        success: false,
        message: String(error?.message) || "Error fetching course",
      };
    }
  }

  /**
   * @param {string} title
   * @param {string} price
   * @param {File} thumbnail
   */
  static async createCourse(title, price, thumbnail) {
    try {
      const formData = axios.toFormData({ title, price, thumbnail });

      const response = await axios.post("/api/courses", formData);

      return response.data;
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
      const formData = axios.toFormData(chapterData);

      const response = await axios.post("/api/chapters", formData);

      return response.data;
    } catch (error) {
      console.log({ error });
      return {
        success: false,
        message: String(error?.message) || "Error creating chapter",
      };
    }
  }
}
