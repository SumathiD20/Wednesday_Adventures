import { Typography, Row, Col, Card, Button, Flex } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import darkwoodImage from  "../../assets/darkwood.jpeg"

const { Title, Paragraph } = Typography;

const DarkwoodPage = () => {
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
          color: '#2a2a2a',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          fontFamily: '"Creepster", cursive'
        }}>
          🎃 Darkwood - The Haunted Forest Experience 🌲
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
              src={darkwoodImage} 
              alt="Darkwood Ride" 
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
          Dare to enter the haunted forest? Step into Darkwood, a chilling adventure through 
          a cursed forest where ancient trees whisper forgotten secrets and shadowy figures 
          lurk in the perpetual twilight. Your creaking cart will navigate mist-shrouded paths, 
          revealing glowing eyes in the undergrowth and ghostly apparitions that materialize 
          from the fog. With every twist in the path, new horrors emerge - will you make it 
          through without screaming?
        </Paragraph>
      </Card>

      {/* Features & Details */}
      <Row gutter={[32, 32]} style={{ marginBottom: 40 }}>
        <Col xs={24} md={12}>
          <Card 
            title="🚨 Ride Features" 
            bordered={false}
            headStyle={{ fontSize: 20, color: '#c62828' }}
          >
            <ul style={{ 
              fontSize: 16, 
              lineHeight: 1.6,
              listStyleType: 'square',
              paddingLeft: 20
            }}>
              <li>400-meter winding track through artificial forest</li>
              <li>15+ animatronic creatures with motion activation</li>
              <li>Atmospheric temperature control (10°C/50°F)</li>
              <li>360° surround sound system with binaural audio</li>
              <li>Randomized scare patterns for repeat visits</li>
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
                  <strong>⏱ Duration:</strong> 4 minutes of immersive terror
                </div>
                <div>
                  <strong>💶 Pricing:</strong> $19.99
                </div>
                <div>
                  <strong>📏 Requirements:</strong> Minimum 152cm height • Age 12+
                </div>
                <div>
                  <strong>🎟 Capacity:</strong> 4 passengers per cart • 8 carts operational
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
          <li>Not recommended for pregnant individuals or those with heart conditions</li>
          <li>Secure loose clothing and remove dangling accessories</li>
          <li>Flash photography strictly prohibited</li>
          <li>Emergency stop buttons located every 50 meters</li>
          <li>Mandatory safety briefing before boarding</li>
        </ul>
      </Card>

      {/* CTA Section */}
      <Flex vertical gap={24} align="center" style={{ margin: '40px 0' }}>
        <Title level={2} style={{ 
          textAlign: 'center',
          color: '#c62828',
          fontStyle: 'italic'
        }}>
          "The House and the inmates remember... will you escape their grasp?"
        </Title>
        
        {/* <Flex gap={16} wrap="wrap" justify="center">
          <Button 
            type="primary" 
            danger 
            size="large"
            style={{ 
              padding: '0 32px',
              height: 48,
              fontSize: 18,
              fontWeight: 600
            }}
          >
            🩸 Book Your Nightmare 🎟
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

export default DarkwoodPage;