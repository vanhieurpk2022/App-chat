import LeftSideBar from "../components/utils/LeftSideBar";
import SettingsProfile from "../components/settings/SettingsProfile";

export default function Settings() {
    return (
        <div className="d-flex vh-100">
            <div style={{ width: "80px" }} className="flex-shrink-0">
                <LeftSideBar isSettings={true} />
            </div>

            <div className="flex-grow-1 d-flex flex-column h-100 w-100" style={{ minWidth: 0 }}>
                <SettingsProfile />
            </div>
        </div>
    );
}