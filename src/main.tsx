import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { persistAuth } from './model/LoginSubcribe.ts'
import { AuthSocketHandler } from './wss/AuthSocketHandler.ts'
import { chatSocket } from './wss/ChatWebSocket.ts'
import { wssEvent } from './model/webSocketUrl.ts'

// main.tsx
persistAuth(store);
AuthSocketHandler(store.dispatch);

// Gửi LOGIN và chờ phản hồi của chính nó
function loginAndWait(user: string, pass: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const off = chatSocket.on(wssEvent.LOGIN, (msg) => {
      off(); // chỉ nghe một lần
      if (msg.status === "success") resolve();
      else reject(new Error(String(msg.mes)));
    });
    chatSocket.send(wssEvent.LOGIN, { user, pass });
  });
}

async function bootstrap() {
  try {
    await chatSocket.connect();            // 1. chờ socket mở
    await loginAndWait("test", "123456");  // 2. chờ đăng nhập thành công
    console.log("Đăng nhập xong, bắt đầu render app");
  } catch (e) {
    console.error("Khởi động lỗi:", e);    // vẫn render để thấy giao diện
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

bootstrap();