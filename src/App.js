import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomePage from "./components/pages/WelcomePage";
import ChatroomPage from "./components/pages/ChatroomPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="chatroom" element={<ChatroomPage />} />
            </Routes>
        </Router>
    );
}

export default App;
