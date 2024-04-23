import conf from "@/conf";
import AppwriteService from "./Appwrite";
import { Query } from "appwrite";

export class CoursesService extends AppwriteService {
  async getAllCourses(queries = []) {
    try {
      const documents = await this.databases.listDocuments(
        conf.appwrite.databaseId,
        conf.appwrite.coursesColectionId,
        queries
      );

      return {
        success: true,
        msg: "Courses fetched successfully",
        data: documents,
      };
    } catch (error) {
      return {
        success: false,
        msg: String(error?.message) || "Error fetching courses",
      };
    }
  }

  async getCourse(courseId) {
    try {
      const [document, chapters] = await Promise.all([
        this.databases.getDocument(
          conf.appwrite.databaseId,
          conf.appwrite.coursesColectionId,
          courseId
        ),
        this.databases.listDocuments(
          conf.appwrite.databaseId,
          conf.appwrite.chaptersCollectionId,
          [Query.equal("courses", courseId)]
        ),
      ]);

      document.chapters = chapters;

      return {
        success: true,
        msg: "Courses fetched successfully",
        data: document,
      };
    } catch (error) {
      return {
        success: false,
        msg: String(error?.message) || "Error fetching course",
      };
    }
  }
}

const coursesService = new CoursesService();

export default coursesService;
