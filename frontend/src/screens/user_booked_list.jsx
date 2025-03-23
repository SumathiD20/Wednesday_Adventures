import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Image, Typography, Flex, Button, Spin, notification, Modal } from 'antd';
import axios from 'axios';
import useUserStore from '../store/store_user';
import { Link, useNavigate } from 'react-router-dom';
import {
    HomeOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import darkWood from "../assets/darkwood.jpeg";
import wheelRide from "../assets/wheelride.jpeg";
import rollerCoaster from "../assets/rollercoaster.jpg";
import waterSlide from "../assets/waterslide.jpeg";
import useAuth from '../hooks/use_jwt_auth';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function UserBookedList() {
    useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const email = useUserStore((state) => state.email);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_ENV_ENDPOINT}/mybookings`,
                    {
                        email: email
                    }
                );

                if (response.status === 200 || response.status === 201) {
                    setBookings(response.data.bookings);
                } else {
                    console.log("No bookings found");
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchBookings();
        } else {
            setLoading(false);
        }
    }, [email]);

    const extractTicketCount = (adventure) => {
        const match = adventure.match(/tickets-(\d+)/);
        return match ? match[1] : 0;
    };

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
                <Title level={3} style={{ margin: 0 }}>My Bookings</Title>
                <Flex gap="middle">
                    <Link to="/homepage">
                        <Button icon={<HomeOutlined />}>Home</Button>
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

            <Content style={{ padding: '20px', marginTop: '64px' }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                        <Spin size="large" />
                    </div>
                ) : bookings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <Title level={4}>No bookings found</Title>
                    </div>
                ) : (
                    <Row gutter={[16, 16]}>
                        {bookings.map((booking, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden'
                                    }}
                                    cover={
                                        <div style={{ position: 'relative' }}>
                                            <Image
                                                alt={booking.park}
                                                src={
                                                    booking.park === "Darkwood" ? darkWood :
                                                        booking.park === "WickedWheel" ? wheelRide :
                                                            booking.park === "ThrillChillPark" ? rollerCoaster :
                                                                booking.park === "WaterAmaze" ? waterSlide : ""
                                                }
                                                style={{
                                                    width: '100%',
                                                    height: '200px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    right: '10px',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                    color: '#fff',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Tickets: {extractTicketCount(booking.adventure)}
                                            </div>
                                        </div>
                                    }
                                >
                                    <Card.Meta
                                        title={<Title level={4}>{booking.park}</Title>}
                                        description={
                                            <div>
                                                <Text strong>Date: </Text>
                                                <Text>{new Date(booking.date).toLocaleDateString()}</Text>
                                                <br />
                                                <Text strong>Booking Number: </Text>
                                                <Text>{booking.bookingnumber}</Text>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Content>
        </Layout>
    );
}

export default UserBookedList;