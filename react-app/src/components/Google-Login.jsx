import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import Header from './Header';
import axios from 'axios';
import { useState } from 'react'; 

function Google_Login(){    
    return(
        <div >
            <Header/>
            <span>This is LogIn page </span><br></br>
            <button><a href="http://localhost:4000/google-login">Login to google</a></button>
        </div>
        
    )
}
export default Google_Login;