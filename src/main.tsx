import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { persistAuth } from './model/LoginSubcribe.ts'
import { chatSocket } from './wss/ChatWebSocket.ts'


// main.tsx


async function init() {
  try {
    await chatSocket.connect();
    console.log("WebSocket connected!");
  } catch (e) {
    console.error("Lỗi kết nối Socket:", e);
  }


  // 3. lúc này mới render, ChatListPanel mount với phiên đã sẵn sàng
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}
init();
persistAuth(store);
