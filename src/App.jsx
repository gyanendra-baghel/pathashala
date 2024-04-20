import { BrowserRouter,  Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Quiz from "./pages/Classroom/Quiz"
import Chat from "./pages/Classroom/Chat"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatBotProvider from "./context/ChatBotContext"
import WhiteBoard from "./pages/WhiteBoard";
import Logout from "./pages/Logout";
import CreateClassroom from "./pages/Classroom/CreateClassroom";
// import RoomProvider from "./context/RoomContext";
import BoardProvider from "./context/BoardContext"
import './App.css'
import './chat.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/class/:classId" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/create" element={<CreateClassroom/>} />
        <Route path="/board" element={<BoardProvider><WhiteBoard/></BoardProvider>} />
        <Route path="/ai" element={<ChatBotProvider><Chat/></ChatBotProvider> } />
        <Route path="/logout" element={<Logout/> } />
    </Routes>
    </BrowserRouter>
  )
}

export default App
