import { FileEarmarkText } from "react-bootstrap-icons";
import Highlighter from "react-highlight-words";

interface MessageContentProps {
    text: string,
    onLoad?: () => void;
    keyword?: string;
}

export default function MessageContent({ text, onLoad, keyword }: MessageContentProps) {
    const URL_ONLY = /^https?:\/\/\S+$/i;
    const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif|svg|bmp)(\?.*)?$/i;
    if (!URL_ONLY.test(text)) {
        if (keyword) {
            return <>
                {
                    <Highlighter
                        highlightTag="span"
                        highlightClassName="bg-warning-subtle text-dark fw-bold px-1 rounded"
                        searchWords={[keyword]}
                        autoEscape
                        textToHighlight={text}
                    />
                }
            </>
        }
        return <>{text} </>;
    }

    if (IMAGE_EXT.test(text)) {
        return (
            <a href={text} target="_blank" rel="noreferrer" >
                <img src={text} alt="" loading="lazy" onLoad={onLoad} className="d-block rounded-2" style={{ maxWidth: "100%", maxHeight: 300, objectFit: "cover" }}
                />
            </a>
        );
    }

    // file khác (pdf, docx, ...)
    const fileName = decodeURIComponent(text.split("/").pop() ?? text);
    return (
        <a href={text} target="_blank" rel="noreferrer" className="d-flex flex-column align-items-center gap-2 text-decoration-none" >
            <div className="d-flex flex-column align-items-center" style={{ width: 96 }}>
                <FileEarmarkText size={64} />
                <span className="small text-center text-truncate w-100" title={fileName}>
                    {fileName}
                </span>
            </div>
        </a>
    );
}