const conf = {
  appwrite: {
    url: process.env.NEXT_PUBLIC_APPWRITE_URL,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    coursesColectionId: process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID,
    chaptersCollectionId:
      process.env.NEXT_PUBLIC_APPWRITE_CHAPTERS_COLLECTION_ID,
    apiKey: process.env.APPWRITE_API_KEY || "",
  },
  cloudinary: {
    cloutName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

export default conf;
