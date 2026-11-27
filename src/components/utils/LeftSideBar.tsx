import { useState } from "react";
import {
    faBookmark,
    faCircleQuestion,
    faCommentDots,
    faComments,
    faFolderOpen,
    faMoon
} from "@fortawesome/free-regular-svg-icons";

import {
    faRightFromBracket,
    faSliders,
    faUserGroup
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { logout } from "../../store/authSlice";
import type { RootState } from "../../store/store";

interface LeftSideBarProps {
    isChat?: boolean;
    isUser?: boolean;
    isFolder?: boolean;
    isBookMark?: boolean;
    isSettings?: boolean;
}

export default function LeftSideBar({
    isChat = false,
    isUser = false,
    isFolder = false,
    isBookMark = false,
    isSettings = false
}: LeftSideBarProps) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state: RootState) => state.auth.user);

    const iconSize = {
        width: "42px",
        height: "42px"
    };

    const handleConfirmLogout = () => {
        dispatch(logout());
        setShowLogoutModal(false);
        navigate("/login");
    };

    return (
        <div
            className="d-flex flex-column align-items-center vh-100"
            style={{ backgroundColor: "#F0F2ED" }}
        >
            <span
                className="bg-primary mt-3 text-light p-2 d-inline-flex align-items-center justify-content-center rounded-3"
                style={iconSize}
            >
                <FontAwesomeIcon icon={faCommentDots} className="fs-4" />
            </span>

            <div className="d-flex flex-column gap-3 mt-4">
                <NavLink
                    to="/chat"
                    className={`p-2 d-inline-flex align-items-center justify-content-center rounded-3 ${isChat ? "active" : ""}`}
                    style={iconSize}
                >
                    <FontAwesomeIcon icon={faComments} className="fs-4 chat-icon" />
                </NavLink>

                <NavLink
                    to="/contacts"
                    className={`p-2 d-inline-flex align-items-center justify-content-center rounded-3 ${isUser ? "active" : ""}`}
                    style={iconSize}
                >
                    <FontAwesomeIcon icon={faUserGroup} className="fs-4 chat-icon" />
                </NavLink>

                <span
                    className={`p-2 d-inline-flex align-items-center justify-content-center rounded-3 ${isFolder ? "active" : ""}`}
                    style={iconSize}
                >
                    <FontAwesomeIcon icon={faFolderOpen} className="fs-4 chat-icon" />
                </span>

                <span
                    className={`p-2 d-inline-flex align-items-center justify-content-center rounded-3 ${isBookMark ? "active" : ""}`}
                    style={iconSize}
                >
                    <FontAwesomeIcon icon={faBookmark} className="fs-4 chat-icon" />
                </span>
            </div>

            <div className="d-flex flex-column gap-3 mt-auto">
                <span
                    className="p-2 d-inline-flex align-items-center justify-content-center rounded-3"
                    style={iconSize}
                >
                    <FontAwesomeIcon icon={faMoon} className="fs-4 chat-icon" />
                </span>

                <div className="d-flex flex-column gap-3 mb-3">
                    <span
                        className="p-2 d-inline-flex align-items-center justify-content-center rounded-3"
                        style={iconSize}
                    >
                        <FontAwesomeIcon icon={faCircleQuestion} className="fs-4 chat-icon" />
                    </span>

                    <NavLink
                        to="/settings"
                        className={`p-2 d-inline-flex align-items-center justify-content-center rounded-3 ${isSettings ? "active" : ""}`}
                        style={iconSize}
                        title="Cài đặt"
                    >
                        <span>
                            <FontAwesomeIcon icon={faSliders} className="fs-4 chat-icon" />
                        </span>
                    </NavLink>

                    <button
                        type="button"
                        onClick={() => setShowLogoutModal(true)}
                        className="p-2 d-inline-flex align-items-center justify-content-center rounded-3 border-0 bg-transparent"
                        style={iconSize}
                        title="Đăng xuất"
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} className="fs-4 chat-icon text-danger" />
                    </button>

                    <span
                        className="p-2 d-inline-flex align-items-center justify-content-center rounded-circle"
                        style={iconSize}
                        title={currentUser || "Tài khoản"}
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

            {showLogoutModal && (
                <div className="modal-backdrop-custom">
                    <div className="modal-card-custom animate-fade-in" style={{ maxWidth: "380px" }}>
                        <h6 className="fw-bold mb-2">Xác nhận đăng xuất</h6>
                        <p className="text-muted small mb-4">
                            Bạn có chắc muốn đăng xuất khỏi phiên làm việc hiện tại không?
                        </p>
                        <div className="d-flex justify-content-end gap-2">
                            <button
                                type="button"
                                className="btn btn-light btn-sm px-3"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm px-3"
                                onClick={handleConfirmLogout}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}