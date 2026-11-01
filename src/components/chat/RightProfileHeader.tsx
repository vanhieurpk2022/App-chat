import { Bell, Person, PersonAdd } from "react-bootstrap-icons";

export default function RightProfileHeader() {
    return (
        <div >
            <span>Thông tin liên hệ</span>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="rounded-circle overflow-hidden" style={{ width: "128px", height: "128px" }}>
                    <img src="https://placehold.co/400" width={"100%"} height={"100%"} alt="" />
                </div>
                <span className="fs-4 fw-semibold">Nguyễn Mai</span>
                <span className="small text-secondary">Hoạt động bây giờ</span>


                <div className="d-flex flex-row justify-content-evenly mt-3 gap-3">
                    <div className="d-flex flex-column align-items-center gap-2 text-center" style={{ width: "85px" }}>
                        <div className="rounded-circle bg-secondary-subtle p-2 overflow-hidden d-flex align-items-center">
                            <Person size={"20"} />
                        </div>
                        <span className="small text-wrap">Hồ sơ</span>
                    </div>

                    <div className="d-flex flex-column align-items-center gap-2 text-center" style={{ width: "85px" }}>
                        <div className="rounded-circle bg-secondary-subtle p-2 overflow-hidden d-flex align-items-center">
                            <Bell size={"20"} />
                        </div>
                        <span className="small text-wrap">Thông báo</span>
                    </div>

                    <div className="d-flex flex-column align-items-center gap-2 text-center" style={{ width: "85px" }}>
                        <div className="rounded-circle bg-secondary-subtle p-2 overflow-hidden d-flex align-items-center">
                            <PersonAdd size={"20"} />
                        </div>
                        <span className="small text-wrap" style={{ lineHeight: "1.2" }}>Tạo nhóm trò chuyện</span>
                    </div>

                </div>

            </div>
        </div >
    );
}