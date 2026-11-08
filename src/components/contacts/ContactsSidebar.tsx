import {
    faBookmark,
    faCircleQuestion,
    faCommentDots,
    faComments,
    faFolderOpen,
    faMoon
} from "@fortawesome/free-regular-svg-icons";

import {
    faSliders,
    faUserGroup
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";

export default function LeftSideBar() {
    const iconStyle = {
        width: '42px',
        height: '42px'
    };

    const navClass = ({ isActive }: { isActive: boolean }) =>
        `${isActive ? 'active' : ''} p-2 d-inline-flex align-items-center justify-content-center rounded-3`;

    return (
        <div
            className="d-flex flex-column vh-100 p-3"
            style={{ backgroundColor: "#F0F2ED" }}
        >
            <span
                className="bg-primary mt-3 text-light p-2 d-inline-flex align-items-center justify-content-center rounded-3"
                style={iconStyle}
            >
                <FontAwesomeIcon icon={faCommentDots} className="fs-4" />
            </span>

            <div className="d-flex flex-column gap-3 mt-4">

                {/* Trang Chat */}
                <NavLink to="/chat" className={navClass} style={iconStyle}>
                    <FontAwesomeIcon icon={faComments} className="fs-4 chat-icon" />
                </NavLink>

                {/* Trang Danh bạ */}
                <NavLink to="/contacts" className={navClass} style={iconStyle}>
                    <FontAwesomeIcon icon={faUserGroup} className="fs-4 chat-icon" />
                </NavLink>

                <span
                    className="p-2 d-inline-flex align-items-center justify-content-center rounded-3"
                    style={iconStyle}
                >
                    <FontAwesomeIcon icon={faFolderOpen} className="fs-4 chat-icon" />
                </span>

                <span
                    className="p-2 d-inline-flex align-items-center justify-content-center rounded-3"
                    style={iconStyle}
                >
                    <FontAwesomeIcon icon={faBookmark} className="fs-4 chat-icon" />
                </span>
            </div>

            <div className="d-flex flex-column gap-3 mt-auto">
                <span
                    className="p-2 d-inline-flex align-items-center justify-content-center rounded-3"
                    style={iconStyle}
                >
                    <FontAwesomeIcon icon={faMoon} className="fs-4 chat-icon" />
                </span>

                <div className="d-flex flex-column gap-3 mb-3">
                    <span
                        className="p-2 d-inline-flex align-items-center justify-content-center rounded-3"
                        style={iconStyle}
                    >
                        <FontAwesomeIcon icon={faCircleQuestion} className="fs-4 chat-icon" />
                    </span>

                    <span
                        className="p-2 d-inline-flex align-items-center justify-content-center rounded-3"
                        style={iconStyle}
                    >
                        <FontAwesomeIcon icon={faSliders} className="fs-4 chat-icon" />
                    </span>

                    <span
                        className="p-2 d-inline-flex align-items-center justify-content-center rounded-circle"
                        style={iconStyle}
                    >
                        <img
                            src="https://png.pngtree.com/png-clipart/20210606/original/pngtree-gray-avatar-placeholder-png-image_6398267.jpg"
                            width="42px"
                            height="42px"
                            alt="Avatar"
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}