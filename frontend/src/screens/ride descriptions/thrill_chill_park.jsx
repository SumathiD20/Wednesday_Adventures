import { Typography, Row, Col, Card, Button, Flex } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import thrillChillImage from "../../assets/rollercoaster.jpg";

const { Title, Paragraph } = Typography;

const ThrillChillParkPage = () => {
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
          color: '#1565c0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          fontFamily: '"Creepster", cursive'
        }}>
          ❄️ ThrillChillPark - Frozen Terror Coasters 🎢
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
              src={thrillChillImage} 
              alt="ThrillChill Park Ride" 
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
          Brace yourself for the ultimate fusion of icy terror and high-speed adrenaline! 
          ThrillChillPark combines sub-zero temperatures with heart-stopping drops through 
          haunted ice caves and derelict arctic research stations. Navigate frozen wastelands 
          where spectral figures materialize from blizzards, and twisted ice sculptures 
          come alive with unnatural movement. Every twist and plunge brings new horrors 
          in this -20°C nightmare realm!
        </Paragraph>
      </Card>

      {/* Features & Details */}
      <Row gutter={[32, 32]} style={{ marginBottom: 40 }}>
        <Col xs={24} md={12}>
          <Card 
            title="🚨 Ride Features" 
            bordered={false}
            headStyle={{ fontSize: 20, color: '#1565c0' }}
          >
            <ul style={{ 
              fontSize: 16, 
              lineHeight: 1.6,
              listStyleType: 'square',
              paddingLeft: 20
            }}>
              <li>1.2km dual-track hybrid coaster (steel & ice)</li>
              <li>Sub-zero environment with real snow effects</li>
              <li>360° projection mapping in ice tunnels</li>
              <li>Interactive thermal shock elements</li>
              <li>Live actors in frozen scare zones</li>
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
                  <strong>⏱ Duration:</strong> 6 minutes of frozen fear
                </div>
                <div>
                  <strong>💶 Pricing:</strong> $39.99
                  
                </div>
                <div>
                  <strong>📏 Requirements:</strong> Minimum 152cm height • Age 12+
                </div>
                <div>
                  <strong>🎟 Capacity:</strong> 24 riders per train • 3 trains operational
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
          <li>Thermal jackets mandatory (provided)</li>
          <li>Not suitable for those with respiratory conditions</li>
          <li>Special footwear required (non-slip ice grips)</li>
          <li>No exposed skin permitted in sub-zero zones</li>
          <li>Emergency thaw stations throughout the ride</li>
        </ul>
      </Card>

      {/* CTA Section */}
      <Flex vertical gap={24} align="center" style={{ margin: '40px 0' }}>
        <Title level={2} style={{ 
          textAlign: 'center',
          color: '#1565c0',
          fontStyle: 'italic'
        }}>
          "The cold never bothered us... but it should bother YOU!"
        </Title>
        
        {/* <Flex gap={16} wrap="wrap" justify="center">
          <Button 
            type="primary" 
            style={{ 
              backgroundColor: '#1565c0',
              padding: '0 32px',
              height: 48,
              fontSize: 18,
              fontWeight: 600
            }}
          >
            ❄️ Book Frozen Terror
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

export default ThrillChillParkPage;