import React, { useEffect } from 'react';
import { Layout, List, Button, Card, Typography, Image, Flex, Empty, notification } from 'antd';
import { Link } from 'react-router-dom';
import useCartStore from '../store/store_cart_items';
import {
    HomeOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import logoImage from "../assets/waLogo.jpeg";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QvPj5H0mEi2gjEIoypsFkdjuyAAbdqpInM77jN9kftEhsHkNje7mBvPByYXkFrd3M4oQWKgq9EpmF2cshE158rS00x3z5Jf45');

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

function CartPage() {
    const { cart, removeFromCart, clearCart, setCart } = useCartStore();

    useEffect(() => {
        const preservedCart = localStorage.getItem('preservedCart');
        if (preservedCart) {
            setCart(JSON.parse(preservedCart));
            localStorage.removeItem('preservedCart');
        }
    }, [setCart]);

    const handleCheckout = async () => {
        // Preserve cart in localStorage before checkout
        localStorage.setItem('preservedCart', JSON.stringify(cart));

        try {
            const stripe = await stripePromise;
            localStorage.setItem('paymentStatus', 'pending');

            // 1. Create line items array
            const lineItems = cart.map((item, index) => ({
                [`line_items[${index}][price_data][currency]`]: 'usd',
                [`line_items[${index}][price_data][product_data][name]`]: item.name,
                [`line_items[${index}][price_data][unit_amount]`]: Math.round(item.price * 100),
                [`line_items[${index}][quantity]`]: item.quantity,
            }));

            const successURL = new URL(`${window.location.origin}/homepage`);
            successURL.searchParams.set('fromStripe', 'true');

            // 2. Create parameters
            const params = Object.assign({}, ...lineItems, {
                'payment_method_types[]': 'card',
                mode: 'payment',
                success_url: successURL.toString(),
                cancel_url: `${window.location.origin}/cart`
            });

            // 3. Create URLSearchParams
            const body = new URLSearchParams();
            for (const [key, value] of Object.entries(params)) {
                body.append(key, value);
            }

            // 4. Create Stripe session
            const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer sk_test_51QvPj5H0mEi2gjEIOLyAFVYqZZMUXLPV1NB2PtrFYjME0aSryfnXFOqALvOIEyfYOzGtH7lmpl844Bpr2Mi6WFWw00RECeeunE`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Payment failed');
            }

            const session = await response.json();

            // 5. Redirect to Stripe
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) throw result.error;
            

        } catch (err) {
            // Restore cart on error
            const savedCart = JSON.parse(localStorage.getItem('preservedCart') || '[]');
            localStorage.removeItem('paymentStatus');
            setCart(savedCart);
            localStorage.removeItem('preservedCart');
            notification.error({
                message: 'Payment Error',
                description: err.message
            });
        }
    };

    return (
        <Layout>
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
                    width: "100%",
                    height: 64,
                    minHeight: 64
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={logoImage}
                        width="50px"
                        height="50px"
                        style={{ marginRight: '10px' }}
                        alt="Logo"
                    />
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Wednesday Adventures</span>
                </div>

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

            <Content style={{
                marginTop: 64,
                padding: '20px',
                minHeight: 'calc(100vh - 64px)'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Flex justify="space-between" align="center" style={{ marginBottom: '20px' }}>
                        <Title level={3}>Your Cart</Title>
                        {cart.length > 0 && (
                            <Flex gap="middle">
                                <Button type="primary" danger onClick={clearCart}>
                                    Remove All
                                </Button>
                                <Button type="primary" onClick={handleCheckout}>
                                    Buy Now
                                </Button>
                            </Flex>
                        )}
                    </Flex>

                    {cart.length === 0 ? (
                        <Flex
                            vertical
                            align="center"
                            justify="center"
                            style={{ height: 'calc(100vh - 200px)' }}
                        >
                            <Empty
                                description={
                                    <Paragraph style={{ color: '#636e72' }}>
                                        No items in cart. <Link to="/homepage">Browse rides here!</Link>
                                    </Paragraph>
                                }
                                style={{ marginBottom: '20px' }}
                            />
                        </Flex>
                    ) : (
                        <List
                            dataSource={cart}
                            renderItem={(item) => (
                                <List.Item>
                                    <Card
                                        style={{ width: '100%' }}
                                        actions={[
                                            <Button danger onClick={() => removeFromCart(item.id)}>
                                                Remove
                                            </Button>
                                        ]}
                                    >
                                        <Flex align="center" gap="middle">
                                            <Image
                                                src={item.image}
                                                width={100}
                                                height={100}
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <div>
                                                <Title level={5}>{item.name}</Title>
                                                <p>${item.price.toFixed(2)}</p>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>
                                        </Flex>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            </Content>
        </Layout>
    );
}

export default CartPage;