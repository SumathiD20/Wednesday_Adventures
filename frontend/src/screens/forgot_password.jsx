import React, { useState } from 'react';
import { Button, Form, Input, notification, Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from '../assets/theme-park-portal-bg.jpg';
import "./forgot_password.css";

function ForgotPassword() {
    const navigateToPage = useNavigate();
    const [activeTab, setActiveTab] = useState("User");

    const handleUserForgot = async (values) => {
        console.log("values", values);

        // Ensure the passwords match
        if (values.password !== values.cpassword) {
            notification.error({
                message: "Password Mismatch",
                description: "Passwords do not match, please try again.",
                placement: "topRight",
            });
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_ENV_ENDPOINT}/forgotpassword`, {
                email: values.email,
                password: values.password,
                cpassword: values.cpassword,
            });

            // Show success notification
            notification.success({
                message: "Password Changed Successfully",
                description: response.data.message,
                placement: "topRight",
            });

            // Redirect to login page after successful password change
            navigateToPage("/login");
        } catch (error) {
            console.error(error);

            // Show error notification
            notification.error({
                message: "Password Change Failed",
                description: error.response?.data?.message || "Something went wrong. Please try again.",
                placement: "topRight",
            });
        }
    };

    const handleAdminForgot = async (values) => {
        console.log("values", values);

        // Ensure the passwords match
        if (values.password !== values.cpassword) {
            notification.error({
                message: "Password Mismatch",
                description: "Passwords do not match, please try again.",
                placement: "topRight",
            });
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_ENV_ENDPOINT}/forgotpassword`, {
                email: values.email,
                password: values.password,
                cpassword: values.cpassword,
            });

            // Show success notification
            notification.success({
                message: "Password Changed Successfully",
                description: response.data.message,
                placement: "topRight",
            });

            // Redirect to login page after successful password change
            navigateToPage("/login");
        } catch (error) {
            console.error(error);

            // Show error notification
            notification.error({
                message: "Password Change Failed",
                description: error.response?.data?.message || "Something went wrong. Please try again.",
                placement: "topRight",
            });
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
            <div className="ForgotPasswordFormContainer">
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
                    <Form onFinish={handleUserForgot}>
                        <Form.Item
                            style={{ marginBottom: "16px", minHeight: "64px" }}
                            name="email"
                            layout="vertical"
                            label={<span style={{ fontSize: "20px" }}>Enter your Email</span>}
                            rules={[
                                { required: true, message: "Please enter your email!" },
                                { type: "email", message: "Please enter a valid email!" },
                            ]}
                        >
                            <Input placeholder="Enter your Email" size="large" />
                        </Form.Item>
                        <div style={{ height: "40px" }} />
                        <Form.Item
                            style={{ marginBottom: "16px", minHeight: "64px" }}
                            name="password"
                            layout="vertical"
                            label={<span style={{ fontSize: "20px" }}>Enter New Password</span>}
                            rules={[{ required: true, message: "Please enter your new password!" },
                            {
                                min: 7, // Ensures password is more than 6 characters
                                message: 'Password must be more than 6 characters long!',
                            }
                            ]}
                        >
                            <Input.Password placeholder="Enter your New password" size="large" />
                        </Form.Item>
                        <div style={{ height: "40px" }} />
                        <Form.Item
                            style={{ marginBottom: "16px", minHeight: "64px" }}
                            name="cpassword"
                            layout="vertical"
                            label={<span style={{ fontSize: "20px" }}>Confirm New Password</span>}
                            rules={[{ required: true, message: "Please confirm your new password!" },
                            {
                                min: 7, // Ensures password is more than 6 characters
                                message: 'Password must be more than 6 characters long!',
                            }
                            ]}
                        >
                            <Input.Password placeholder="Enter your New password" size="large" />
                        </Form.Item>
                        <div style={{ height: "40px" }} />
                        <Form.Item>
                            <Button
                                color="default"
                                variant="solid"
                                style={{ width: "100%", height: "5vh" }}
                                size="large"
                                htmlType="submit"
                            >
                                Change Password
                            </Button>
                        </Form.Item>
                        <div style={{ height: "5px" }} />
                        <span style={{ fontSize: "20px" }}>
                            Remember your password? <Link to="/">Log In!</Link>
                        </span>
                    </Form>
                ) : (
                    <Form onFinish={handleAdminForgot}>
                        <Form.Item
                            style={{ marginBottom: "16px", minHeight: "64px" }}
                            name="email"
                            layout="vertical"
                            label={<span style={{ fontSize: "20px" }}>Enter your Email</span>}
                            rules={[
                                { required: true, message: "Please enter your email!" },
                                { type: "email", message: "Please enter a valid email!" },
                            ]}
                        >
                            <Input placeholder="Enter your Email" size="large" />
                        </Form.Item>
                        <div style={{ height: "40px" }} />
                        <Form.Item
                            style={{ marginBottom: "16px", minHeight: "64px" }}
                            name="password"
                            layout="vertical"
                            label={<span style={{ fontSize: "20px" }}>Enter New Password</span>}
                            rules={[{ required: true, message: "Please enter your new password!" },
                            {
                                min: 7, // Ensures password is more than 6 characters
                                message: 'Password must be more than 6 characters long!',
                            }
                            ]}
                        >
                            <Input.Password placeholder="Enter your New password" size="large" />
                        </Form.Item>
                        <div style={{ height: "40px" }} />
                        <Form.Item
                            style={{ marginBottom: "16px", minHeight: "64px" }}
                            name="cpassword"
                            layout="vertical"
                            label={<span style={{ fontSize: "20px" }}>Confirm New Password</span>}
                            rules={[{ required: true, message: "Please confirm your new password!" },
                            {
                                min: 7, // Ensures password is more than 6 characters
                                message: 'Password must be more than 6 characters long!',
                            }
                            ]}
                        >
                            <Input.Password placeholder="Enter your New password" size="large" />
                        </Form.Item>
                        <div style={{ height: "40px" }} />
                        <Form.Item>
                            <Button
                                color="default"
                                variant="solid"
                                style={{ width: "100%", height: "5vh" }}
                                size="large"
                                htmlType="submit"
                            >
                                Change Password
                            </Button>
                        </Form.Item>
                        <div style={{ height: "5px" }} />
                        <span style={{ fontSize: "20px" }}>
                            Remember your password? <Link to="/">Log In!</Link>
                        </span>
                    </Form>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;