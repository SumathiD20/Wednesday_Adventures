import React from 'react';
import { Layout, Breadcrumb, Card, Row, Col, Button, Image, Flex } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import logoImage from "../assets/waLogo.jpeg"
import welcomeImage from "../assets/wawelcomeimage.png"

const { Header, Content } = Layout;

// Sample product data
const products = [
    {
        id: 1,
        name: 'Darkwood',
        description: 'This is a description for Product 1.',
        image: 'https://via.placeholder.com/150',
        price: '$19.99',
    },
    {
        id: 2,
        name: 'Wicked Wheel',
        description: 'This is a description for Product 2.',
        image: 'https://via.placeholder.com/150',
        price: '$29.99',
    },
    {
        id: 3,
        name: 'Thrill Chill Park',
        description: 'This is a description for Product 3.',
        image: 'https://via.placeholder.com/150',
        price: '$39.99',
    },
    {
        id: 4,
        name: 'Water Amaze',
        description: 'This is a description for Product 4.',
        image: 'https://via.placeholder.com/150',
        price: '$49.99',
    },
];

function HomePage() {
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
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined /> Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/about">
                        <UserOutlined /> About
                    </Breadcrumb.Item>
                </Breadcrumb>
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

                {/* Product Cards */}
                <Row gutter={[16, 16]}>
                    {products.map((product) => (
                        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                cover={<img alt={product.name} src={product.image} />}
                                actions={[
                                    <Button
                                        type="primary"
                                        icon={<ShoppingCartOutlined />}
                                        style={{ width: '100%' }}
                                    >
                                        Buy Now
                                    </Button>,
                                ]}
                            >
                                <Card.Meta
                                    title={product.name}
                                    description={
                                        <>
                                            <p>{product.description}</p>
                                            <p style={{ fontWeight: 'bold', color: '#1890ff' }}>
                                                {product.price}
                                            </p>
                                        </>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
}

export default HomePage;