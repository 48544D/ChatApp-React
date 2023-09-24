import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import DropdownMenu from "./DropDownMenu";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <Navbar bg="dark" className="mb-4">
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            ChatApp
          </Link>
        </h2>
        <Nav>
          {!user && (
            <Stack direction="horizontal" gap={3}>
              <Link to="/login" className="link-light text-decoration-none">
                Login
              </Link>
              <Link to="/register" className="link-light text-decoration-none">
                Register
              </Link>
            </Stack>
          )}
          {user && <DropdownMenu />}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
