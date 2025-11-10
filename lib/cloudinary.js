import { v2 as cloudinary } from "cloudinary";

// Automatically uses CLOUDINARY_URL from .env.local
cloudinary.config({
  secure: true, // ensures HTTPS URLs
});

export default cloudinary;
