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
        message: error?.message || "Error fetching courses",
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
        message: error?.message || "Error fetching course",
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
        message: error?.message || "Error creating course",
      };
    }
  }

  static async updateThumbnail(url, publicId, courseId) {
    try {
      const result = await axios.patch("/api/courses", {
        url,
        publicId,
        courseId,
      });

      return result.data;
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Error updating thumbnail",
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
        message: error?.message || "Error creating chapter",
      };
    }
  }

  static async deleteCourse(courseId) {
    try {
      const document = await databases.deleteDocument(
        conf.appwrite.databaseId,
        conf.appwrite.coursesColectionId,
        courseId
      );

      return {
        success: true,
        data: document,
      };
    } catch (error) {
      console.log({ error });
      return {
        success: false,
        message: error?.message || "Error deleting course",
      };
    }
  }

  static async deleteChapter(chapterId) {
    try {
      const document = await databases.deleteDocument(
        conf.appwrite.databaseId,
        conf.appwrite.chaptersCollectionId,
        chapterId
      );

      return {
        success: true,
        data: document,
      };
    } catch (error) {
      console.log({ error });
      return {
        success: false,
        message: error?.message || "Error deleting chapter",
      };
    }
  }
}
