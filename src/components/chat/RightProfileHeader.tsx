import { Bell, Person, PersonAdd } from "react-bootstrap-icons";

export default function RightProfileHeader() {
    return (
        <div >
            <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                <div className="rounded-circle overflow-hidden mb-4 mt-3" style={{ width: "90px", height: "90px" }}>
                    <img src="https://placehold.co/400" width={"100%"} height={"100%"} alt="" />
                </div>
                <span className="fs-4 fw-semibold">Nguyễn Mai</span>


                <div className="d-flex flex-row justify-content-evenly mt-3 gap-3">
                    <div className="d-flex flex-column align-items-center gap-2 text-center" style={{ width: "85px" }}>
                        <button className="icon-button rounded-circle btn border-0 bg-secondary-subtle overflow-hidden d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                            style={{ cursor: "pointer" }}>
                            <Person size={"20"} />
                        </button>
                        <span className="small text-wrap">Hồ sơ</span>
                    </div>

                    <div className="d-flex flex-column align-items-center gap-2 text-center" style={{ width: "85px" }}>
                        <button className="icon-button rounded-circle btn border-0 bg-secondary-subtle overflow-hidden d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                            style={{ cursor: "pointer" }}>
                            <Bell size={"20"} />
                        </button>
                        <span className="small text-wrap">Thông báo</span>
                    </div>

                    <div className="d-flex flex-column align-items-center gap-2 text-center" style={{ width: "85px" }}>
                        <button className="icon-button rounded-circle btn border-0 bg-secondary-subtle overflow-hidden d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                            style={{ cursor: "pointer" }}>
                            <PersonAdd size={"20"} />
                        </button>
                        <span className="small text-wrap" style={{ lineHeight: "1.2" }}>Tạo nhóm trò chuyện</span>
                    </div>

                </div>

            </div>
        </div >
    );
}