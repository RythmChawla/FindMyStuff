import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import categories from './categoriesList';
import '@fortawesome/fontawesome-free/css/all.css';
import './Home.css';
import AboutUs from "./AboutUs";
import Faq from "./Faq";
import Footer from "./Footer";

function FoundHome(){
    const navigate = useNavigate();
    const [openAccordion, setOpenAccordion] = useState(null);

    const handleCategory=(event)=>{
        const category = event.target.value;
        if (category) {
            navigate('/found/category/' + category);
        }
    }

    const[posts,setposts]=useState([]);
    useEffect(()=>{
        const url = 'http://localhost:4000/get-post/found';
        axios.get(url)
        .then((res)=>{
            if(res.data.posts){
                const reversedPosts = res.data.posts.reverse();
                setposts(reversedPosts);
            }
        })
        .catch((err)=>{console.log(err); alert("Server error")})
    },[])
    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };


    return(
        <div className="home-container">
            
            <Header />
            <section className="featured-posts" id="recentPosts-section">
            <h2>Recently Posted Items</h2>
                <div className="search-container">
                    
                <div>
            SEARCH FOR ITEMS: 
            FOUND
            <Link to='/lost'><button>LOST</button></Link>
            <Link to='/'><button>ALL</button></Link>
        </div>
                    <div className="category">SEARCH CATEGORY WISE:
                    <select onChange={handleCategory} className="category-dropdown">
                        <option value="">Select a category</option>
                        {categories && categories.length > 0 &&
                            categories.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                    </select>
                    </div>
                </div>
                <div className="posts-container">
                    {posts && posts.length > 0 &&
                        posts.map((item, index) => (
                            <div className="card" key={index}>
                                <img src={'http://localhost:4000/' + item.image} alt="Item" className="card-image" />
                                <div className="card-content">
                                <p>{item.type} | Category: {item.category}</p>
                                    <p>Title: {item.title} | Category: {item.category}</p>
                                    <p>Description: {item.desc}</p>
                                    <p>Found at: {item.place}</p>
                                    <p>Contact details: {item.contact}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
            <AboutUs/>
            <Faq/>
            <Footer/>
        </div>
    )
}
export default FoundHome;