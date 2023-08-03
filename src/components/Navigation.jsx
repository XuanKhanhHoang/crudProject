import "../styles/Navigation.scss";
import vnLogo_Img from "../assets/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png";
import enLogo_Img from "../assets/flag-of-the-united-kingdom-flags-of-the-world-nordic-cross-flag-united-kingdom-d00246040eb432dc3d45e446354454ec.png";
import logo from "../assets/logoMain.jpg";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
function Navigation() {
  const { logout, user } = useContext(UserContext);
  const navigate = useNavigate();
  const HandleLogInOut = () => {
    if (user.auth) {
      toast.success("Log out succesful", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      logout();
      navigate("/");
    } else navigate("/login");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand to="/" as={NavLink}>
            <img alt="" className="logo" srcSet={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto text-center col-12 ">
              {user.auth && (
                <Nav.Item
                  className="m-auto d-block d-lg-none p-1"
                  style={{ fontFamily: "serif", color: "#999" }}
                >
                  Hello {user.email}
                </Nav.Item>
              )}
              <Nav.Link className="fontWeight500" to="/" as={NavLink}>
                Home
              </Nav.Link>
              {user.auth && (
                <>
                  <Nav.Link
                    to="/manage/1"
                    className="fontWeight500"
                    as={NavLink}
                  >
                    Manage
                  </Nav.Link>
                  <Nav.Item
                    className="m-auto d-none d-lg-block"
                    style={{ fontFamily: "serif", color: "#999" }}
                  >
                    Hello {user.email}
                  </Nav.Item>
                </>
              )}
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
                title="More"
                id="basic-nav-dropdown"
                className="mx-auto mx-lg-0 "
              >
                <div className="show-Fade_in">
                  <NavDropdown.Item href="/About">About</NavDropdown.Item>
                  <NavDropdown.Item
                    href="https://github.com/XuanKhanhHoang/crudProject.git"
                    target="_blank"
                  >
                    To my Github
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="fontWeight500"
                    onClick={HandleLogInOut}
                  >
                    {user.auth ? <>Log out </> : <>Login</>}
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Navigation;
