import SideBar from './SideBar';
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Languages from '../Header/Languages';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => setCollapsed(!collapsed)}>
            <FaBars className="admin-header__left" />
          </span>
          <div className="admin-header__right">
            <NavDropdown title={t('header.settings')} id="basic-nav-dropdown">
              <NavDropdown.Item>{t('header.profile')}</NavDropdown.Item>
              <NavDropdown.Item>{t('header.logout')}</NavDropdown.Item>
            </NavDropdown>
            <Languages />
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default Admin;
