import { CaretDownFill, FileEarmarkText } from "react-bootstrap-icons";
export default function RightProfileMain() {

    return (
        <div>
            {/* Address */}
            <div className="border-top mt-4 " >
                <div className="d-flex align-items-center">
                    <h5 className="flex-grow-1 mt-2">Ảnh đã chia sẻ</h5>
                    <CaretDownFill className="text-black small flex-shrink-0" />
                </div>
                <div className="d-flex flex-row gap-3 justify-content-start">
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
            </div >
            {/* File */}

            <div className="border-top mt-4 " >
                <div className="d-flex align-items-center">
                    <h5 className="flex-grow-1 ">Tệp đính kèm</h5>
                    <CaretDownFill className="text-black small flex-shrink-0" />
                </div>
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

            </div >

            {/* Link */}
            <div className="border-top mt-4 " >
                <div className="d-flex align-items-center">
                    <h5 className="flex-grow-1 ">Link</h5>
                    <CaretDownFill className="text-black small flex-shrink-0" />
                </div>
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

            </div >


        </div>
    );
}