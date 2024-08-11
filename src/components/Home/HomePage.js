import videoHompage from '../../assets/video/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="homepage-container container">
      <div className="video-wrapper">
        <video muted autoPlay loop width="100%" height="100%" preload="none">
          <source src={videoHompage} type="video/mp4" />
        </video>
      </div>
      <div className="homepage-content w-50">
        <h1 className="heading1">{t('homepage.heading1')}</h1>

        <p style={{ lineHeight: '1.76' }} className="desc mt-3 mb-4 w-75">
          {t('homepage.desc')}
        </p>
        {isAuthenticated ? (
          <button className="my-btn btn-start" onClick={() => navigate(`/user`)}>
            {t('homepage.btnStart.doQuiz')}
          </button>
        ) : (
          <button className="my-btn btn-start" onClick={() => navigate(`/login`)}>
            {t('homepage.btnStart.login')}
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
