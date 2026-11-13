
import './App.css';

import { Routes, Route, Navigate } from 'react-router';

import Chat from './layout/Chat';
import Contacts from './components/contacts/Contacts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store/store';
import { ChatSocketHandle } from './wss/ChatSocketHandle';

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const cleanSocket = ChatSocketHandle(dispatch);
        return () => {
            cleanSocket();
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