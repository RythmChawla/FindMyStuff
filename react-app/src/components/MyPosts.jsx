import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css';
import './Home.css';
import './MyPosts.css';

function MyPosts() {

    const navigate = useNavigate()

    const handleRemove = (pId) => {
        const ID = pId.pId;
        const url = 'http://localhost:4000/delete-post';
        const data = { ID };
        axios.post(url, data)
            .then((res) => {
                console.log(res)
                if (res.data.message) {
                    window.location.reload();
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err)
                alert('SERVER ERROR')
            })
    }

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const data = { 'userid': localStorage.getItem('user_email') };
        const url = 'http://localhost:4000/my-posts';
        axios.post(url, data)
            .then((res) => {
                if (res.data.posts) {
                    const reversedPosts = res.data.posts.reverse();
                    setPosts(reversedPosts);
                }
            })
            .catch((err) => { console.log(err); alert("Server error") })
    }, [])

    return (
        <div>
            <Header />

            <div className="container">
                {posts && posts.length > 0 && <h4 className="posts-header">Your Posts</h4>}
                {posts && posts.length > 0 && posts.map((item, index) => {
                    const pId = item._id;
                    return (
                        <div className="card" key={index}>
                                <img src={'http://localhost${item.category}:4000/' + item.image} alt="Item" className="card-image" />
                                <div className="card-content">
                                    <h5>{item.type} | Category: {item.category}</h5> 
                                    <p>Title: {item.title} </p>
                                    <p>Description: {item.desc}</p>
                                    <p>{item.type} Date: {item.date}</p>
                                    <p>{item.type} at: {item.place}</p>
                                    <p>Contact details: {item.contact}</p>
                                    <button className="remove-button" onClick={() => handleRemove({ pId })}>
                                    <i className="fas fa-trash-alt"></i> Remove
                                </button>
                                </div>
                            </div>



                    )
                })}
                {posts && posts.length === 0 && <h4>You have no active posts</h4>}
            </div>

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
        </div>
    )
}

export default MyPosts;
