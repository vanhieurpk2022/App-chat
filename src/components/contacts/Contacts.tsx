import LeftSideBar from '../utils/LeftSideBar';

export default function Contacts() {
    return (
        <div className="d-flex vh-100">
            <div style={{ width: '80px' }} className="flex-shrink-0">
                <LeftSideBar />
            </div>

            <div className="flex-grow-1 p-4">
                <h2>Danh bạ</h2>
                <p>Giao diện Danh bạ sẽ được triển khai tại đây.</p>
            </div>
        </div>
    );
}