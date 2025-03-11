/**
 * ForgotPassword component that allows users and admins to reset their passwords.
 * 
 * @component
 * @example
 * return (
 *   <ForgotPassword />
 * )
 * 
 * @description
 * This component provides a form to allow both users and admins to reset their password. 
 * It uses an Ant Design `Tabs` component to toggle between "User" and "Admin" views. 
 * It performs validation for matching passwords and ensures that the password is at least 7 characters long.
 * Upon successful submission, it sends the password reset request to the backend using `axios` and shows a notification.
 * If successful, it redirects the user to the login page.
 * 
 * @state activeTab {string} - Stores the active tab state ("User" or "Admin").
 * 
 * @methods
 * - handleUserForgot(values): Handles the password reset request for users.
 * - handleAdminForgot(values): Handles the password reset request for admins.
 * 
 * @prop {string} email - The email address entered by the user/admin.
 * @prop {string} password - The new password entered by the user/admin.
 * @prop {string} cpassword - The confirmation password entered by the user/admin.
 */
import React, { useState } from 'react';
import { Button, Form, Input, notification, Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from '../assets/theme-park-portal-bg.jpg';
import "./forgot_password.css";

/**
 * ForgotPassword component that handles both user and admin password reset requests.
 *
 * @returns {JSX.Element} The rendered ForgotPassword component.
 */
function ForgotPassword() {
    const navigateToPage = useNavigate();
    const [activeTab, setActiveTab] = useState("User");

    /**
     * Handles the password reset request for users.
     * Ensures the passwords match, and sends the reset request to the backend.
     * Displays success/error notifications based on the response.
     *
     * @param {object} values - The form values containing email, password, and confirm password.
     */
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
            }, { withCredentials: true });

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

    /**
     * Handles the password reset request for admins.
     * Ensures the passwords match, and sends the reset request to the backend.
     * Displays success/error notifications based on the response.
     *
     * @param {object} values - The form values containing email, password, and confirm password.
     */
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
            }, { withCredentials: true });

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
                            rules={[
                                { required: true, message: "Please enter your new password!" },
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
                            rules={[
                                { required: true, message: "Please confirm your new password!" },
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
                            rules={[
                                { required: true, message: "Please enter your new password!" },
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
                            rules={[
                                { required: true, message: "Please confirm your new password!" },
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
