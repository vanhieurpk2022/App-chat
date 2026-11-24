const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE_MB = 5;
const MAX_VIDEO_MB = 50;

export type MediaType = "image" | "video";

export interface UploadResult {
    url: string;
    type: MediaType;
}

export class Cloudinary {
    private readonly cloudName: string = import.meta.env.VITE_CLOUDINARY_NAME;
    private readonly uploadPresent: string = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    constructor() {
        if (!this.cloudName || !this.uploadPresent) {
            throw new Error("Thiếu VITE_CLOUDINARY_NAME hoặc VITE_CLOUDINARY_UPLOAD_PRESET trong .env");
        }
    }

    private getMediaType(file: File): MediaType {
        let type: MediaType;
        if (IMAGE_TYPES.includes(file.type)) type = "image";
        else if (VIDEO_TYPES.includes(file.type)) type = "video";
        else throw new Error("Chỉ chấp nhận ảnh (jpg, png, webp, gif) hoặc video (mp4, webm, mov)");

        const maxMB = type === "image" ? MAX_IMAGE_MB : MAX_VIDEO_MB;
        if (file.size > maxMB * 1024 * 1024) {
            throw new Error(`${type === "image" ? "Ảnh" : "Video"} không được vượt quá ${maxMB}MB`)
        }
        return type;
    }

    async upload(file: File): Promise<UploadResult> {
        const type = this.getMediaType(file);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_present", this.uploadPresent);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${this.cloudName}/${type}/upload`,
            { method: "POST", body: formData }
        )
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.error?.message ?? "Upload thất bại");
        }
        return { url: data.secure_url as string, type };
    }
}