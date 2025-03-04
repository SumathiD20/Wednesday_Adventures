import React, { useState } from 'react';
import { Button, Form, Input, notification, Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from '../assets/theme-park-portal-bg.jpg';
import './login.css'

function Login() {

    const navigateToPage = useNavigate()
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("User");

    const handleUserLogin = async (values) => {
        console.log("values", values)
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_ENV_ENDPOINT}/login`, {
                email: values.email,
                password: values.password,
            }, { withCredentials: true });

            console.log("Response", response)

            // Show success notification
            notification.success({
                message: 'Login Successful',
                description: response.data.message,
                placement: 'topRight',
            });

            // Redirect to Home page after successful login
            navigateToPage("/homepage")

        } catch (error) {
            console.error(error);

            // Show error notification
            notification.error({
                message: 'Login Failed',
                description: error.response?.data?.message || 'Something went wrong. Please try again.',
                placement: 'topRight',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAdminLogin = async (values) => {
        console.log("values", values)
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_ENV_ENDPOINT}/login`, {
                email: values.email,
                password: values.password,
            }, { withCredentials: true });

            // Show success notification
            notification.success({
                message: 'Login Successful',
                description: response.data.message,
                placement: 'topRight',
            });

            // Redirect to Home page after successful login
            navigateToPage("/homepage")

        } catch (error) {
            console.error(error);

            // Show error notification
            notification.error({
                message: 'Login Failed',
                description: error.response?.data?.message || 'Something went wrong. Please try again.',
                placement: 'topRight',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div className="LoginFormContainer">
                <Tabs
                    defaultActiveKey="0"
                    centered
                    onChange={setActiveTab}
                    items={[
                        { key: "User", label: <span style={{ fontSize: "18px", fontWeight: "bold" }}>User</span> },
                        { key: "Admin", label: <span style={{ fontSize: "18px", fontWeight: "bold" }}>Admin</span> },
                    ]}
                />
                {activeTab === "User" ? (
                    <Form
                        onFinish={handleUserLogin}
                    >
                        <Form.Item
                            name="email"
                            layout="vertical"
                            label={<span style={{ fontSize: "20px" }}>Email</span>}
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                            style={{ marginBottom: "16px", minHeight: "64px" }}
                        >
                            <Input
                                placeholder="Enter your Email"
                                size="large"
                            />
                        </Form.Item>
                        <div style={{ height: "40px" }} />
                        <Form.Item
                            name="password"
                            layout="vertical"
                            label={<span style={{ fontSize: "20px" }}>Password</span>}
                            rules={[
                                { required: true, message: 'Please enter your password!' },
                            ]}
                            style={{ marginBottom: "16px", minHeight: "64px" }}

                        >
                            <Input.Password
                                placeholder="Enter your Password"
                                size="large"
                            />
                        </Form.Item>
                        <div style={{ height: "20px" }} />
                        <span style={{ fontSize: "20px" }}><Link to={"/forgotPassword"}>Forgot Password?</Link></span>
                        <div style={{ height: "40px" }} />
                        <Form.Item>
                            <Button color="default" variant="solid" style={{ width: "100%", height: "5vh" }} size="large" loading={loading} htmlType="submit">
                                Log in
                            </Button>
                        </Form.Item>
                        <div style={{ height: "5px" }} />
                        <span style={{ fontSize: "20px" }}>
                            Don’t have an account? <Link to="/userRegister">Register now!</Link>
                        </span>
                    </Form>
                ) : (
                    <Form
                        onFinish={handleAdminLogin}
                    >
                        <Form.Item
                            name="email"
                            layout="vertical"
                            label={<span style={{ fontSize: "20px" }}>Email</span>}
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                            style={{ marginBottom: "16px", minHeight: "64px" }}
                        >
                            <Input
                                placeholder="Enter your Email"
                                size="large"
                            />
                        </Form.Item>
                        <div style={{ height: "40px" }} />
                        <Form.Item
                            name="password"
                            layout="vertical"
                            label={<span style={{ fontSize: "20px" }}>Password</span>}
                            rules={[
                                { required: true, message: 'Please enter your password!' },
                            ]}
                            style={{ marginBottom: "16px", minHeight: "64px" }}

                        >
                            <Input.Password
                                placeholder="Enter your Password"
                                size="large"
                            />
                        </Form.Item>
                        <div style={{ height: "20px" }} />
                        <span style={{ fontSize: "20px" }}><Link to={"/forgotPassword"}>Forgot Password?</Link></span>
                        <div style={{ height: "40px" }} />
                        <Form.Item>
                            <Button color="default" variant="solid" style={{ width: "100%", height: "5vh" }} size="large" loading={loading} htmlType="submit">
                                Log in
                            </Button>
                        </Form.Item>
                        <div style={{ height: "5px" }} />
                        <span style={{ fontSize: "20px" }}>
                            Don’t have an account? <Link to="/userRegister">Register now!</Link>
                        </span>
                    </Form>
                )}
            </div>
        </div>

    )
}

export default Login;