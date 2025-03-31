import React, { useState } from 'react';
import { Layout, List, Button, Card, Typography, Image, Flex, Empty, notification, Modal, Form, Input, InputNumber, DatePicker, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import useCartStore from '../store/store_cart_items';
import useBookingStore from '../store/store_booking';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import logoImage from "../assets/waLogo.jpeg";
import { loadStripe } from '@stripe/stripe-js';
import useAuth from '../hooks/use_jwt_auth';
import moment from 'moment';

const stripePromise = loadStripe('pk_test_51QvPj5H0mEi2gjEIoypsFkdjuyAAbdqpInM77jN9kftEhsHkNje7mBvPByYXkFrd3M4oQWKgq9EpmF2cshE158rS00x3z5Jf45');

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Item } = Form;
const { TextArea } = Input;

function CartPage() {
    useAuth();
    const { cart, removeFromCart, clearCart, setCart } = useCartStore();
    const { setBookingDetails } = useBookingStore();
    const [form] = Form.useForm();
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Show/hide form modal
    const showFormModal = () => setShowBookingForm(true);
    const hideFormModal = () => setShowBookingForm(false);

    // Show/hide terms and conditions modal
    const showTermsModal = () => setIsModalVisible(true);
    const hideTermsModal = () => setIsModalVisible(false);

    // Terms and Conditions content
    const termsAndConditionsContent = `
        <h2>Terms and Conditions for Ticket Booking</h2>
        <p><strong>Effective Date:</strong> [Insert Date]</p>

        <h3>1. Acceptance of Terms</h3>
        <p>By booking tickets on our platform, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>

        <h3>2. Ticket Booking</h3>
        <p><strong>Booking Process:</strong> Tickets for rides and attractions can be booked through our platform. All bookings are subject to availability.</p>
        <p><strong>Payment:</strong> We accept payments through supported payment methods as indicated on the platform.</p>
        <p><strong>Refunds and Cancellations:</strong> Refunds are subject to our <strong>Refund Policy</strong>, which is available on our website.</p>
        <p><strong>Ticket Usage:</strong> Tickets are non-transferable and valid only for the date and time specified during booking.</p>

        <h3>3. Liability and Disclaimers</h3>
        <p><strong>Ride Safety:</strong> Some rides and attractions may involve physical activity or elements of risk. Participants must assess their own physical condition and ability before engaging in such activities.</p>
        <p><strong>Platform Accuracy:</strong> While we strive to provide accurate information, we do not guarantee the completeness or reliability of the content on our platform.</p>
        <p><strong>Limitation of Liability:</strong> To the fullest extent permitted by law, <strong>Wednesday's Wicked Adventures</strong> shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the platform or participation in park activities.</p>

        <h3>4. Governing Law</h3>
        <p>These Terms and Conditions are governed by and construed in accordance with the laws of Ireland. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the Courts of Ireland.</p>

        <h3>5. Contact Us</h3>
        <p>If you have any questions or concerns regarding these Terms and Conditions, please contact our support team at:</p>
        <p><strong>Email:</strong> support@wednesdayswickedadventures.com</p>
    `;

    // Handle form submission
    const handleFormSubmit = async (values) => {
        setIsProcessing(true);
        try {
            // Ensure the user agrees to the terms and conditions
            if (!values.agreeToTerms) {
                notification.error({
                    message: 'Terms and Conditions',
                    description: 'You must agree to the terms and conditions to proceed.',
                    placement: 'topRight',
                });
                return;
            }

            // 1. Save booking details to store
            const bookingData = {
                ...values,
                date: values.date.format('YYYY-MM-DD'),
                bookingnumber: `BOOK-${Date.now()}`,
            };
            setBookingDetails(bookingData);

            // 2. Prepare selectedAdventures object
            const selectedAdventures = cart.reduce((acc, item) => {
                acc[item.name] = [];
                return acc;
            }, {});

            // 3. Proceed to Stripe payment
            await handleStripeCheckout(bookingData, selectedAdventures);

            // Do NOT close the modal here (redirect will handle navigation)
        } catch (error) {
            notification.error({ message: 'Payment Error', description: error.message });
            hideFormModal(); // Close modal only on error
        } finally {
            setIsProcessing(false);
        }
    };

    // Handle Stripe checkout
    const handleStripeCheckout = async (bookingData, selectedAdventures) => {
        const stripe = await stripePromise;

        try {
            // Save booking details and selectedAdventures to localStorage
            localStorage.setItem('bookingDetails', JSON.stringify(bookingData));
            localStorage.setItem('selectedAdventures', JSON.stringify(selectedAdventures));
            localStorage.setItem('preservedCart', JSON.stringify(cart));

            // Create line items array for Stripe
            const lineItems = cart.map((item, index) => ({
                [`line_items[${index}][price_data][currency]`]: 'usd',
                [`line_items[${index}][price_data][product_data][name]`]: item.name,
                [`line_items[${index}][price_data][unit_amount]`]: Math.round(item.price * 100),
                [`line_items[${index}][quantity]`]: item.quantity,
            }));

            const successURL = new URL(`${window.location.origin}/homepage`);
            successURL.searchParams.set('fromStripe', 'true');

            // Create parameters for Stripe
            const params = Object.assign({}, ...lineItems, {
                'payment_method_types[]': 'card',
                mode: 'payment',
                success_url: successURL.toString(),
                cancel_url: `${window.location.origin}/cart`,
            });

            // Create URLSearchParams
            const body = new URLSearchParams();
            for (const [key, value] of Object.entries(params)) {
                body.append(key, value);
            }

            // Create Stripe session
            const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer sk_test_51QvPj5H0mEi2gjEIOLyAFVYqZZMUXLPV1NB2PtrFYjME0aSryfnXFOqALvOIEyfYOzGtH7lmpl844Bpr2Mi6WFWw00RECeeunE`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Payment failed');
            }

            const session = await response.json();

            // Store payment ID in localStorage
            localStorage.setItem('paymentId', session.payment_intent);

            // Redirect to Stripe
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) throw result.error;
            await handleStripeCheckout(bookingData, selectedAdventures);
            form.resetFields();

        } catch (err) {
            // Restore cart on error
            const savedCart = JSON.parse(localStorage.getItem('preservedCart') || []);
            setCart(savedCart);
            localStorage.removeItem('preservedCart');
            localStorage.removeItem('bookingDetails');
            localStorage.removeItem('selectedAdventures');
            localStorage.removeItem('paymentId');
            throw err;

        } finally {
            setIsProcessing(false);
        }
    };

    // Booking form modal component
    const BookingFormModal = () => (
        <Modal
            title="Booking Details"
            open={showBookingForm}
            onCancel={hideFormModal}
            footer={[
                <Button key="back" onClick={hideFormModal}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={isProcessing}
                    onClick={() => form.submit()}
                >
                    {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                </Button>,
            ]}
            centered
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFormSubmit}
                requiredMark={false}
            >
                <Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input placeholder="John Doe" />
                </Item>

                <Item
                    label="Email"
                    name="email"
                    rules={[{ type: 'email', required: true, message: 'Please enter valid email' }]}
                >
                    <Input placeholder="john@example.com" />
                </Item>

                <Item
                    label="Contact Number"
                    name="contact"
                    rules={[
                        { required: true, message: 'Please enter contact number' },
                        {
                            pattern: /^[0-9]+$/,
                            message: 'Please enter numbers only'
                        },
                        {
                            min: 10,
                            message: 'Number must be at least 10 digits'
                        }
                    ]}
                >
                    <Input
                        placeholder="1234567890"
                        type="tel"
                        maxLength={15}
                    />
                </Item>

                <Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter address' }]}
                >
                    <TextArea rows={3} placeholder="Street address, City, Country" />
                </Item>

                <Item
                    label="Booking Date"
                    name="date"
                    rules={[{ required: true, message: 'Please select date' }]}
                >
                    <DatePicker
                        format="YYYY-MM-DD"
                        style={{ width: '100%' }}
                        disabledDate={(current) => {
                            return current && current < moment().endOf('day');
                        }}
                    />
                </Item>

                <Item
                    label="Number of Adults"
                    name="adult"
                    rules={[{ required: true, message: 'Please enter number of adults' }]}
                >
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Item>

                <Item
                    label="Number of Children"
                    name="children"
                    rules={[{ required: true, message: 'Please enter number of children' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Item>

                {/* Terms and Conditions Checkbox */}
                <Item
                    name="agreeToTerms"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms and conditions')),
                        },
                    ]}
                >
                    <Checkbox>
                        I agree to the{" "}
                        <Text type="link" onClick={showTermsModal} style={{ color: "#1890ff" }}>
                            Terms and Conditions
                        </Text>
                    </Checkbox>
                </Item>
            </Form>
        </Modal>
    );

    // Handle "Buy Now" click
    const handleCheckout = () => {
        if (cart.length === 0) {
            notification.warning({ message: 'Cart Empty', description: 'Please add items to your cart first' });
            return;
        }
        showFormModal();
    };

    return (
        <Layout>
            <BookingFormModal />
            {/* Terms and Conditions Modal */}
            <Modal
                title="Terms and Conditions"
                open={isModalVisible}
                onCancel={hideTermsModal}
                footer={[
                    <Button key="close" onClick={hideTermsModal}>
                        Close
                    </Button>,
                ]}
                width="70%"
            >
                <div
                    style={{
                        maxHeight: "60vh",
                        overflowY: "auto",
                        padding: "0 16px",
                    }}
                    dangerouslySetInnerHTML={{ __html: termsAndConditionsContent }}
                />
            </Modal>

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
                    <Link to="/homepage">
                        <Button icon={<HomeOutlined />}>Home</Button>
                    </Link>
                    <Link to="/about">
                        <Button icon={<UserOutlined />}>About</Button>
                    </Link>
                    <Link to="/userBookedRides">
                        <Button icon={<UserOutlined />}>My Rides</Button>
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