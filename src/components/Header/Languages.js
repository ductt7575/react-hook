import { NavDropdown } from 'react-bootstrap';
import { MdLanguage } from 'react-icons/md';

const Languages = () => {
  return (
    <>
      <NavDropdown
        title={
          <>
            <MdLanguage style={{ marginBottom: '3px' }} />
            <span className="ms-1">Vi</span>
          </>
        }
        id="basic-nav-dropdown"
        className="languages"
      >
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Item>Việt Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Languages;
