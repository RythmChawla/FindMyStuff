import '@fortawesome/fontawesome-free/css/all.css';
import './Home.css';
function AboutUs(){
    return(
        <div className="backimage">
            
                <section className="about-section" id="about-section">
                
                <h1>About FindMyStuff</h1>
                <p>Welcome to FindMyStuff, your go-to platform for recovering lost items and reuniting found items with their owners on campus. We understand the inconvenience and frustration that comes with losing personal belongings, and our mission is to create a secure and efficient system to help mitigate this issue.</p>

                <h2>Our Mission</h2>
                <p>Our mission is to foster a community of trust and cooperation within the campus by providing a user-friendly platform where students and staff can report lost and found items. By doing so, we aim to reduce the number of lost items and ensure that found items are returned to their rightful owners promptly.</p>

                <h2>How It Works</h2>
                <ul>
                    <li><strong>Post a Lost Item:</strong> If you have lost something, simply post the details of the lost item, including a description, location, and date it was lost. Optionally, you can upload an image of the item.</li>
                    <li><strong>Post a Found Item:</strong> If you have found an item, you can post the details of the found item, including a description, location, and date it was found. Uploading an image of the item can help the owner identify it more easily.</li>
                    <li><strong>Search and Connect:</strong> Users can browse through the listings of lost and found items. If they find a match, they can connect with the person who posted the listing to arrange for the return of the item.</li>
                </ul>

                <h2>Benefits</h2>
                <ul>
                    <li>Increased chances of recovering lost items.</li>
                    <li>Encourages honesty and cooperation within the campus community.</li>
                    <li>Reduces the number of unclaimed items and potential theft.</li>
                </ul>

                <h2>Join Us</h2>
                <p>Join us in making our campus a safer and more honest place. Whether you've lost something or found an item, FindMyStuff is here to help. Together, we can ensure that lost items find their way back to their rightful owners.</p>

                <p>Thank you for being a part of FindMyStuff. If you have any questions or need assistance, please feel free to <a href="contact.html">contact us</a>.</p>
                </section> 
            </div>
    );
}
export default AboutUs;