import { Typography, Row, Col, Card, Button, Flex } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import wickedWheelImage from "../../assets/wheelride.jpeg";

const { Title, Paragraph } = Typography;

const WickedWheelPage = () => {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
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
          color: '#4a148c',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          fontFamily: '"Creepster", cursive'
        }}>
          🎡 WickedWheel - Sky-High Horror 🌌
        </Title>
      </Flex>

      <Row gutter={[32, 32]} justify="center" style={{ marginBottom: 40 }}>
        <Col xs={24} md={18}>
          <div style={{ 
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
          }}>
            <img 
              src={wickedWheelImage} 
              alt="WickedWheel Ride" 
              style={{ 
                width: '100%', 
                height: '400px',
                objectFit: 'cover',
                objectPosition: 'center 70%'
              }} 
            />
          </div>
        </Col>
      </Row>

      <Card bordered={false} style={{ 
          marginBottom: 24,
          backgroundColor: 'rgba(245, 245, 245, 0.6)',
          backdropFilter: 'blur(4px)'
        }}>
        <Paragraph style={{ 
          fontSize: 18,
          lineHeight: 1.7,
          textAlign: 'justify'
        }}>
          Ascend into terror with WickedWheel, where each rotation brings new dread. 
          This haunted Ferris wheel transforms a classic amusement into a heart-pounding 
          nightmare. As you climb 30 meters above ground, experience mysterious cabin shakes, 
          ghostly whispers in the wind, and chilling visions in the distant darkness. 
          Will you survive the descent?
        </Paragraph>
      </Card>

      <Row gutter={[32, 32]} style={{ marginBottom: 40 }}>
        <Col xs={24} md={12}>
          <Card 
            title="🚨 Ride Features" 
            bordered={false}
            headStyle={{ fontSize: 20, color: '#6a1b9a' }}
          >
            <ul style={{ 
              fontSize: 16, 
              lineHeight: 1.6,
              listStyleType: 'square',
              paddingLeft: 20
            }}>
              <li>30-meter tall Ferris wheel with 12 haunted cabins</li>
              <li>Randomized cabin rotation patterns</li>
              <li>Holographic projections in night sky</li>
              <li>Dynamic wind and temperature effects</li>
              <li>Seat vibration system for added intensity</li>
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
                  <strong>⏱ Duration:</strong> 5 minutes of aerial terror
                </div>
                <div>
                  <strong>💶 Pricing:</strong> $29.99
                </div>
                <div>
                  <strong>📏 Requirements:</strong> Minimum 152cm height • Age 12+
                </div>
                <div>
                  <strong>🎟 Capacity:</strong> 4 passengers per cabin • 12 cabins
                </div>
              </Flex>
            </div>
          </Card>
        </Col>
      </Row>

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
          <li>Not recommended for those with vertigo or fear of heights</li>
          <li>Secure all loose items before boarding</li>
          <li>Safety harness must remain engaged</li>
          <li>No standing or leaning out of cabins</li>
          <li>Weather-dependent operation</li>
        </ul>
      </Card>

      <Flex vertical gap={24} align="center" style={{ margin: '40px 0' }}>
        <Title level={2} style={{ 
          textAlign: 'center',
          color: '#6a1b9a',
          fontStyle: 'italic'
        }}>
          "The higher you climb, the harder you'll fall..."
        </Title>
        
        {/* <Flex gap={16} wrap="wrap" justify="center">
          <Button 
            type="primary" 
            style={{ 
              backgroundColor: '#4a148c',
              padding: '0 32px',
              height: 48,
              fontSize: 18,
              fontWeight: 600
            }}
          >
            🎟 Book Nightmare Ascent
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

export default WickedWheelPage;