const EMOJI_ONLY = /^(?:\p{Extended_Pictographic}|\p{Emoji_Modifier}|\u200D|\uFE0F|\s)+$/u;
const CLOUDINARY_PREFIX = /^https:\/\/res\.cloudinary\.com(\/|$)/i;

export function encodeEmoji(text: string): string {
    return text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, (char) => {
        return `&#${char.codePointAt(0)};`;
    });
}

// Chuyển ngược lại &#128077; thành emoji 👍 để hiển thị lên màn hình
export function decodeEmoji(text: string): string {
    return text.replace(/&#(\d+);/g, (_, code) => {
        return String.fromCodePoint(Number(code));
    });
}

export const isEmojiOnly = (text: string): boolean => EMOJI_ONLY.test(text.trim());

export const checkIsFile = (text: string): string => {
    const imageExts = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
    const videoExts = [".mp4", ".mov", ".webm"];
    if (CLOUDINARY_PREFIX.test(text)) {
        if (imageExts.some((ext) => text.endsWith(ext))) {
            return "Gửi một hình ảnh";
        }
        if (videoExts.some((ext) => text.endsWith(ext))) {
            return "Gửi một video";
        }
        return "Gửi một tệp đính kèm";
    }
    return text;
};