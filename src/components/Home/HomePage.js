import videoHompage from '../../assets/video/video-homepage.mp4';
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <div className="video-wrapper">
        <video muted autoPlay loop width="100%" height="100%" preload="none">
          <source src={videoHompage} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default HomePage;
