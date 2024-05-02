import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaReact } from 'react-icons/fa';
import sidebarBg from '../../assets/bg-sidebar.jpg';
import './SideBar.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  const { t } = useTranslation();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            className=""
          >
            <Link to={`/`} className="text-decoration-none">
              <FaReact size={'2.8em'} color={'00bfff'} style={{ margin: '-3px 8px 0px 0px' }} />
              <span className="text-light d-inline-block mt-1 ms-2 fs-6">Trong Duc</span>
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaTachometerAlt />}>
              {t('sideBar.dashboard')} <Link to="/admin/" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaList />} title={t('sideBar.feature')}>
              <MenuItem>
                {t('sideBar.manageUser')} <Link to="/admin/manage-user" />
              </MenuItem>
              <MenuItem>
                {t('sideBar.manageQuiz')} <Link to="/admin/manage-quiz" />
              </MenuItem>
              <MenuItem>
                {t('sideBar.manageQuestion')} <Link to="/admin/manage-question" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a href="https://github.com/ductt7575" target="_blank" className="sidebar-btn" rel="noopener noreferrer">
              <FaGithub size={'1.5em'} />
              <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Than Trong Duc</span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
