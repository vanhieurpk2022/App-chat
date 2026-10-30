import './App.css'
import LeftSideBar from './components/utils/MainSideBar';
import ChatListPanel from './layout/ChatListPanel';

function App() {
  return (
    <div id="app-container">
      <div className='d-flex flex-row'>
        <LeftSideBar isChat={true} />

        <ChatListPanel />
      </div>
    </div>
  );
}

export default App
