import '@fortawesome/fontawesome-free/css/all.css';
import './Home.css';
function Footer(){
    
    return(
        <footer>
            <div className="footer-content">
                <div className="footer-logo">FindMyStuff</div>
                <ul className="footer-links">
                    <li><a href="#about-section">About FindMyStuff</a></li>
                    <li><a href="#recentPosts-section">Recent Posts</a></li>
                    <li><a href="#faq-section">FAQ's</a></li>
                    <li><a href="#contact-section">Contact Us</a></li>
                </ul>
                <div className="footer-social">
                    <a href="https://www.instagram.com/shyam._.04" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.facebook.com/shyam.agrawal.946517" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                    <a href="https://www.linkedin.com/in/rythm-chawla-499113264" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                </div>
            </div>
            <p className="footer-copyright">&copy; 2024 FindMyStuff. All rights reserved.</p>
        </footer>
    );
}
export default Footer;