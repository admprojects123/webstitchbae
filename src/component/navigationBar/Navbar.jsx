import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import './Navbar.css';
import { domain } from '../../api.service';
import {CartProduct,deleteCartItem} from './component/cartProducts/cartPrduct';
import logo from '../../asset/logo.png';
import stitchlogo from '../../asset/stitchlogo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false); // Drawer for profile
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false); // State for cart drawer
    const [cartItems, setCartItems] = useState([]);


    const profileItems = [
        { label: 'My orders', icon: 'ic:round-menu', path: '/my-orders' },
        { label: 'Wishlist', icon: 'mdi:heart-outline', path: '/wishlist' },
        { label: 'Saved Address', icon: 'iconamoon:profile-light', path: '/saved-address' },
        { label: 'Privacy Policy', icon: 'material-symbols:privacy-tip-outline', path: '/privacy-policy' },
        { label: 'Log out', icon: 'material-symbols:logout', path: '/logout' },
    ];

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Categories', path: '/categories' },
        // { label: 'Occasion Wear', path: '/occasion-wear' },
        // { label: 'Casual Wear', path: '/casual-wear' },
        { label: 'Nearby Stores', path: '/nearby-store' },
        { label: 'About Us', path: '/about-us' },
        { label: 'Contact Us', path: '/contact-us' },
    ];
    const fetchCart = async () => {
        const token = sessionStorage.getItem('authToken'); // Get token from sessionStorage
        const userData = JSON.parse(sessionStorage.getItem('userData')); // Parse user data
        const userId = userData ? userData.id : ''; // Extract userId from sessionStorage

        if (userId) {
            try {
                const response = await fetch(`${domain}/user/getCartProduct/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass token in header for authentication
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch wishlist'); // Throw error if response is not ok
                }

                const data = await response.json();
                console.log(data);

                if (data && data.cart) {
                    // Process wishlist items
                    const processedItems = data.cart.map(item => ({
                        id: item._id,
                        productId: item.productId._id,
                        name: item.productId.name,
                        price: item.productId.price,
                        size: item.size,
                        color: item.color,
                        quantity: item.quantity,
                        image: item.productId.images[0], // Assuming the first image is the main one
                    }));

                    setCartItems(processedItems); // Set the processed wishlist items to state
                    console.log("------",cartItems);
                }
            } catch (error) {
                console.error(error);
                navigate('/login'); // Redirect to login page on error
            }
        } else {
            console.error('User ID not found in session storage');
           
        }
    };
    useEffect(() => {
        fetchCart(); // Fetch wishlist items on component mount
    }, []);

  
    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev);
    };

    const toggleCartDrawer = () => {
        if (!isCartDrawerOpen) {
            fetchCart();
        }
        setIsCartDrawerOpen((prev) => !prev);
    };
    const toggleProfileDrawer = () => {
        setIsProfileDrawerOpen((prev) => !prev);
    };

    const handleProfileClick = () => {
        if (isMobile) {
            toggleProfileDrawer(); // Open profile drawer on mobile
        } else {
            navigate('/profile'); // Navigate to profile page on desktop
        }
    };

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                {isMobile && (
                    <button className="mobile-menu-icon" onClick={toggleDrawer}>
                        <Icon icon="ic:round-menu" />
                    </button>
                )}

                {!isMobile && (
                    <Link to="/" className="navbar-logo">
                        <img src={stitchlogo} alt="Iris Fashion Logo" className="navbar-logo-img" />
                    </Link>
                )}

                {!isMobile && (
                    <ul className="navbar-nav">
                        {navItems.map((item, index) => (
                            <li className="navbar-nav-item" key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `navbar-nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="navbar-icons">
                    <a href="/categories" className="navbar-icon">
                        <Icon icon="tabler:search" /> 
                    </a>
                    <a href="#" className="navbar-icon" onClick={handleProfileClick}>
                        <Icon icon="iconamoon:profile-light" /> {/* Profile */}
                    </a>
                    <a href="#" className="navbar-icon" onClick={toggleCartDrawer}>
                        <Icon icon="solar:bag-3-outline" /> {/* Cart */}
                    </a>
                </div>
            </div>

            {/* Drawer for Mobile */}
            <Drawer
                open={isDrawerOpen}
                onClose={toggleDrawer}
                direction="left"
                className="drawer-content"
                overlayClassName="drawer-overlay"
            >
                <div className="drawer-inner">
                    <div className="drawer-logo">
                        <Link to="/" onClick={toggleDrawer}>
                            <img src={stitchlogo} alt="Iris Fashion Logo" className="navbar-logo-img" />
                        </Link>
                        <div className="drawer-close-btn" onClick={toggleDrawer}>
                            <Icon icon="ic:round-close" />
                        </div>
                    </div>

                    <ul className="navbar-nav-mobile">
                        {navItems.map((item, index) => (
                            <li className="navbar-nav-item-mobile" key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `navbar-nav-link-mobile ${isActive ? 'active' : ''}`}
                                    onClick={toggleDrawer}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </Drawer>

            {/* Cart Drawer */}
            <Drawer
                open={isCartDrawerOpen}
                onClose={toggleCartDrawer}
                direction="right"
                className="cart-drawer-content"
                overlayClassName="drawer-overlay"
                size={isMobile ? 250 : 300}
            >
                <div className="cart-drawer-parent">
                    {/* Top Row: Cart Title and Close Button */}
                    <div className="cart-drawer-header">
                        <h2>Cart</h2>
                        <button className="cart-close-btn" onClick={toggleCartDrawer}>
                            <Icon icon="ic:round-close" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="cart-drawer-inner">
                        {cartItems.length === 0 ? (
                            <p>No items in the cart</p> // Show this text if the cart is empty
                        ) : (
                            cartItems.map((item) => <CartProduct item={item} fetchCart={fetchCart} key={item.id} />)
                        )}
                    </div>

                    {/* Footer: Note and Proceed Button */}
                    <div className="cart-drawer-footer">
                        <div className="cart-note">
                            <p style={{ textAlign: "justify" }}>
                                <strong>Note</strong> - We offer a 7-day easy exchange policy with all tags intact; but returns are not accepted.
                            </p>
                        </div>
                        <button className="proceed-btn" onClick={() => { if(cartItems.length>0){navigate("/cart-details",)}; toggleCartDrawer() }}>Proceed</button>
                    </div>
                </div>
            </Drawer>

            {/* this is profile drawer */}

            <Drawer
                open={isProfileDrawerOpen}
                onClose={toggleProfileDrawer}
                direction="right" // Open from the right
                className="profile-drawer-content"
                overlayClassName="drawer-overlay"
            >
                <div className='profile-drawer-parent'>
                    <div className="profile-drawer-header">
                        <h2>Profie</h2>
                        <button className="profile-close-btn" onClick={toggleProfileDrawer}>
                            <Icon icon="ic:round-close" />
                        </button>
                    </div>
                    <div className="profile-drawer-inner">
                        <ul className="profile-nav-mobile">
                            {profileItems.map((item, index) => (
                                <li className="profile-nav-item-mobile" key={index}>
                                    <NavLink
                                        to={item.path}

                                        className={({ isActive }) => `profile-nav-link-mobile ${isActive ? 'active' : ''}`}
                                        onClick={toggleProfileDrawer} // Close on navigation
                                    >
                                        <Icon icon={item.icon} className='profile-icon' />
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Drawer>
        </nav>
    );
};

export default Navbar;