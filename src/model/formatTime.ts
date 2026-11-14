import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export function formatTime(time?: string): string {
    if (!time) return "";

    const t = dayjs(time);
    if (!t.isValid()) return "";

    if (dayjs().diff(t, "day") > 7) return t.format("DD/MM/YYYY");

    return t.fromNow();
}