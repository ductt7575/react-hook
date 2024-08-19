import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

const Languages = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <NavDropdown
        title={
          <>
            <MdLanguage style={{ marginBottom: "3px" }} />
            {i18n.language === "vi" ? (
              <span className="ms-1">Vi</span>
            ) : (
              <span className="ms-1">En</span>
            )}
          </>
        }
        id="basic-nav-dropdown"
        className="languages"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
          English
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
          Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Languages;
