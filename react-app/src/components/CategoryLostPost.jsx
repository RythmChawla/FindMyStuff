import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import './Home.css';
import Footer from "./Footer";

function CategoryLostPost(){
    const p = useParams()
    const[posts,setposts]=useState([]);
    useEffect(()=>{
        const data=p.CatId
        const url = 'http://localhost:4000/lost/get-category/'+data;
        axios.post(url)
        .then((res)=>{
            if(res.data.posts){
                const reversedPosts = res.data.posts.reverse();
                setposts(reversedPosts);
            }
        })
        .catch((err)=>{console.log(err); alert("Server error")})
    },[])


    return(
        <div>
        <div >
            <Header/>
            <Link to='/lost'><button>ALL RESULTS</button></Link>
            <div>{posts && posts.length>0 && <h3>Category wise results for items found</h3>} 
            {posts && posts.length==0 && <h4>No items found under this category</h4>}</div><br></br>
            <div className="d-flex justify-content-center flex-wrap">
                {posts && posts.length>0 && 
                posts.map((item,index)=>{
                    return(
                        <div className="card m-3 p-3">
                        <img src={'http://localhost:4000/' + item.image} alt="Item" className="card-image" /> 
                        <div className="card-content">
                                    <h5>{item.type} | Category: {item.category}</h5> 
                                    <p>Title: {item.title} </p>
                                    <p>Description: {item.desc}</p>
                                    <p>{item.type} Date: {item.date}</p>
                                    <p>{item.type} at: {item.place}</p>
                                    <p>Contact details: {item.contact}</p>
                                </div>
                        </div>
                    )
                })
                }
            </div>
            
        </div>
        <Footer/>
        </div>
    )
}
export default CategoryLostPost;