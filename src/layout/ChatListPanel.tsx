import Card from "../components/utils/Card";
import ChatListPanelHeader from "../components/utils/ChatListPanelHeader";

export default function ChatListPanel() {
    return (
        <div className="ms-3">
            <ChatListPanelHeader />
            <div className="mt-3 d-flex flex-column">
                <Card imgUrl="https://png.pngtree.com/png-clipart/20220909/original/pngtree-women-cartoon-avatar-in-flat-style-png-image_8515458.png"
                    name="Nguyễn Mai" time="10:32" message="Mai: Nhớ gửi bản thảo nhé!" isActive={true} />
                <Card imgUrl="https://png.pngtree.com/png-clipart/20220909/original/pngtree-women-cartoon-avatar-in-flat-style-png-image_8515458.png"
                    name="Nguyễn Mai" time="10:32" message="Mai: Nhớ gửi bản thảo nhé!" />
                <Card imgUrl="https://png.pngtree.com/png-clipart/20220909/original/pngtree-women-cartoon-avatar-in-flat-style-png-image_8515458.png"
                    name="Nguyễn Mai" time="10:32" message="Mai: Nhớ gửi bản thảo nhé!" />
                <Card imgUrl="https://png.pngtree.com/png-clipart/20220909/original/pngtree-women-cartoon-avatar-in-flat-style-png-image_8515458.png"
                    name="Nguyễn Mai" time="10:32" message="Mai: Nhớ gửi bản thảo nhé!" />
            </div>

        </div>
    );
}