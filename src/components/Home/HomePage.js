import videoHompage from '../../assets/video/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <div className="video-wrapper">
        <video muted autoPlay loop width="100%" height="100%" preload="none">
          <source src={videoHompage} type="video/mp4" />
        </video>
      </div>
      <div className="homepage-content">
        {isAuthenticated ? (
          <button className="my-btn btn-start" onClick={() => navigate(`/user`)}>
            Doing quiz now !
          </button>
        ) : (
          <button className="my-btn btn-start" onClick={() => navigate(`/login`)}>
            Get'started. It's free
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
