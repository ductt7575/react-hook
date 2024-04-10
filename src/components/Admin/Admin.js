import { Link } from 'react-router-dom';
const Admin = (props) => {
    return (
        <div>
            Admin components{' '}
            <button>
                <Link to="/" className="list">
                    Go home page
                </Link>
            </button>
        </div>
    );
};
export default Admin;
