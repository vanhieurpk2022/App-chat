import { CameraVideo, ChatDots, CircleFill, EmojiSmile, FileEarmarkText, HandThumbsUpFill, LayoutSidebarReverse, Person, PlusLg, Search, Telephone } from "react-bootstrap-icons";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import type { ChatMess } from "../../model/Message";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { chatService } from "../../services/chatService";
import { addOwnerMessage } from "../../store/chatSlice";
import { formatClock, nowString } from "../../model/formatTime";
import { decodeEmoji, encodeEmoji, isEmojiOnly } from "../../model/EncodingEmoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import FilePreviewItem from "../utils/FilePreviewItem";
import { cloudinaryService } from "../../services/cloudinaryService";
import MessageContent from "../utils/MessageContent ";

interface ChatMainProps {
    title?: string | null;
    messages: ChatMess[];
    onShow: () => void;
    isShow: boolean;
    isRoom: boolean;
    countNumber?: number;
    imgUrl: string;
}


export default function ChatMain({ onShow, isShow, messages, title, isRoom, countNumber, imgUrl }: ChatMainProps) {
    const dispatch = useDispatch();
    const [showEmoji, setEmoij] = useState(false);
    const [inputMessage, setInputMessage] = useState<string>("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const isLoading = useSelector((state: RootState) => state.chat.isLoading);
    const user = useSelector((state: RootState) => state.auth.user);
    const selectUser = useSelector((state: RootState) => state.chat.selectedUser);
    const list = [...(messages)].reverse();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const MAX_FILE = 10;
    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "instant" });

    }, [messages])

    const handleEmojiPicker = (emojiData: EmojiClickData) => {
        setInputMessage((prev) => prev + emojiData.emoji)
    }

    const handleSendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
        e.preventDefault();

        const text = inputMessage.trim();
        if (!user || !selectUser) return;
        if (!text && selectedFile.length === 0) return;

        let nextId = messages.at(-1)?.id ?? 0;
        const send = (content: string) => {
            chatService.sendChat(isRoom ? "room" : "people", selectUser, content);
            dispatch(addOwnerMessage({
                id: ++nextId,
                name: user,
                to: selectUser,
                mes: content,
                type: isRoom ? 1 : 0, // 0 = chat 1-1, 1 = phòng
                createAt: nowString(),
            }));
        }

        if (text) {
            send(encodeEmoji(text));
            setInputMessage("");
        }

        if (selectedFile.length === 0) return;
        setLoading(true);
        try {
            const results = await Promise.all(
                selectedFile.map((prev) => cloudinaryService.upload(prev))
            );
            results.forEach((prev) => send(prev.url))
            setSelectedFile([]);
        } catch (error) {
            console.log("Upload file thất bại:", error);
        } finally {
            setLoading(false);
        }
    }

    const sendIconLike = (icon: string) => {
        if (!user || !selectUser) return;
        const msg = encodeEmoji(icon);
        chatService.sendChat(isRoom ? "room" : "people", selectUser ?? "", msg)
        dispatch(addOwnerMessage({
            id: (messages.at(-1)?.id ?? 0) + 1,
            name: user,
            to: selectUser,
            mes: msg,
            type: isRoom ? 1 : 0,                    // 0 = chat 1-1, 1 = phòng
            createAt: nowString(),
        }))
    }


    // file Event
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files ?? []);
        if (newFiles.length === 0) return;

        setSelectedFile((prev) => [...prev, ...newFiles].slice(0, MAX_FILE));
        e.target.value = "";
    }


    const removeFile = (index: number) => {
        setSelectedFile((prev) => prev.filter((_, i) => i !== index));
    }


    return (
        <div className="h-100 w-100 d-flex flex-column ">
            {/* Header */}
            <div className="d-flex flex-row align-items-center gap-3 border-bottom w-100 p-3">

                <div className="rounded-circle overflow-hidden flex-shrink-0 " style={{ width: "44px", height: "44px" }}>
                    <img style={{ objectFit: 'cover' }} src={imgUrl} width="100%" height="100%" alt="" />
                </div>

                <div >
                    <span className="fs-5 fw-semibold">{title}</span>
                    <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-success flex-grow-0" style={{ width: "10px", height: "10px" }}></div>
                        {isRoom ?
                            <div className="d-flex flex-row align-items-center gap-2">
                                <small>Cộng đồng </small>
                                <CircleFill className="text-secondary" size={5} />
                                <div className="d-flex flex-row align-items-center  gap-2">
                                    <Person />
                                    <small>{countNumber} thành viên</small>
                                </div>


                            </div>
                            : <span className="small text-secondary">Đang hoạt động</span>}

                    </div>
                </div>
                <div className="d-flex align-items-center gap-3 ms-auto me-3">
                    <button className="btn-profile btn border-0 d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                        style={{ cursor: "pointer" }}>
                        <Telephone size={24} />
                    </button>
                    <button className="btn-profile btn border-0 d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                        style={{ cursor: "pointer" }}>
                        <CameraVideo size={24} />
                    </button>
                    <button className="btn-profile btn border-0 d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                        style={{ cursor: "pointer" }}>
                        <Search size={20} />
                    </button>


                    <button onClick={onShow} className="btn-profile border-0 btn d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                        style={{ backgroundColor: isShow ? "#DBEAFE" : "transparent", cursor: "pointer" }}>
                        <LayoutSidebarReverse size={20} color={isShow ? "#2563EB" : ""} />
                    </button>
                </div>


            </div>
            {/* Main Chat */}
            <div className="d-flex flex-column h-100 overflow-auto pb-5" style={{ backgroundColor: "#EBECF0" }}>
                {isLoading ?
                    <div className="d-flex justify-content-center align-items-center flex-grow-1">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                        </div>
                    </div>
                    : list.length > 0 ? list.map((mess, i) => {

                        const prev = list[i - 1];
                        const next = list[i + 1];

                        const isFirstOfGroup = !prev || prev.name !== mess.name; // đầu cụm tin liên tiếp
                        const isLastOfGroup = !next || next.name !== mess.name;  // cuối cụm
                        const mt = isFirstOfGroup ? "mt-3" : "mt-1";             // tin cùng cụm sát nhau hơn
                        const time = formatClock(mess.createAt);

                        const text = decodeEmoji(mess.mes);
                        const emoijOnly = isEmojiOnly(text);
                        const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "instant" });

                        if (mess.name === user) {
                            return (
                                <div key={mess.id} className={`d-flex flex-column align-items-end me-3 ${mt}`}>
                                    <div className={`bg-primary-subtle shadow px-3 py-2 rounded-3 text-break ${emoijOnly ? "fs-3" : ""}`} style={{ maxWidth: "calc(60% - 48px)" }}>
                                        <MessageContent text={text} onLoad={scrollToBottom} />
                                    </div>
                                    {isLastOfGroup && (
                                        <span className="text-secondary mt-1" style={{ fontSize: "0.75rem" }}>{time}</span>
                                    )}
                                </div>
                            );
                        }
                        return (
                            <div key={mess.id} className={`d-flex flex-row gap-4 ms-3 ${mt}`}>
                                <div className="rounded-circle overflow-hidden mt-auto flex-shrink-0" style={{ height: 32, width: 32 }}>
                                    {isLastOfGroup && (
                                        <img src="https://placehold.co/600x400" alt="" width="100%" height="100%" style={{ objectFit: "cover" }} />
                                    )}
                                </div>

                                <div style={{ maxWidth: "calc(60% - 48px)" }}>
                                    <div className="bg-white shadow px-3 py-2 rounded-3">
                                        {isRoom && isFirstOfGroup && (
                                            <>
                                                <small className="text-secondary">{mess.name}</small>
                                                <br />
                                            </>
                                        )}
                                        <span className={`text-break ${emoijOnly ? "fs-3" : ""}`}>
                                            <MessageContent text={text} onLoad={scrollToBottom} /></span>
                                    </div>
                                    {isLastOfGroup && (
                                        <div className="text-secondary mt-1" style={{ fontSize: "0.75rem" }}>{time}</div>
                                    )}
                                </div>
                            </div>
                        );


                    }) :
                        <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 text-secondary text-center px-4">
                            <div
                                className="rounded-circle bg-white shadow-sm d-flex justify-content-center align-items-center mb-3"
                                style={{ width: 64, height: 64 }}
                            >
                                <ChatDots size={28} className="text-primary" />
                            </div>
                            <span className="fw-medium">Chưa có tin nhắn nào</span>
                            <small>Hãy gửi lời chào để bắt đầu cuộc trò chuyện</small>
                        </div>

                }
                <div ref={bottomRef}></div>


            </div>
            <div className="d-flex flex-column position-relative mt-auto p-3">
                {/* File Preview */}
                {selectedFile.length > 0 && (
                    <div className="d-flex flex-row flex-wrap align-items-start gap-3 ms-3 py-2">
                        {selectedFile.map((file, i) => (
                            <FilePreviewItem
                                key={`${file.name}-${file.lastModified}-${i}`}
                                file={file}
                                onRemove={() => removeFile(i)}
                            />
                        ))}
                    </div>
                )}


                {/* Công cụ */}
                <div className="position-relative d-flex ms-3" style={{ width: "98%" }}>
                    {/* Icon trái */}
                    <input multiple ref={fileInputRef} className="d-none" type="file" onChange={handleFileChange} />
                    {loading ?
                        <div className="position-absolute start-0 top-50 translate-middle-y ms-3 d-flex">
                            <div className="spinner-border text-primary" role="status" style={{ width: 24, height: 24, borderWidth: 3 }}>
                                <span className="visually-hidden">Đang tải...</span>
                            </div>
                        </div>
                        :
                        <PlusLg className="position-absolute start-0 top-50 translate-middle-y ms-3" style={{ cursor: "pointer" }} size={24} onClick={() => fileInputRef.current?.click()} />
                    }
                    <input value={inputMessage} onKeyDown={handleSendMessage} onChange={(e) => setInputMessage(e.target.value)} className="shadow-none border-secondary form-control form-control-lg" style={{ paddingLeft: "56px", paddingRight: "96px", fontSize: "16px" }} placeholder="Aa" />

                    {/* Icon phải */}
                    <div className="position-absolute end-0 top-50 translate-middle-y me-3 d-flex gap-3 align-items-center">
                        <button onClick={() => setEmoij(prev => !prev)} className="btn-profile btn border-0 d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                            style={{ cursor: "pointer" }}>
                            <EmojiSmile size={24} />
                        </button>

                        <button className="btn-profile btn border-0 d-inline-flex align-items-center justify-content-center p-2 rounded-3" onClick={() => sendIconLike("\u{1F44D}")}
                            style={{ cursor: "pointer" }}>
                            <HandThumbsUpFill className="text-warning" size={24} />
                        </button>
                    </div>

                </div>
                {showEmoji && (
                    <>
                        <div
                            className="position-fixed top-0 start-0 w-100 h-100"
                            style={{ zIndex: 1 }}
                            onMouseDown={(e) => e.preventDefault()}   // giữ focus ở ô nhập
                            onClick={() => setEmoij(false)}
                        />
                        <div className="position-absolute end-0 mb-5 bottom-0 me-2" style={{ zIndex: 2 }}>
                            <EmojiPicker onEmojiClick={handleEmojiPicker} />
                        </div>
                    </>
                )}

            </div>

        </div >
    );
}