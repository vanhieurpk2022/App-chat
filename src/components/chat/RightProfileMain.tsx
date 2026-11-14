import { useState } from "react";
import { CaretDownFill, FileEarmarkText } from "react-bootstrap-icons";

const caretStyle = (open: boolean) => ({
    cursor: "pointer",
    transform: open ? "rotate(0deg)" : "rotate(-90deg)",
    transition: "transform 0.25s ease",
});

const titleClass = "flex-grow-1 mb-0 fs-6 fw-semibold";

export default function RightProfileMain() {
    const [showImage, setShowImage] = useState(false);
    const [showFile, setShowFile] = useState(false);
    const [showLink, setShowLink] = useState(false);
    return (
        <div className="d-flex gap-3 flex-column">
            {/* Ảnh */}
            <div className="d-flex align-items-center px-3">
                <span className={titleClass}>Ảnh</span>
                <CaretDownFill onClick={() => setShowImage(prev => !prev)} className="text-secondary small flex-shrink-0" style={caretStyle(showImage)} />
            </div>
            {showImage && <>
                <div className="d-flex flex-row gap-2 justify-content-start px-3">
                    <div className="rounded-3 overflow-hidden flex-fill" style={{ aspectRatio: "1 / 1", minWidth: 0 }}>
                        <img src="https://placehold.co/400" width="100%" height="100%" style={{ objectFit: "cover" }} alt="" />
                    </div>
                    <div className="rounded-3 overflow-hidden flex-fill" style={{ aspectRatio: "1 / 1", minWidth: 0 }}>
                        <img src="https://placehold.co/400" width="100%" height="100%" style={{ objectFit: "cover" }} alt="" />
                    </div>
                    <div className="rounded-3 overflow-hidden flex-fill" style={{ aspectRatio: "1 / 1", minWidth: 0 }}>
                        <img src="https://placehold.co/400" width="100%" height="100%" style={{ objectFit: "cover" }} alt="" />
                    </div>
                </div>
                <div className="d-flex justify-content-center px-3">
                    <button className="btn btn-light border-0 bg-secondary-subtle fw-medium rounded-3 w-100">Xem tất cả</button>
                </div>
            </>}

            {/* File */}
            <div className="d-flex align-items-center px-3">
                <h5 className={titleClass}>File</h5>
                <CaretDownFill onClick={() => setShowFile(prev => !prev)} className="text-secondary small flex-shrink-0" style={caretStyle(showFile)} />
            </div>
            {showFile && <>
                <div className="d-flex flex-column gap-2 px-3">
                    {/* File 1 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2 flex-shrink-0">
                            <FileEarmarkText size={28} />
                        </div>
                        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                            <span className="text-truncate">Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>

                    {/* File 2 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2 flex-shrink-0">
                            <FileEarmarkText size={28} />
                        </div>
                        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                            <span className="text-truncate">Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>

                    {/* File 3 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2 flex-shrink-0">
                            <FileEarmarkText size={28} />
                        </div>
                        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                            <span className="text-truncate">Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>
                </div>
                <div className="px-3">
                    <button className="btn btn-light border-0 bg-secondary-subtle fw-medium rounded-3 w-100">Xem tất cả</button>
                </div>
            </>}

            {/* Link */}
            <div className="d-flex align-items-center px-3">
                <h5 className={titleClass}>Link</h5>
                <CaretDownFill onClick={() => setShowLink(prev => !prev)} className="text-secondary small flex-shrink-0" style={caretStyle(showLink)} />
            </div>
            {showLink && <>
                <div className="d-flex flex-column gap-2 px-3">
                    {/* Link 1 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2 flex-shrink-0">
                            <FileEarmarkText size={28} />
                        </div>
                        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                            <span className="text-truncate">Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>

                    {/* Link 2 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2 flex-shrink-0">
                            <FileEarmarkText size={28} />
                        </div>
                        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                            <span className="text-truncate">Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>

                    {/* Link 3 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2 flex-shrink-0">
                            <FileEarmarkText size={28} />
                        </div>
                        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                            <span className="text-truncate">Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>
                </div>
                <div className="px-3">
                    <button className="btn btn-light border-0 bg-secondary-subtle fw-medium rounded-3 w-100">Xem tất cả</button>
                </div>
            </>}
        </div>
    );
}