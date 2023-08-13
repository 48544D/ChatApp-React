import { useContext } from "react";
import { Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { loginUser, updateInfo, info, isLoading } = useContext(AuthContext);

  return (
    <Form onSubmit={loginUser}>
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "10%",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Login</h2>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) =>
                updateInfo({ ...info, username: e.target.value })
              }
            />
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                updateInfo({ ...info, password: e.target.value })
              }
            />

            <Button variant="primary" type="submit">
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
