
import './App.css';

import { Routes, Route, Navigate } from 'react-router';

import Chat from './layout/Chat';
import Contacts from './components/contacts/Contacts';

function App() {
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