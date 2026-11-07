import { faBookmark, faCircleQuestion, faCommentDots, faComments, faFolderOpen, faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSliders, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";


interface LeftSideBarProps {
    isChat?: boolean;
    isUser?: boolean;
    isFolder?: boolean;
    isBookMark?: boolean;

}

export default function LeftSideBar({ isChat = false, isUser = false, isFolder = false, isBookMark = false }: LeftSideBarProps) {

    return (
        <div className="d-flex flex-column align-items-center vh-100 " style={{ backgroundColor: "#F0F2ED" }}>
            <span className="bg-primary mt-3 text-light p-2 d-inline-flex align-items-center justify-content-center rounded-3" style={{ width: '42px', height: '42px' }}>
                <FontAwesomeIcon icon={faCommentDots} className="fs-4" />
            </span>
            <div className="d-flex flex-column gap-3 mt-4">
                <Link to="#" className={`${isChat && 'active'}  p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                    <FontAwesomeIcon icon={faComments} className="fs-4 chat-icon" />
                </Link>
                <Link to="#" className={`${isUser && 'active'}  p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                    <FontAwesomeIcon icon={faUserGroup} className="fs-4 chat-icon" />
                </Link>

                <span className={`${isFolder && 'active'} p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                    <FontAwesomeIcon icon={faFolderOpen} className="fs-4 chat-icon" />
                </span>
                <Link to="#" className={`${isBookMark && 'active'} p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                    <FontAwesomeIcon icon={faBookmark} className="fs-4 chat-icon" />
                </Link>
            </div>

            <div className="d-flex flex-column gap-3 mt-auto">
                <Link to="#" className={`  p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                    <FontAwesomeIcon icon={faMoon} className="fs-4 chat-icon" />
                </Link>
                <div className="d-flex flex-column gap-3 mb-3">
                    <Link to="#" className={`${isUser && 'active'}  p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                        <FontAwesomeIcon icon={faCircleQuestion} className="fs-4 chat-icon" />
                    </Link>

                    <Link to="#" className={`${isFolder && 'active'} p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                        <FontAwesomeIcon icon={faSliders} className="fs-4 chat-icon" />
                    </Link>
                    <span className={` p-2 d-inline-flex align-items-center justify-content-center rounded-circle`} style={{ width: '42px', height: '42px' }}>
                        <img src="https://png.pngtree.com/png-clipart/20210606/original/pngtree-gray-avatar-placeholder-png-image_6398267.jpg" width={"42px"} height="42px" />
                    </span>
                </div>
            </div>
        </div>
    );
}