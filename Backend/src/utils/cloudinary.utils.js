import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //  upload
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded on cloudinary", response.url)
    console.log(response)
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    // delete file from temp if it exists
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted from the cloudinary, PublicId", publicId);
  } catch (error) {
    console.log("Error deleting from cloudinary", error);
  }
};

const extractPublicIdFromUrl = (url) => {
  try {
    if (!url) return null;
    // Extract public_id from cloudinary URL
    // URL format: https://res.cloudinary.com/cloud_name/image/upload/v123456789/public_id.ext
    const parts = url.split('/upload/');
    if (parts.length > 1) {
      const pathParts = parts[1].split('/');
      // Remove version if present (e.g., v123456789)
      let publicIdWithExt = pathParts[pathParts.length - 1];
      // Remove file extension to get public_id
      const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
      return publicId;
    }
    return null;
  } catch (error) {
    console.log("Error extracting public_id from URL:", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary, extractPublicIdFromUrl };
