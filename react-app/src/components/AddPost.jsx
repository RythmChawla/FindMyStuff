import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import './Home.css';
import './AddPost.css';

function AddPost() {
    const today = new Date().toISOString().split('T')[0];

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [place, setPlace] = useState('');
    const [category, setCategory] = useState('Mobiles');
    const [contact, setContact] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState(today);
    const [type, setType] = useState('Lost');

    useEffect(() => {
        if (!localStorage.getItem('user_email')) {
            navigate('/google-login');
        }
    }, []);

    const handleSubmit = () => {
        if (date > today) {
            alert("Please enter a valid date");
            return;
        }

        const formData = new FormData();
        formData.append('type', type);
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('place', place);
        formData.append('date', date);
        formData.append('category', category);
        formData.append('image', image);
        formData.append('contact', contact);
        formData.append('userId', localStorage.getItem('user_email'));

        const url = 'http://localhost:4000/add-post';
        axios.post(url, formData)
            .then((res) => {
                console.log(res);
                if (res.data.message) {
                    alert(res.data.message);
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
                alert('SERVER ERROR');
            });
    };

    return (
        <div>
            <Header />
            <main>
                <section className="post-section">
                    <h3>Post an Item</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} enctype="multipart/form-data">
                        <div className="PostForProduct">
                        <label htmlFor="type">Post for product:</label>
                        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                            <option>Lost</option>
                            <option>Found</option>
                        </select></div>

                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                        <label htmlFor="description">Description:</label>
                        <textarea id="description" value={desc} onChange={(e) => setDesc(e.target.value)} required></textarea>

                        <label htmlFor="date">Date {type}:</label>
                        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />

                        <label htmlFor="location">Location {type}:</label>
                        <input type="text" id="location" value={place} onChange={(e) => setPlace(e.target.value)} required />

                        <label htmlFor="category">Item Category:</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option>Mobiles</option>
                            <option>Electronics</option>
                            <option>Key</option>
                            <option>Umbrella</option>
                            <option>Wallet-Money</option>
                            <option>Cloth</option>
                            <option>Other</option>
                        </select>

                        <label htmlFor="image">Upload Image:</label>
                        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />

                        <label htmlFor="contact">Contact Information </label>
                        <input type="text" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} required />

                        <button type="submit">Post {type} Item</button>
                    </form>
                </section>
            </main>
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
        
    );
}

export default AddPost;
