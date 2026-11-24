const EMOJI_ONLY = /^(?:\p{Extended_Pictographic}|\p{Emoji_Modifier}|\u200D|\uFE0F|\s)+$/u;


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