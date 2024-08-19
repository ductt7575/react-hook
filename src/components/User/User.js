import { Link } from "react-router-dom";
const User = () => {
  return (
    <div>
      User components
      <button>
        <Link to="/" className="list">
          Go home page
        </Link>
      </button>
    </div>
  );
};
export default User;
