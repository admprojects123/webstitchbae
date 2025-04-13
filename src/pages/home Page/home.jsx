// pages/Home.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../component/navigationBar/Navbar';
import Footer from '../../component/footer/Footer';
import './home.css';
import Features from './components/features/Features';
import Banner from './components/banner/Banner';
import ProductGrid from './components/productsGrid/ProductGrid';
import TestimonialSlider from './components/feedback/TestimonialSliderfeedback';
import InstagramFollow from './components/socialMedia/InstagramFollow';
import Categories from './components/Categories/category';
import CollectionHighlight from './components/Collection/Collection';

const Home = () => {


  return (
    <div className="home-container"> {/* Added a container for smooth transition */}
        
        <Banner/>
        <Categories/>
      
      <div>
      <ProductGrid
            title="Popular This Week"
            path="/home/latestArrivals"
            description=""
            // products={dummyProducts}
        />
        <br/>
      <ProductGrid
            title="Best Seller"
            path="/home/topCollection"
            description=""
            // products={dummyProducts}
        /></div>


        {/* banner */}
      <CollectionHighlight/>
       

       <TestimonialSlider />
       <InstagramFollow />
       <Features />
      
      {/* <Footer /> */}
    </div>
  );
};

export default Home;