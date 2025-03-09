import React, {useEffect, useState} from 'react';
import { Layout, Card, Row, Col, Button, Image, Flex, notification } from 'antd';
import { Link } from 'react-router-dom';
import {
    HomeOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import logoImage from "../assets/waLogo.jpeg"
import welcomeImage from "../assets/wawelcomeimage.png"
import useCartStore from '../store/store_cart_items';
import wheelRide from "../assets/wheelride.jpeg"
import rollerCoaster from "../assets/rollercoaster.jpg"
import darkWood from "../assets/darkwood.jpeg"
import waterSlide from "../assets/waterslide.jpeg"

const { Header, Content } = Layout;

// Sample product data
const products = [
    {
        id: 1,
        name: 'Darkwood',
        description: 'A suspended dark ride through a decaying Victorian mansion inhabited by spectral figures. Riders navigate secret passages and encounter floating furniture, whispering portraits, and sudden drops into shadowy realms.',
        image: darkWood,
        tagline: "Where the walls have eyes... and teeth!",
        price: 19.99,
    },
    {
        id: 2,
        name: 'Wicked Wheel',
        description: 'TA 360-degree rotating Ferris wheel with glass-bottom gondolas that stops riders mid-air to face macabre animatronic scenes of a cursed circus. Special "Midnight Spin" mode reverses direction unexpectedly.',
        image: wheelRide,
        tagline: "The view is killer... literally!",
        price: 29.99,
    },
    {
        id: 3,
        name: 'Thrill Chill Park',
        description: `Reaper's Rage" - A floorless coaster with 5 inversions and 95° drops and "Specter's Glide" - A winged coaster with floating mist effects and smooth arcs. This Roller coaster ride is imperative to get the taste of air while going full speed.`,
        image: rollerCoaster,
        tagline: "Thrill & Chill Zone: Dual Coaster Complex",
        price: 39.99,
    },
    {
        id: 4,
        name: 'Water Amaze',
        description: 'A high-speed water coaster that twists through ancient aqueducts and crumbling ruins, featuring surprise geyser eruptions, waterfall drenches, and a final 45-degree plunge into a glowing subterranean grotto.   ',
        image: waterSlide,
        tagline: "Stay dry if you dare!",
        price: 49.99,
    },
];

function HomePage() {
    const addToCart = useCartStore((state) => state.addToCart);
    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        
        // Only show notification if coming from Stripe success
        if (queryParams.get('fromStripe') === 'true') {
            notification.success({
                message: 'Purchase Successful!',
                description: 'Your tickets have been booked successfully!',
                duration: 4.5
            });
            
            // Cleanup
            window.history.replaceState({}, document.title, "/homepage");
            clearCart();
            localStorage.removeItem('preservedCart');
        }
    }, [clearCart]);

    

    // Add this to handle browser back/forward navigation
    useEffect(() => {
        const handleNavigation = () => {
            const queryParams = new URLSearchParams(window.location.search);
            if (queryParams.get('payment') === 'success') {
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        };

        window.addEventListener('popstate', handleNavigation);
        return () => window.removeEventListener('popstate', handleNavigation);
    }, []);

    return (
        <Layout>
            {/* Top Navigation Bar */}
            <Header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: '0 20px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    position: 'fixed',
                    zIndex: 1000,
                    width: "100%"
                }}
            >
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={logoImage}
                        width="50px"
                        height="50px"
                        style={{ marginRight: '10px' }}
                    />
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Wednesday Adventures</span>
                </div>

                {/* Breadcrumbs */}
                <Flex gap="middle">
                    <Link to="/cart">
                        <Button type="primary" icon={<ShoppingCartOutlined />}>
                            Cart ({cart.length})
                        </Button>
                    </Link>
                    <Link to="/homepage">
                        <Button icon={<HomeOutlined />}>Home</Button>
                    </Link>
                    <Link to="/about">
                        <Button icon={<UserOutlined />}>About</Button>
                    </Link>
                </Flex>
            </Header>

            {/* Main Content */}
            <Content style={{ padding: '20px' }}>
                <div className="welcome-container" style={{
                    textAlign: 'center',
                    padding: '40px 0',
                    margin: '0 auto',
                    maxWidth: '800px'
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#2d3436',
                        marginBottom: '16px',
                        letterSpacing: '-0.5px'
                    }}>
                        Welcome to Wednesday Adventures
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#636e72',
                        fontWeight: '400',
                        lineHeight: '1.6',
                        margin: '0 auto'
                    }}>
                        Your portal to a Wednesday-themed adventure park
                    </p>
                </div>
                {/* Large Banner Image */}
                <div style={{ display: "Flex", justifyContent: "center" }}>
                    <Image
                        src={welcomeImage}
                        alt="Banner"
                        style={{ height: "50vh", marginBottom: '20px' }}
                    />
                </div>

                <div className="welcome-container" style={{
                    textAlign: 'center',
                    padding: '40px 0',
                    margin: '0 auto',
                    maxWidth: '800px'
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#2d3436',
                        marginBottom: '16px',
                        letterSpacing: '-0.5px'
                    }}>
                        Explore Our variety of Rides
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#636e72',
                        fontWeight: '400',
                        lineHeight: '1.6',
                        margin: '0 auto'
                    }}>
                        Choose what rides you want to buy to enjoy while skipping standing lines!!!!
                    </p>
                </div>

                {/* Product Cards */}
                <Row gutter={[16, 16]}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}>
                    {products.map((product) => (
                        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden'
                                }}
                                bodyStyle={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '16px'
                                }}
                                cover={
                                    <div style={{
                                        position: 'relative',
                                        flex: '0 0 250px' // Fixed image height
                                    }}>
                                        <img
                                            alt={product.name}
                                            src={product.image}
                                            style={{
                                                width: '100%',
                                                height: 200, // Changed from fixed 250px
                                                objectFit: 'cover',
                                                borderBottom: '1px solid #f0f0f0'
                                            }}
                                        />
                                    </div>
                                }
                                actions={[
                                    <Flex vertical gap="small" style={{ padding: '8px' }}>
                                        <Button
                                            onClick={() => { addToCart(product) }}
                                            icon={<ShoppingCartOutlined />}
                                            block
                                        >
                                            Add to Cart
                                        </Button>
                                        <Link to={"/cart"}>
                                            <Button
                                                type="primary"
                                                icon={<ShoppingCartOutlined />}
                                                onClick={() => { addToCart(product) }}
                                                block
                                            >
                                                Buy Now
                                            </Button>
                                        </Link>
                                    </Flex>
                                ]}
                            >
                                <Card.Meta
                                    title={<div style={{
                                        fontSize: '1.2rem',
                                        marginBottom: '8px',
                                        fontWeight: 600
                                    }}>{product.name}</div>}
                                    description={
                                        <div style={{
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div style={{
                                                flex: 1,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 5,
                                                WebkitBoxOrient: 'vertical',
                                                lineHeight: 1.5,
                                                fontSize: '0.9rem'
                                            }}>
                                                {product.description}
                                            </div>
                                            <p style={{
                                                fontWeight: 'bold',
                                                color: '#1890ff',
                                                margin: '16px 0 0 0',
                                                fontSize: '1.1rem'
                                            }}>
                                                ${product.price}
                                            </p>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div className="welcome-container" style={{
                    textAlign: 'center',
                    padding: '40px 0',
                    margin: '0 auto',
                    maxWidth: '800px'
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#2d3436',
                        marginBottom: '16px',
                        letterSpacing: '-0.5px'
                    }}>
                        More Rides on the way
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#636e72',
                        fontWeight: '400',
                        lineHeight: '1.6',
                        margin: '0 auto'
                    }}>
                        While you enjoy the existing rides we have to offer as of yet, we are doing our best to bring up more exciting rides your way!!!
                    </p>
                </div>
            </Content>
        </Layout>
    );
}

export default HomePage;