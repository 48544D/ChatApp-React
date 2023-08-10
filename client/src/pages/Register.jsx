import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { registerInfo, updateRegisterInfo, registerUser, isRegisterLoading } =
    useContext(AuthContext);

  return (
    <Form onSubmit={registerUser}>
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "10%",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Register</h2>

            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) =>
                updateRegisterInfo({
                  ...registerInfo,
                  username: e.target.value,
                })
              }
            />
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                updateRegisterInfo({
                  ...registerInfo,
                  password: e.target.value,
                })
              }
            />

            <Button variant="primary" type="submit">
              {isRegisterLoading ? "Loading..." : "Register"}
            </Button>

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
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;
