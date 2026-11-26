import type { ReactNode } from "react";
import SearchBox from "./SearchBox";

interface CardMessageProps {
    name: string;
    message: ReactNode;
    time: string;
    imgUrl: string;
    onClick: () => void;
}

export default function CardMessage({ name, message, time, imgUrl, onClick }: CardMessageProps) {
    return (
        <div onClick={onClick} className=" d-flex flex-row gap-2 ms-2 py-2 px-2 align-items-center card-panel card-button" style={{ cursor: "pointer" }}>
            <div className="flex-shrink-0 rounded-circle overflow-hidden position-relative d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, backgroundColor: "#F0F3EC" }}>
                <img src={imgUrl ?? "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"} alt="" width="32" height="32" style={{ objectFit: "cover" }} />
            </div>

            <div className="d-flex flex-column  w-100">
                <div className="d-flex">
                    <span className="flex-grow-1 small opacity-75">{name}</span>
                    <span className="small opacity-75">{time}</span>
                </div>
                <span className="text-break"
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}>{message}</span>
            </div>
        </div>
    )
}