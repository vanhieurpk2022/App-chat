import './App.css'
import ChatMain from './components/chat/ChatMain';
import RightProfile from './components/chat/RightProfile';
import LeftSideBar from './components/utils/MainSideBar';
import ChatListPanel from './layout/ChatListPanel';

function App() {
  return (
    <div id="app-container">
      <div className='d-flex flex-row'>
        <LeftSideBar isChat={true} />
        <ChatListPanel />
        <ChatMain />
        <RightProfile />
      </div>
    </div>
  );
}

export default App
