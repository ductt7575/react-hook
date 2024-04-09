import './App.scss';
import Header from './components/Header/Header';
import { Link } from 'react-router-dom';

const App = () => {
    return (
        <div className="app-container">
            <Header />
            <div>
                Test Link
                <div>
                    <button>
                        <Link to="/users" class="list">
                            Go user page
                        </Link>
                    </button>
                    <button>
                        <Link to="/admins" class="list">
                            Go admin page
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
