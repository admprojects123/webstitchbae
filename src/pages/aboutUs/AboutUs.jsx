// pages/AboutUs.js
import React from 'react';
import './AboutUs.css';
import image1 from '../../asset/aboutus1.png'; // Import your images
import image2 from '../../asset/aboutus2.png';



const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="about-content">


                <div className="section"> {/* First section: Text + Image */}
                    <div className="text-content">
                        <h1 style={{margin:"0px"}}>Welcome to Stitch Bae</h1>
                        <p>At Stitch Bae, we believe fashion should be bold, effortless, and unapologetically you. Born from a love for streetwear and self-expression, our brand blends modern design with everyday comfort. Whether you’re dressing up or dressing down, Stitch Bae is all about helping you show up confidently — just as you are.</p>
                        <p>
                        We design for the trendsetters, the risk-takers, and the everyday icons. Each collection is crafted with intention, using quality fabrics, flattering cuts, and statement details that stand out. Our pieces are more than just clothes — they’re wearable confidence, designed to move with you through every moment.
                        </p>
                    </div>
                    <div className="image-content">
                        <img src={image1} alt="Image 1" className="about-image" />
                    </div>

                </div>
                <br />
                <div className="section"> {/* Second section: Image + Text (reverse) */}
                    <div className="image-content">
                        <img src={image2} alt="Image 2" className="about-image" />
                    </div>
                    <div className="text-content">
                        <h2 style={{ margin: "0px" }}>Wear Your Energy</h2>
                        <p>More than a brand, we’re a community. Stitch Bae is for the ones who aren’t afraid to be seen, to stand out, and to inspire. We’re here to redefine casual fashion — one stitch, one drop, and one fire fit at a time. Welcome to the Bae side.</p>
                        <p>At Stitch Bae, we don’t just follow trends — we create space for personal style to evolve. Our collections are inspired by the culture, energy, and creativity of the streets, reimagined through a lens of individuality. Every drop is a reflection of the world we move through — bold, unfiltered, and constantly in motion.</p>
                        <ul className="about-list">
                            <li>Statement pieces that speak louder than words.</li>
                            <li>Premium fabrics that feel as good as they look.</li>
                            <li>Designed to empower, not just impress.</li>
                            <li> Fashion-forward, community-driven.</li>
                        </ul>
                    </div>
                </div>





            </div>
        </div>
    );
};

export default AboutUs;