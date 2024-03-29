import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar.jsx";
import { ChatContextProvider } from "./context/chatContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <ChatContextProvider>
      <NavBar />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={user ? <Chat /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </div>
    </ChatContextProvider>
  );
}

export default App;
