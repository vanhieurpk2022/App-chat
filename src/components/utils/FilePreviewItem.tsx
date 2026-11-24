import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { FileEarmarkText } from "react-bootstrap-icons";

interface FilePreviewProps {
    file: File;
    onRemove: () => void;
}

export default function FilePreviewItem({ file, onRemove }: FilePreviewProps) {
    const [url, setUrl] = useState<string | null>(null);
    const isImage = file.type.startsWith("image/");

    useEffect(() => {
        if (!isImage) return;
        const objUrl = URL.createObjectURL(file);
        setUrl(objUrl);
        return () => URL.revokeObjectURL(objUrl);
    }, [file, isImage]);

    return (
        <div className="d-flex flex-column align-items-center gap-1" style={{ width: 64 }} title={file.name}>
            <div className="position-relative">
                {isImage ? (
                    <div className="rounded-3 bg-secondary-subtle overflow-hidden" style={{ width: 64, height: 64 }}>
                        {url && (
                            <img src={url} alt={file.name} className="d-block"
                                style={{ width: 64, height: 64, objectFit: "cover" }} />
                        )}
                    </div>
                ) : (
                    <div className="rounded-3 bg-secondary-subtle d-flex align-items-center justify-content-center"
                        style={{ width: 64, height: 64 }}>
                        <FileEarmarkText size={28} />
                    </div>
                )}

                <button type="button" aria-label="Xoá file" onClick={onRemove}
                    className="btn btn-dark rounded-circle p-0 d-flex align-items-center justify-content-center position-absolute border border-2 border-white"
                    style={{ width: 20, height: 20, top: -6, right: -6, fontSize: 10 }}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>

            {!isImage && (
                <span className="text-truncate w-100 text-center text-secondary" style={{ fontSize: 12 }}>
                    {file.name}
                </span>
            )}
        </div>
    );
}