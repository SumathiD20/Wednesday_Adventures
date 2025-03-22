import React, { useState } from "react";
import { Button, Form, Input, notification, Tabs, Checkbox, Modal, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from '../assets/theme-park-portal-bg.jpg';
import "./user_register.css";

const { Text } = Typography;

function UserRegister() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("User");
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [form] = Form.useForm(); // Form instance
  const navigateToPage = useNavigate();

  // Terms and Conditions content
  const termsAndConditionsContent = `
  <h2>Terms and Conditions for Login and Ticket Booking</h2>
  <p><strong>Effective Date:</strong> [Insert Date]</p>

  <h3>1. Acceptance of Terms</h3>
  <p>By creating an account, logging in, or booking tickets on our platform, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. These terms constitute a legally binding agreement between you and <strong>Wednesday's Wicked Adventures</strong>.</p>

  <h3>2. Account Registration and Login</h3>
  <p><strong>Eligibility:</strong> You must be at least 18 years old to create an account or book tickets. Minors may use the platform only under the supervision of a parent or legal guardian.</p>
  <p><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your login credentials (username and password).</p>
  <p><strong>Termination of Access:</strong> We reserve the right to suspend or terminate your account at any time if you violate these Terms and Conditions or engage in fraudulent or inappropriate activities.</p>

  <h3>3. Ticket Booking</h3>
  <p><strong>Booking Process:</strong> Tickets for rides and attractions can be booked through our platform. All bookings are subject to availability.</p>
  <p><strong>Payment:</strong> We accept payments through supported payment methods as indicated on the platform.</p>
  <p><strong>Refunds and Cancellations:</strong> Refunds are subject to our <strong>Refund Policy</strong>, which is available on our website.</p>
  <p><strong>Ticket Usage:</strong> Tickets are non-transferable and valid only for the date and time specified during booking.</p>

  <h3>4. Privacy and Data Usage</h3>
  <p><strong>Data Collection:</strong> We collect personal information (e.g., name, email, payment details) to process bookings, enhance your experience, and comply with legal obligations.</p>
  <p><strong>Data Security:</strong> We implement industry-standard security measures to protect your data.</p>

  <h3>5. Liability and Disclaimers</h3>
  <p><strong>Ride Safety:</strong> Some rides and attractions may involve physical activity or elements of risk. Participants must assess their own physical condition and ability before engaging in such activities.</p>
  <p><strong>Platform Accuracy:</strong> While we strive to provide accurate information, we do not guarantee the completeness or reliability of the content on our platform.</p>
  <p><strong>Limitation of Liability:</strong> To the fullest extent permitted by law, <strong>Wednesday's Wicked Adventures</strong> shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the platform or participation in park activities.</p>

  <h3>6. Modifications to Terms</h3>
  <p><strong>Updates:</strong> We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our platform.</p>
  <p><strong>Notification:</strong> We will notify users of significant changes via email or platform alerts.</p>

  <h3>7. Governing Law</h3>
  <p>These Terms and Conditions are governed by and construed in accordance with the laws of [Insert Jurisdiction].</p>

  <h3>8. Contact Us</h3>
  <p>If you have any questions or concerns regarding these Terms and Conditions, please contact our support team at:</p>
  <p><strong>Email:</strong> support@wednesdayswickedadventures.com</p>

  <h3>Acknowledgment</h3>
  <p>By using our platform, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. Thank you for choosing <strong>Wednesday's Wicked Adventures</strong> – we hope you enjoy your thrilling experience!</p>
  `;

  // Show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

    // Ensure the user agrees to the terms and conditions
    if (!values.agreeToTerms) {
      notification.error({
        message: "Terms and Conditions",
        description: "You must agree to the terms and conditions to register.",
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

    // Ensure the user agrees to the terms and conditions
    if (!values.agreeToTerms) {
      notification.error({
        message: "Terms and Conditions",
        description: "You must agree to the terms and conditions to register.",
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
          <Form form={form} onFinish={handleUserRegister}>
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
            {/* Terms and Conditions Checkbox */}
            <Form.Item
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
                <Text type="link" onClick={showModal} style={{ color: "#1890ff" }}>
                  Terms and Conditions
                </Text>
              </Checkbox>
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
          <Form form={form} onFinish={handleAdminRegister}>
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
            {/* Terms and Conditions Checkbox */}
            <Form.Item
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
                <Text type="link" onClick={showModal} style={{ color: "#1890ff" }}>
                  Terms and Conditions
                </Text>
              </Checkbox>
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

      {/* Terms and Conditions Modal */}
      <Modal
        title="Terms and Conditions"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
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
    </div>
  );
}

export default UserRegister;