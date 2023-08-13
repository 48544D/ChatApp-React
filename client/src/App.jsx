import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/navbar.jsx";
import { ChatContextProvider } from "./context/chatContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <ChatContextProvider>
      <NavBar />
      <Container>
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
      </Container>
    </ChatContextProvider>
  );
}

export default App;
