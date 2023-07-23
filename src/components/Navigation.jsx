import "../styles/Navigation.scss";
import vnLogo_Img from "../assets/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png";
import enLogo_Img from "../assets/flag-of-the-united-kingdom-flags-of-the-world-nordic-cross-flag-united-kingdom-d00246040eb432dc3d45e446354454ec.png";
import logo from "../assets/logoMain.jpg";
import { Link, NavLink, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
function Navigation() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img alt="" className="logo" srcSet={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto text-center col-12">
              <Nav.Link to="/" as={NavLink}>
                Home
              </Nav.Link>
              <Nav.Link to="/manage" as={NavLink}>
                Manage
              </Nav.Link>
              <Dropdown className="me-lg-3 ms-md-auto my-0 mx-auto">
                <Dropdown.Toggle variant="dark flex-nowrap" id="dropdown-basic">
                  <img
                    srcSet={vnLogo_Img}
                    alt=""
                    className="languageLogo vnLanguageLogo"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="mt-1 show-Fade_in">
                  <Dropdown.Item href="#/action-1">
                    <img
                      srcSet={vnLogo_Img}
                      alt=""
                      className="languageLogo vnLanguageLogo"
                    />
                    Vietnamese
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    {" "}
                    <img
                      srcSet={enLogo_Img}
                      alt=""
                      className="languageLogo enLanguageLogo"
                    />
                    English
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <NavDropdown
                title="Dropdown"
                id="basic-nav-dropdown"
                className="mx-auto mx-lg-0 "
              >
                <div className="show-Fade_in">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Log out
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
