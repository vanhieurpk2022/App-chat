import './App.css';

import { Routes, Route, Navigate } from 'react-router';

import Chat from './layout/Chat';
import Contacts from './components/contacts/Contacts';
import Settings from './layout/Settings';

function App() {
    return (
        <div id="app-container">
            <Routes>
                <Route path="/chat" element={<Chat />} />

                <Route path="/contacts" element={<Contacts />} />

                <Route path="/settings" element={<Settings />} />

                <Route path="/" element={<Navigate to="/chat" replace />} />

                <Route path="*" element={<Navigate to="/chat" replace />} />
            </Routes>
        </div>
    );
}

export default App;