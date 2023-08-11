import { useContext } from "react";
import { Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { info, updateInfo, registerUser, isLoading } = useContext(AuthContext);

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
                updateInfo({
                  ...info,
                  username: e.target.value,
                })
              }
            />
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                updateInfo({
                  ...info,
                  password: e.target.value,
                })
              }
            />

            <Button variant="primary" type="submit">
              {isLoading ? "Loading..." : "Register"}
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
