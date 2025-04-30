// pages/AboutUs.js
import React from 'react';
import './AboutUs.css';
import image1 from '../../asset/stitchabout.jpg'; // Import your images
import image2 from '../../asset/clothingabout.jpg';



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
From bold streetwear to elevated essentials, we blur the line between fashion and self-expression. Every stitch tells a story — one that’s unapologetically yours.
We believe style should feel empowering, not complicated. That’s why we create versatile pieces that can be dressed up, worn down, and lived in.
This isn’t fast fashion — it’s fashion that lasts, feels good, and reflects who you are. Because when you look good, you lead with confidence.
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
                        <p>At Stitch Bae, we don’t just follow trends — we create space for personal style to evolve. Our collections are inspired by the culture, energy, and creativity of the streets, reimagined through a lens of individuality. Every drop is a reflection of the world we move through — bold, unfiltered, and constantly in motion.
We design for those who speak through style — who mix, match, and make it their own. Every piece is a canvas for self-expression, meant to be worn with confidence and redefined with attitude.
Stitch Bae isn’t just a brand — it’s a movement. A celebration of fearless fashion and everyday icons rewriting the rules.</p>
                
                    </div>
                </div>





            </div>
        </div>
    );
};

export default AboutUs;