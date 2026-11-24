import { Cloudinary, type UploadResult } from "../model/Cloudinary";

const cloudinary = new Cloudinary();

export const cloudinaryService = {
    upload: (file: File): Promise<UploadResult> => cloudinary.upload(file),

}