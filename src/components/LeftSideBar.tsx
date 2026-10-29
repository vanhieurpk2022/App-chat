import { faBookmark, faCircleQuestion, faCommentDots, faComments, faFolderOpen, faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSliders, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface LeftSideBarProps {
    isChat?: boolean;
    isUser?: boolean;
    isFolder?: boolean;
    isBookMark?: boolean;

}

export default function LeftSideBar({ isChat = false, isUser = false, isFolder = false, isBookMark = false }: LeftSideBarProps) {

    return <>
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#F0F2ED" }}>
            <span className="bg-primary mt-3 text-light p-2 d-inline-flex align-items-center justify-content-center rounded-3" style={{ width: '42px', height: '42px' }}>
                <FontAwesomeIcon icon={faCommentDots} className="fs-4" />
            </span>
            <div className="d-flex flex-column gap-3 mt-4">
                <span className={`${isChat}  p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                    <FontAwesomeIcon icon={faComments} className="fs-4 chat-icon" />
                </span>
                <span className={`${isUser}  p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                    <FontAwesomeIcon icon={faUserGroup} className="fs-4 chat-icon" />
                </span>

                <span className={`${isFolder} p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                    <FontAwesomeIcon icon={faFolderOpen} className="fs-4 chat-icon" />
                </span>
                <span className={`${isBookMark} p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                    <FontAwesomeIcon icon={faBookmark} className="fs-4 chat-icon" />
                </span>
            </div>

            <div className="d-flex flex-column gap-3 mt-auto">
                <span className={`${isChat}  p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                    <FontAwesomeIcon icon={faMoon} className="fs-4 chat-icon" />
                </span>
                <div className="d-flex flex-column gap-3 mb-3">
                    <span className={`${isUser}  p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                        <FontAwesomeIcon icon={faCircleQuestion} className="fs-4 chat-icon" />
                    </span>

                    <span className={`${isFolder} p-2 d-inline-flex align-items-center justify-content-center rounded-3`} style={{ width: '42px', height: '42px' }}>
                        <FontAwesomeIcon icon={faSliders} className="fs-4 chat-icon" />
                    </span>
                    <span className={` p-2 d-inline-flex align-items-center justify-content-center rounded-circle`} style={{ width: '42px', height: '42px' }}>
                        <img src="https://png.pngtree.com/png-clipart/20210606/original/pngtree-gray-avatar-placeholder-png-image_6398267.jpg" width={"42px"} height="42px" />
                    </span>
                </div>
            </div>
        </div>
    </>
}