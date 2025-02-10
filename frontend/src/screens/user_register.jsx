import React, { useState } from "react";
import { Button, Form, Input, notification, Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from '../assets/theme-park-portal-bg.jpg';
import "./user_register.css";

function UserRegister() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("User");
  const navigateToPage = useNavigate();

  const handleUserRegister = async (values) => {
    setLoading(true);

    // Ensure the passwords match
    if (values.password !== values.cpassword) {
      notification.error({
        message: "Password Mismatch",
        description: "Passwords do not match, please try again.",
        placement: "topRight",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_ENV_ENDPOINT}/signup`, {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        cpassword: values.cpassword,
      });

      // Show a success notification
      notification.success({
        message: "Registration Successful",
        description: "You have registered successfully!",
        placement: "topRight",
      });

      // Reset loading state after the request
      setLoading(false);
      navigateToPage("/login");
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Registration Failed",
        description: "Something went wrong. Please try again.",
        placement: "topRight",
      });
      setLoading(false);
    }
  };

  const handleAdminRegister = async (values) => {
    setLoading(true);

    // Ensure the passwords match
    if (values.password !== values.cpassword) {
      notification.error({
        message: "Password Mismatch",
        description: "Passwords do not match, please try again.",
        placement: "topRight",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_ENV_ENDPOINT}/admin/signup`, {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        cpassword: values.cpassword,
      });

      // Show a success notification
      notification.success({
        message: "Registration Successful",
        description: "You have registered successfully!",
        placement: "topRight",
      });

      // Reset loading state after the request
      setLoading(false);
      navigateToPage("/login");
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Registration Failed",
        description: "Something went wrong. Please try again.",
        placement: "topRight",
      });
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
      <div className="UserRegisterFormContainer">
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
          <Form onFinish={handleUserRegister}>
            <Form.Item
              layout="vertical"
              label={<span style={{ fontSize: "20px" }}>First Name</span>}
              name="firstname"
              rules={[{ required: true, message: "Please enter your first name" }]}
              style={{ marginBottom: "16px", minHeight: "64px" }}
            >
              <Input placeholder="Enter your First Name" size="large" />
            </Form.Item>
            <div style={{ height: "40px" }} />
            <Form.Item
              layout="vertical"
              label={<span style={{ fontSize: "20px" }}>Last Name</span>}
              name="lastname"
              rules={[{ required: true, message: "Please enter your last name" }]}
              style={{ marginBottom: "16px", minHeight: "64px" }}
            >
              <Input placeholder="Enter your Last Name" size="large" />
            </Form.Item>
            <div style={{ height: "40px" }} />
            <Form.Item
              layout="vertical"
              label={<span style={{ fontSize: "20px" }}>Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              style={{ marginBottom: "16px", minHeight: "64px" }}
            >
              <Input placeholder="Enter your Email" size="large" />
            </Form.Item>
            <div style={{ height: "40px" }} />
            <Form.Item
              layout="vertical"
              label={<span style={{ fontSize: "20px" }}>Password</span>}
              name="password"
              rules={[{ required: true, message: "Please enter your password" }, {
                min: 7,
                message: 'Password must be more than 6 characters long!',
              }]}
              style={{ marginBottom: "16px", minHeight: "64px" }}
            >
              <Input.Password placeholder="Enter your Password" size="large" />
            </Form.Item>
            <div style={{ height: "40px" }} />
            <Form.Item
              layout="vertical"
              label={<span style={{ fontSize: "20px" }}>Confirm Password</span>}
              name="cpassword"
              rules={[{ required: true, message: "Please confirm your password" },
              {
                min: 7, // Ensures password is more than 6 characters
                message: 'Password must be more than 6 characters long!',
              }
              ]}
              style={{ marginBottom: "16px", minHeight: "64px" }}
            >
              <Input.Password placeholder="Confirm your Password" size="large" />
            </Form.Item>
            <div style={{ height: "40px" }} />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", height: "5vh" }}
                size="large"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
            <div style={{ height: "5px" }} />
            <span style={{ fontSize: "20px" }}>
              Already have an account? <Link to={"/"}>Log In!</Link>
            </span>
          </Form>
        ) : (
          <Form onFinish={handleAdminRegister}>
            <Form.Item
              layout="vertical"
              label={<span style={{ fontSize: "20px" }}>First Name</span>}
              name="firstname"
              rules={[{ required: true, message: "Please enter your first name" }]}
              style={{ marginBottom: "16px", minHeight: "64px" }}
            >
              <Input placeholder="Enter your First Name" size="large" />
            </Form.Item>
            <div style={{ height: "40px" }} />
            <Form.Item
              layout="vertical"
              label={<span style={{ fontSize: "20px" }}>Last Name</span>}
              name="lastname"
              rules={[{ required: true, message: "Please enter your last name" }]}
              style={{ marginBottom: "16px", minHeight: "64px" }}
            >
              <Input placeholder="Enter your Last Name" size="large" />
            </Form.Item>
            <div style={{ height: "40px" }} />
            <Form.Item
              layout="vertical"
              label={<span style={{ fontSize: "20px" }}>Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              style={{ marginBottom: "16px", minHeight: "64px" }}
            >
              <Input placeholder="Enter your Email" size="large" />
            </Form.Item>
            <div style={{ height: "40px" }} />
            <Form.Item
              layout="vertical"
              label={<span style={{ fontSize: "20px" }}>Password</span>}
              name="password"
              rules={[{ required: true, message: "Please enter your password" },
                { 
                  min: 7, // Ensures password is more than 6 characters
                  message: 'Password must be more than 6 characters long!', 
                }
              ]}
              style={{ marginBottom: "16px", minHeight: "64px" }}
            >
              <Input.Password placeholder="Enter your Password" size="large" />
            </Form.Item>
            <div style={{ height: "40px" }} />
            <Form.Item
              layout="vertical"
              label={<span style={{ fontSize: "20px" }}>Confirm Password</span>}
              name="cpassword"
              rules={[{ required: true, message: "Please confirm your password" },
                { 
                  min: 7, // Ensures password is more than 6 characters
                  message: 'Password must be more than 6 characters long!', 
                }
              ]}
              style={{ marginBottom: "16px", minHeight: "64px" }}
            >
              <Input.Password placeholder="Confirm your Password" size="large" />
            </Form.Item>
            <div style={{ height: "40px" }} />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", height: "5vh" }}
                size="large"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
            <div style={{ height: "5px" }} />
            <span style={{ fontSize: "20px" }}>
              Already have an account? <Link to={"/"}>Log In!</Link>
            </span>
          </Form>
        )}
      </div>
    </div>

  );
}

export default UserRegister;