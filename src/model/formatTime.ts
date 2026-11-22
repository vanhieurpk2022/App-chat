import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale("vi");

const VN = "Asia/Ho_Chi_Minh";

// giờ hiện tại dạng UTC, cùng định dạng với server
export const nowString = () => dayjs.utc().format("YYYY-MM-DD HH:mm:ss");

// chuỗi server (UTC) -> dayjs ở giờ Việt Nam
const parse = (time?: string) => {
    if (!time) return null;
    const t = dayjs.utc(time).tz(VN);
    return t.isValid() ? t : null;
};

export function formatTime(time?: string): string {
    const t = parse(time);
    if (!t) return "";
    if (dayjs().diff(t, "day") > 7) return t.format("DD/MM/YYYY");
    return t.fromNow();
}

// giờ trong bong bóng tin nhắn
export const formatClock = (time?: string) => parse(time)?.format("HH:mm") ?? "";