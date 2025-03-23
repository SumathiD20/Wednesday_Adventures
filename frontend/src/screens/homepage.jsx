import React, { useEffect, useState} from 'react';
import { Layout, Card, Row, Col, Button, Image, Flex, notification, Modal, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
    UserOutlined,
    ShoppingCartOutlined,
    InfoCircleOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import logoImage from "../assets/waLogo.jpeg"
import welcomeImage from "../assets/wawelcomeimage.png"
import useCartStore from '../store/store_cart_items';
import wheelRide from "../assets/wheelride.jpeg"
import rollerCoaster from "../assets/rollercoaster.jpg"
import darkWood from "../assets/darkwood.jpeg"
import waterSlide from "../assets/waterslide.jpeg"
import useBookingStore from '../store/store_booking';
import axios from 'axios';
import useAuth from '../hooks/use_jwt_auth';

const { Header, Content } = Layout;

const products = [
    {
        id: 1,
        displayName: "Darkwood",
        name: 'Darkwood',
        path: '/darkwoodDetail',
        description: 'A suspended dark ride through a decaying Victorian mansion inhabited by spectral figures. Riders navigate secret passages and encounter floating furniture, whispering portraits, and sudden drops into shadowy realms.',
        image: darkWood,
        tagline: "Where the walls have eyes... and teeth!",
        price: 19.99,
    },
    {
        id: 2,
        displayName: "Wicked Wheel",
        name: 'WickedWheel',
        path: '/wickedWheelDetail',
        description: 'TA 360-degree rotating Ferris wheel with glass-bottom gondolas that stops riders mid-air to face macabre animatronic scenes of a cursed circus. Special "Midnight Spin" mode reverses direction unexpectedly.',
        image: wheelRide,
        tagline: "The view is killer... literally!",
        price: 29.99,
    },
    {
        id: 3,
        displayName: "Thrill Chill park",
        name: 'ThrillChillPark',
        path: '/thrillChillParkDetail',
        description: `Reaper's Rage" - A floorless coaster with 5 inversions and 95° drops and "Specter's Glide" - A winged coaster with floating mist effects and smooth arcs. This Roller coaster ride is imperative to get the taste of air while going full speed.`,
        image: rollerCoaster,
        tagline: "Thrill & Chill Zone: Dual Coaster Complex",
        price: 39.99,
    },
    {
        id: 4,
        displayName: "Water Amaze",
        name: 'WaterAmaze',
        path: '/waterAmazeDetail',
        description: 'A high-speed water coaster that twists through ancient aqueducts and crumbling ruins, featuring surprise geyser eruptions, waterfall drenches, and a final 45-degree plunge into a glowing subterranean grotto.   ',
        image: waterSlide,
        tagline: "Stay dry if you dare!",
        price: 49.99,
    },
];

function HomePage() {
    useAuth();
    const addToCart = useCartStore((state) => state.addToCart);
    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.get('fromStripe') === 'true') {
            const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
            const paymentId = localStorage.getItem('paymentId');
            const cart = JSON.parse(localStorage.getItem('preservedCart') || []);

            if (!bookingDetails || !paymentId) {
                notification.error({
                    message: 'Error',
                    description: 'Booking details not found. Please contact support.',
                    duration: 4.5,
                });
                return;
            }

            useBookingStore.getState().setBookingDetails(bookingDetails);
            useBookingStore.getState().setPaymentId(paymentId);

            notification.info({
                message: 'Booking Processing',
                description: 'Your booking is being processed. Please wait...',
                duration: 0,
                key: 'processing-notification',
            });

            console.log("Cart items length", cart.length)

            const processBooking = async () => {
                try {
                    const bookingResponse = await axios.post(
                        `${process.env.REACT_APP_ENV_ENDPOINT}/bookticket`,
                        {
                            userDetails: bookingDetails,
                            selectedAdventures: cart.reduce((acc, item) => {
                                acc[item.name] = [`tickets-${item.quantity}`];
                                return acc;
                            }, {}),
                        }
                    );

                    if (bookingResponse.status !== 201) {
                        throw new Error('Booking failed');
                    }

                    notification.success({
                        message: 'Booking Successful!',
                        description: `Your booking number is: ${bookingResponse.data.bookingnumber}`,
                        duration: 4.5,
                    });
                    clearCart();
                } catch (error) {
                    console.error('Booking error:', error);
                    notification.error({
                        message: 'Booking Failed',
                        description: 'There was a problem with your booking. The transaction is being refunded.',
                        duration: 0,
                    });

                    try {
                        await axios.post(
                            `${process.env.REACT_APP_API_ENDPOINT}/initiate-refund`,
                            { paymentId }
                        );

                        notification.info({
                            message: 'Refund Initiated',
                            description: 'Your refund has been initiated. Please check your email for updates.',
                            duration: 4.5,
                        });
                    } catch (refundError) {
                        console.error('Refund failed:', refundError);
                        notification.error({
                            message: 'Refund Failed',
                            description: 'Please contact support for assistance with your refund.',
                            duration: 0,
                        });
                    }
                    clearCart();
                } finally {
                    notification.destroy('processing-notification');
                    useBookingStore.getState().clearBookingDetails();
                    localStorage.removeItem('preservedCart');
                    localStorage.removeItem('bookingDetails');
                    localStorage.removeItem('paymentId');
                    window.history.replaceState({}, document.title, '/homepage');
                }
            };

            processBooking();
        }
    }, [clearCart]);

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

    const handleLogout = async () => {
        setIsLogoutModalVisible(true); // Show logout modal
        setIsLoggingOut(true); // Start loading spinner

        try {
            const response = await axios.post(`${process.env.REACT_APP_ENV_ENDPOINT}/logout`);

            if (response.status === 200 || response.status === 201) {
                // Show success notification
                notification.success({
                    message: 'Logout Successful',
                    description: 'You have been logged out successfully.',
                    placement: 'topRight',
                });

                // Redirect to home page
                navigate('/');
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            // Show error notification
            notification.error({
                message: 'Logout Failed',
                description: 'There was a problem logging out. Please try again.',
                placement: 'topRight',
            });
        } finally {
            setIsLoggingOut(false); 
            setIsLogoutModalVisible(false); 
        }
    };

    const LogoutModal = () => (
        <Modal
            title="Logging Out"
            open={isLogoutModalVisible}
            onCancel={() => setIsLogoutModalVisible(false)}
            footer={null} 
            closable={false} 
            centered
        >
            <Flex justify="center" align="center" gap="middle">
                <Spin size="large" /> 
                <span>Logging you off...</span>
            </Flex>
        </Modal>
    );

    return (
        <Layout>
            <LogoutModal />
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={logoImage}
                        width="50px"
                        height="50px"
                        style={{ marginRight: '10px' }}
                    />
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Wednesday Adventures</span>
                </div>

                <Flex gap="middle">
                    <Link to="/cart">
                        <Button type="primary" icon={<ShoppingCartOutlined />}>
                            Cart ({cart.length})
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button icon={<UserOutlined />}>About</Button>
                    </Link>
                    <Link to="/userBookedRides">
                        <Button icon={<UserOutlined />}>My Rides</Button>
                    </Link>
                    <Button
                        type="primary"
                        style={{ backgroundColor: "red", marginTop: "15px" }}
                        icon={<LogoutOutlined />}
                        onClick={() => {
                            handleLogout(); // Call the function
                            localStorage.setItem("token", null); // Set token to null
                          }}                    >
                        Logout
                    </Button>
                </Flex>
            </Header>

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
                                        flex: '0 0 250px'
                                    }}>
                                        <img
                                            alt={product.displayName}
                                            src={product.image}
                                            style={{
                                                width: '100%',
                                                height: 200,
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
                                    title={<Flex justify="space-between" align="center">
                                        <div style={{
                                            fontSize: '1.2rem',
                                            marginBottom: '8px',
                                            fontWeight: 600
                                        }}>
                                            {product.displayName}
                                        </div>
                                        <Link to={product.path} onClick={() => window.scrollTo(0, 0)}>
                                            <Button
                                                type="text"
                                                icon={<InfoCircleOutlined />}
                                                style={{
                                                    color: '#1890ff',
                                                    marginLeft: '8px',
                                                    ':hover': {
                                                        backgroundColor: 'rgba(24, 144, 255, 0.1)'
                                                    }
                                                }}
                                            />
                                        </Link>
                                    </Flex>}
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