
import './App.css';

import { Routes, Route, Navigate } from 'react-router';

import Chat from './layout/Chat';
import Contacts from './components/contacts/Contacts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store/store';
import { ChatSocketHandle } from './wss/ChatSocketHandle';
import { AuthSocketHandler } from './wss/AuthSocketHandler';
import { authService } from './services/authService';

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const cleanSocket = ChatSocketHandle(dispatch);
        const authSocket = AuthSocketHandler(dispatch);

        dispatch(authService.login({ user: "test", pass: "123456" }));

        return () => {
            cleanSocket();
            authSocket();
        }
    }, [dispatch])
    return (
        <div id="app-container">
            <Routes>
                <Route path="/chat" element={<Chat />} />

                <Route path="/contacts" element={<Contacts />} />

                <Route path="/" element={<Navigate to="/chat" replace />} />

                <Route path="*" element={<Navigate to="/chat" replace />} />
            </Routes>
        </div>
    );
}

export default App;