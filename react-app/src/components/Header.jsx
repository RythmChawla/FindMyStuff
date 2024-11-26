import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

function  Header() {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('user_email');
        navigate('/google-login');
    };
    const query = useQuery();
    const user_email=query.get('user_email');
    if(user_email) {
        localStorage.setItem('user_email',user_email);
    }
    return (
        <header className="header">
            <div className="logo">FindMyStuff</div>
            <nav>
                <ul>
                    <li><Link to="/" className="header-link">Home</Link></li>
                    <li><Link to="/add-post" className="header-link">Add Posts</Link></li>
                    <li><Link to='/my-posts' className="header-link">MY POSTS</Link></li>
                </ul>
            </nav>
            <div className="auth-buttons">
                {!localStorage.getItem('user_email') && <Link to="/google-login" className="header-button">Login</Link>}
                {localStorage.getItem('user_email') && <button className="header-btn" onClick={handleLogOut}>Logout</button>}
            </div>
        </header>
    );
}

export default Header;
