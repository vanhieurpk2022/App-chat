import { useState } from "react";
import { CaretDownFill, CaretRightFill, FileEarmarkText } from "react-bootstrap-icons";

export default function RightProfileMain() {
    const [showImage, setShowImage] = useState(false);
    const [showFile, setShowFile] = useState(false);
    const [showLink, setShowLink] = useState(false);
    return (
        <div className="d-flex gap-3 flex-column">
            <div className="d-flex align-items-center">
                <span className="flex-grow-1 mt-2 fs-5 fw-semibold">Ảnh</span>
                <CaretDownFill onClick={() => setShowImage(prev => !prev)} className="text-black small flex-shrink-0" style={{ cursor: "pointer", transform: showImage ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.25s ease" }} />

            </div>
            {showImage && <>
                <div className=" d-flex flex-row gap-3 justify-content-start">
                    <div className="rounded-3 overflow-hidden" style={{ height: "120px", width: "120px" }}>
                        <img src="https://placehold.co/400" width={"100%"} height={"100%"} />
                    </div>
                    <div className="rounded-3 overflow-hidden" style={{ height: "120px", width: "120px" }}>
                        <img src="https://placehold.co/400" width={"100%"} height={"100%"} />
                    </div>
                    <div className="rounded-3 overflow-hidden" style={{ height: "120px", width: "120px" }}>
                        <img src="https://placehold.co/400" width={"100%"} height={"100%"} />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary mt-3 w-100">Xem tất cả</button>
                </div>
            </>}

            {/* File */}

            <div className="d-flex align-items-center">
                <h5 className="flex-grow-1 mt-2 mb-3">File</h5>
                <CaretDownFill onClick={() => setShowFile(prev => !prev)} className="text-black small flex-shrink-0" style={{ cursor: "pointer", transform: showFile ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.25s ease" }} />

            </div>
            {showFile && <>
                <div className="d-flex flex-column gap-3">
                    {/* File 1 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2">
                            <FileEarmarkText size={32} />
                        </div>
                        <div className="d-flex flex-column">
                            <span>Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>

                    {/* File 2 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2">
                            <FileEarmarkText size={32} />
                        </div>
                        <div className="d-flex flex-column">
                            <span>Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>

                    {/* File 3 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2">
                            <FileEarmarkText size={32} />
                        </div>
                        <div className="d-flex flex-column">
                            <span>Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>

                </div>
                <button className="btn btn-primary mt-3 w-100">Xem tất cả</button>
            </>}

            {/* Link */}
            <div className="d-flex align-items-center">
                <h5 className="flex-grow-1 mt-2 mb-3">Link</h5>
                <CaretDownFill onClick={() => setShowLink(prev => !prev)} className="text-black small flex-shrink-0" style={{ cursor: "pointer", transform: showLink ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.25s ease" }} />
            </div>
            {showLink && <>
                <div className="d-flex flex-column gap-3">
                    {/* Link 1 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2">
                            <FileEarmarkText size={32} />
                        </div>
                        <div className="d-flex flex-column">
                            <span>Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>

                    {/* Link 2 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2">
                            <FileEarmarkText size={32} />
                        </div>
                        <div className="d-flex flex-column">
                            <span>Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>

                    {/* Link 3 */}
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="rounded-3 bg-secondary-subtle d-flex align-items-center p-2">
                            <FileEarmarkText size={32} />
                        </div>
                        <div className="d-flex flex-column">
                            <span>Moc_bran_guideLines.pdf</span>
                            <span className="small text-secondary">2,4MB</span>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary mt-3 w-100">Xem tất cả</button>
            </>}




        </div>
    );
}