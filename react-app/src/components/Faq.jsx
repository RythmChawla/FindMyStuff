import {  useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import './Home.css';
function Faq(){
    const [openAccordion, setOpenAccordion] = useState(null);
    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };
    return(
        <section className="faq-section" id="faq-section">
                <h1>Frequently Asked Questions (FAQs)</h1>
                <div className="accordion" id="faqAccordion">
                    {[
                        {
                            question: "How do I post a lost item?",
                            answer: "To post a lost item, go to the 'Post a Lost Item' page, fill in the details about the item, and submit the form. Optionally, you can upload an image of the lost item to help others identify it."
                        },
                        {
                            question: "How can I post a found item?",
                            answer: "To post a found item, navigate to the 'Post a Found Item' page, provide details about the found item, and submit the form. Including an image of the item can assist the owner in recognizing it."
                        },
                        {
                            question: "How do I search for lost and found items?",
                            answer: "To search for lost and found items, use the search bar on the homepage. Enter keywords related to the item you are looking for, and browse through the results to find a match."
                        },
                        {
                            question: "How do I contact the person who posted an item?",
                            answer: "To contact the person who posted an item, click on the post and use the contact information provided. You can then arrange to return or retrieve the item."
                        },
                        {
                            question: "Is there a way to get notifications for new posts?",
                            answer: "Currently, we do not offer notifications for new posts. However, we are working on adding this feature in the future. Please check back for updates."
                        }
                    ].map((faq, index) => (
                        <div className="accordion-item" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button className="accordion-button" type="button" onClick={() => toggleAccordion(index)}>
                                    {faq.question}
                                </button>
                            </h2>
                            <div className={`accordion-body ${openAccordion === index ? 'show' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
    );
}
export default Faq;