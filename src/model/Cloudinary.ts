const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE_MB = 5;
const MAX_VIDEO_MB = 50;
const MAX_FILE_MB = 10;

export type MediaType = "image" | "video" | "file";

const LABEL: Record<MediaType, string> = { image: "Ảnh", video: "Video", file: "File" };
const MAX_MB: Record<MediaType, number> = { image: MAX_IMAGE_MB, video: MAX_VIDEO_MB, file: MAX_FILE_MB };

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
        else type = "file"; // pdf, docx, zip, ...

        if (file.size > MAX_MB[type] * 1024 * 1024) {
            throw new Error(`${LABEL[type]} không được vượt quá ${MAX_MB[type]}MB`);
        }
        return type;
    }

    async upload(file: File): Promise<UploadResult> {
        const type = this.getMediaType(file);
        const resourceType = type === "file" ? "raw" : type; // Cloudinary gọi file thường là "raw"

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", this.uploadPresent);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${this.cloudName}/${resourceType}/upload`,
            { method: "POST", body: formData }
        );
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.error?.message ?? "Upload thất bại");
        }
        return { url: data.secure_url as string, type };
    }
}