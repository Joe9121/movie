import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/about_us.css';

function AboutUs() {
    return (
        <div className="about-us-container bg-dark text-light py-5">
            <div className="container">
                <h1 className="text-center mb-4">About Us</h1>
                    <section className="mission mb-5">
                        <h2>Our Mission</h2>
                        <p>
                            At MovieMania, our mission is to celebrate the art of cinema and provide a platform for movie enthusiasts to discover, discuss, and enjoy films from around the world. We believe that movies have the power to inspire, educate, and entertain, and we are committed to fostering a community where film lovers can come together to share their passion.
                        </p>
                    </section>
                    <section className="team mb-5">
                        <h2>Meet the Team</h2>
                        <p>
                            Our team is composed of passionate movie buffs, critics, and industry professionals who are dedicated to bringing you insightful reviews, in-depth articles, and the latest news in the world of cinema. Each member of our team brings a unique perspective and a wealth of experience, ensuring that our content is both diverse and comprehensive.
                        </p>
                        <div className="row">
                            <div className="col-4">
                                <div className="team-member text-center">
                                    <h3>John Doe</h3>
                                    <p>Founder & CEO</p>
                                    <p>John has over 20 years of experience in the film industry and is a renowned film critic. His vision for MovieMania is to create a space where movie lovers can connect.</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="team-member text-center">
                                    <h3>Jane Smith</h3>
                                    <p>Chief Editor</p>
                                    <p>Jane is a seasoned journalist with a passion for storytelling. She oversees all editorial content and ensures that our articles are engaging and informative.</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="team-member text-center">
                                    <h3>Emily Johnson</h3>
                                    <p>Community Manager</p>
                                    <p>Emily is responsible for fostering a vibrant and inclusive community. She organizes events, manages our social media presence, and engages with our audience.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="values mb-5">
                        <h2>Our Values</h2>
                        <ul>
                            <li>Passion for Movies: We are driven by our love for cinema and our desire to share that passion with others.</li>
                            <li>Commitment to Quality: We strive to provide high-quality content that is both informative and entertaining.</li>
                            <li>Community Engagement: We believe in the power of community and are dedicated to creating a space where movie enthusiasts can connect and engage.</li>
                            <li>Integrity and Transparency: We are committed to maintaining the highest standards of integrity and transparency in all that we do.</li>
                        </ul>
                    </section>
                    <section className="history mb-5">
                        <h2>Our History</h2>
                        <p>
                            MovieMania was founded in 2010 with the goal of creating a platform for movie lovers to come together and share their passion. Over the years, we have grown into a thriving community of film enthusiasts, and our website has become a go-to destination for movie reviews, news, and discussions. We are proud of our journey and excited for what the future holds.
                        </p>
                    </section>
                    <section className="contact">
                        <h2>Contact Us</h2>
                        <p>
                            Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:contact@moviemania.com">contact@moviemania.com</a> or follow us on social media for the latest updates and discussions.
                        </p>
                    </section>
            </div>
        </div>
    );
}

export default AboutUs;