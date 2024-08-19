import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Languages from "./Languages";
import { useTranslation } from "react-i18next";
import { FaReact } from "react-icons/fa";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogOut = async () => {
    let res = await logOut("account.email", account.refresh_token);
    if (res && res.EC === 0) {
      //clear data redux
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          <span className="me-1">
            <FaReact className="brand-icon" />
          </span>
          <span> {t("appName")}</span>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("headerContainer.home")}
            </NavLink>
            <NavLink to="/user" className="nav-link">
              {t("headerContainer.user")}
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              {t("headerContainer.admin")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button
                  className="my-btn btn-login"
                  onClick={() => handleLogin()}
                >
                  {t("headerContainer.actionBtn.btnLogin")}
                </button>
                <button
                  className="my-btn btn-signup me-2"
                  onClick={() => handleSignup()}
                >
                  {t("headerContainer.actionBtn.btnSignup")}
                </button>
              </>
            ) : (
              <>
                <NavDropdown
                  title={t("header.settings")}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>{t("header.profile")}</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>
                    {t("header.logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            <Languages />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
