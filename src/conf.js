const conf = {
  appwrite: {
    url: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    coursesColectionId: String(
      process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID
    ),
    chaptersCollectionId: String(
      process.env.NEXT_PUBLIC_APPWRITE_CHAPTERS_COLLECTION_ID
    ),
  },
};

export default conf;
