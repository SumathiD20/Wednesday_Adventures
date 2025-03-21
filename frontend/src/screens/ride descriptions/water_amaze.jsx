import { Typography, Row, Col, Card, Button, Flex } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import waterAmazeImage from "../../assets/waterslide.jpeg";

const { Title, Paragraph } = Typography;

const WaterAmazePage = () => {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
      {/* Header Section */}
      <Flex vertical gap={20} style={{ marginBottom: 40 }}>
        <Flex justify="flex-end">
          <Link to="/homepage">
            <Button type="text" icon={<HomeOutlined />} style={{ padding: '0 10px' }}>
              Return to Safety
            </Button>
          </Link>
        </Flex>
        
        <Title level={1} style={{ 
          textAlign: 'center', 
          margin: 0,
          color: '#00695c',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          fontFamily: '"Creepster", cursive'
        }}>
          🌊 WaterAmaze - Submerged Nightmares 🚤
        </Title>
      </Flex>

      {/* Main Image */}
      <Row gutter={[32, 32]} justify="center" style={{ marginBottom: 40 }}>
        <Col xs={24} md={18}>
          <div style={{ 
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
          }}>
            <img 
              src={waterAmazeImage} 
              alt="WaterAmaze Ride" 
              style={{ 
                width: '100%', 
                height: '400px',
                objectFit: 'cover',
                objectPosition: 'center 30%'
              }} 
            />
          </div>
        </Col>
      </Row>

      {/* Description Section */}
      <Card 
        bordered={false} 
        style={{ 
          marginBottom: 24,
          backgroundColor: 'rgba(245, 245, 245, 0.6)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <Paragraph style={{ 
          fontSize: 18,
          lineHeight: 1.7,
          textAlign: 'justify'
        }}>
          Prepare for a terrifying plunge into the unknown! WaterAmaze takes you through
          abandoned underwater ruins filled with ghostly figures and lurking creatures.
          Navigate mist-shrouded tunnels and eerie caverns in your fragile boat, never
          knowing what horrors await in the shadows. With sudden splashes that chill
          to the bone, haunting echoes that follow your every move, and a final drop
          that will leave you breathless - this is no ordinary water ride!
        </Paragraph>
      </Card>

      {/* Features & Details */}
      <Row gutter={[32, 32]} style={{ marginBottom: 40 }}>
        <Col xs={24} md={12}>
          <Card 
            title="🚨 Ride Features" 
            bordered={false}
            headStyle={{ fontSize: 20, color: '#00796b' }}
          >
            <ul style={{ 
              fontSize: 16, 
              lineHeight: 1.6,
              listStyleType: 'square',
              paddingLeft: 20
            }}>
              <li>600-meter winding waterway through flooded ruins</li>
              <li>Submerged animatronics with motion-triggered surges</li>
              <li>Atmospheric mist generators and chill zones</li>
              <li>Underwater lighting effects and holographic projections</li>
              <li>Randomized splash patterns and surprise geysers</li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card 
            title="📜 Ride Specifications" 
            bordered={false}
            headStyle={{ fontSize: 20, color: '#2e7d32' }}
          >
            <div style={{ fontSize: 16, lineHeight: 1.8 }}>
              <Flex vertical gap={12}>
                <div>
                  <strong>⏱ Duration:</strong> 4.5 minutes of aquatic terror
                </div>
                <div>
                  <strong>💶 Pricing:</strong> $49.99                  
                </div>
                <div>
                  <strong>📏 Requirements:</strong> Minimum 152cm height • Age 12+
                </div>
                <div>
                  <strong>🎟 Capacity:</strong> 6 passengers per boat • 10 boats operational
                </div>
              </Flex>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Safety Information */}
      <Card
        title="⚠️ Safety & Restrictions"
        headStyle={{ 
          fontSize: 20,
          color: '#d32f2f',
          borderBottom: '2px solid #ffcdd2'
        }}
        style={{
          marginBottom: 40,
          borderLeft: '4px solid #d32f2f',
          backgroundColor: '#ffebee'
        }}
      >
        <ul style={{ 
          fontSize: 16,
          lineHeight: 1.6,
          listStyleType: 'circle',
          paddingLeft: 20
        }}>
          <li>Water-resistant clothing strongly recommended</li>
          <li>Mandatory life vest usage throughout the ride</li>
          <li>No loose items - secure lockers provided</li>
          <li>Not suitable for non-swimmers or those with hydrophobia</li>
          <li>Emergency exits located every 100 meters</li>
        </ul>
      </Card>

      {/* CTA Section */}
      <Flex vertical gap={24} align="center" style={{ margin: '40px 0' }}>
        <Title level={2} style={{ 
          textAlign: 'center',
          color: '#00796b',
          fontStyle: 'italic'
        }}>
          "The depths remember... will you surface unchanged?"
        </Title>
        
        {/* <Flex gap={16} wrap="wrap" justify="center">
          <Button 
            type="primary" 
            style={{ 
              backgroundColor: '#00796b',
              padding: '0 32px',
              height: 48,
              fontSize: 18,
              fontWeight: 600
            }}
          >
            🌊 Book Your Aquatic Nightmare
          </Button>
          
          <Link to="/homepage">
            <Button 
              size="large"
              style={{ 
                height: 48,
                fontSize: 16,
                borderColor: '#2e7d32',
                color: '#2e7d32'
              }}
            >
              🏡 Return to Main Park
            </Button>
          </Link>
        </Flex> */}
      </Flex>
    </div>
  );
};

export default WaterAmazePage;