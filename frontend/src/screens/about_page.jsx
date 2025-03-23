import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Layout,
    Typography,
    Row,
    Col,
    Card,
    Button,
    Divider,
    Modal
} from 'antd';
import {
    TeamOutlined,
    TrophyOutlined,
    SafetyOutlined,
    GlobalOutlined,
    RocketOutlined
} from '@ant-design/icons';
import WAImage from "../assets/theme-park-portal-bg.jpg"
import ourStory from '../assets/home-story.jpg';
import ceo from '../assets/ceo.jpg';
import leadDesigner from '../assets/lead-designer.jpg';
import safetryDirector from '../assets/safety-director.jpg';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function AboutPage() {
    const [historyModalVisible, setHistoryModalVisible] = useState(false);

    const historyContent = `
     Our Story: Wednesday Adventure Theme Park

        At the heart of every midweek slump lies a secret—a spark of rebellion against the mundane. Wednesday Adventure Theme Park was born from that spark, a place where the ordinary cracks open to reveal worlds of thrills, chills, and impossible wonders.

        Our tale begins with Dr. Ignatius Vale, a reclusive visionary who believed Wednesdays were not just a day, but a portal. A day caught between the nostalgia of weekends past and the promise of weekends to come—a day ripe for mischief, magic, and untamed adventure. Dr. Vale spent decades scouring forgotten archives and whispered legends, convinced that Wednesday’s liminal energy could fuel something extraordinary. What he discovered was a sliver of cosmic chaos, a force that bends reality itself… if harnessed correctly.

        In 1999, he unveiled his masterpiece: a theme park built atop a hidden nexus of this energy, where rides aren’t just engineered—they’re alive with Wednesday’s wild spirit. Here, attractions shift subtly with the phases of the moon, rides seem to read your fears, and every shadow hums with secrets.

        Wednesday Adventure isn’t just a park—it’s a living experiment in defying the predictable. Our rides are designed to unsettle, exhilarate, and awaken the daredevil in everyone:

            Darkwood lures you into a sentient mansion where ghosts play games with gravity.

            Wicked Wheel dangles you above a cursed circus that refuses to stay in the past.

            Thrill Chill Park dares you to duel coasters that defy physics and logic.

            Water Amaze catapults you through ruins that rewrite themselves mid-splash.

        But there’s a catch: the park’s magic thrives on Wednesdays. Dr. Vale’s research revealed that the nexus peaks midweek, infusing rides with unpredictable twists—a coaster might invert an extra loop, a haunted hallway might sprout new horrors, or a waterfall could freeze mid-plunge. Regulars swear the park has a personality, toying with visitors who dare to return.

        Over time, Wednesday Adventure became a sanctuary for those who crave more than routine. A place where office workers trade spreadsheets for spectral encounters, students swap textbooks for time-bending drops, and families bond over shared screams. Dr. Vale vanished mysteriously years ago, but his legacy lives on: golden tokens hidden in the park still unlock rumored "Easter egg" modes on rides, and staff whisper that he watches from the shadows, grinning at the chaos.

        Why Wednesday?
        Because life shouldn’t wait for the weekend. Here, midweek isn’t a pause—it’s a rebellion. A reminder that magic doesn’t check the calendar. It’s for the curious, the restless, and anyone brave enough to ask: What if today… is the day?
            `
    const teamMembers = [
        {
            name: 'Teresa Walsch',
            role: 'CEO & Founder',
            photo: `${ceo}`,
            bio: 'Theme park industry veteran with 20+ years of experience in creating magical experiences'
        },
        {
            name: 'John Lennon',
            role: 'Lead Designer',
            photo: `${leadDesigner}`,
            bio: 'Creative visionary behind our most thrilling rides and immersive environments'
        },
        {
            name: 'Christina Richards',
            role: 'Safety Director',
            photo: `${safetryDirector}`,
            bio: 'Engineering expert ensuring all adventures meet highest safety standards'
        }
    ];

    const coreValues = [
        {
            icon: <SafetyOutlined />,
            title: 'Safety First',
            content: 'Rigorous safety protocols and constant maintenance checks'
        },
        {
            icon: <TrophyOutlined />,
            title: 'Thrill Mastery',
            content: 'Pushing boundaries of excitement while maintaining accessibility'
        },
        {
            icon: <GlobalOutlined />,
            title: 'Global Inspiration',
            content: 'Incorporating cultural elements from around the world'
        },
        {
            icon: <TeamOutlined />,
            title: 'Family Focus',
            content: 'Creating experiences for all age groups and thrill levels'
        },
        {
            icon: <RocketOutlined />,
            title: 'Innovation',
            content: 'Continuous investment in cutting-edge ride technology'
        }
    ];

    return (
        <Layout className="about-page">
            <Content style={{ padding: '0 50px' }}>
                <div style={
                    {
                        display: "flex",
                        justifyContent: "center"
                    }
                }>
                    <Title level={1} style={{ fontSize: '60px', marginBottom: '24px' }}>
                        About Us
                    </Title>
                </div>
                <div className="hero-section" style={{
                    position: 'relative',
                    textAlign: 'center',
                    padding: '120px 0',
                    minHeight: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    {/* Background Image */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'url("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.7)',
                        zIndex: 0
                    }}></div>

                    {/* Content Container */}
                    <div style={{
                        position: 'relative',
                        zIndex: 1,
                        maxWidth: '1200px',
                        padding: '0 20px'
                    }}>
                        <Title level={1} style={{
                            fontSize: '56px',
                            marginBottom: '24px',
                            color: '#fff',
                            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                            lineHeight: 1.2
                        }}>
                            Creating Magical Adventures Since 2010
                        </Title>
                        <Paragraph style={{
                            fontSize: '20px',
                            maxWidth: '800px',
                            margin: '0 auto',
                            color: 'rgba(255,255,255,0.9)',
                            textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
                            lineHeight: 1.6
                        }}>
                            At Wednesday Adventures, we've been transforming adrenaline into
                            core memories for over a decade. Our passion for gravity-defying
                            experiences and immersive storytelling creates unforgettable
                            moments for thrill-seekers worldwide.
                        </Paragraph>
                    </div>
                </div>
                {/* <div className="hero-section" style={{
                    textAlign: 'center',
                    padding: '100px 0',
                    background: '#f0f2f5'
                }}>
                    <Title level={1} style={{ fontSize: '48px', marginBottom: '24px' }}>
                        Creating Magical Adventures Since 2010
                    </Title>
                    <Paragraph style={{
                        fontSize: '18px',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        At Wednesday Adventures, we've been transforming adrenaline into
                        core memories for over a decade. Our passion for gravity-defying
                        experiences and immersive storytelling creates unforgettable
                        moments for thrill-seekers worldwide.
                    </Paragraph>
                </div> */}

                {/* Our Story Section */}
                <Row gutter={[48, 48]} align="middle" style={{ padding: '80px 0' }}>
                    <Col xs={24} md={12}>
                        <img
                            src={ourStory}
                            alt="Our Story"
                            style={{
                                width: '100%',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={2}>Our Story</Title>
                        <Paragraph style={{ fontSize: '16px' }}>
                            What began as a small team of roller coaster enthusiasts has
                            blossomed into one of the world's premier adventure park
                            destinations. From our first wooden coaster in 2010 to our
                            latest AI-enhanced dark ride, we've consistently pushed the
                            boundaries of theme park innovation.
                        </Paragraph>
                        <Button type="primary" size="large" onClick={() => setHistoryModalVisible(true)}>
                            Explore Our History
                        </Button>
                    </Col>
                </Row>

                <Modal
                    title="Our History Timeline"
                    centered
                    open={historyModalVisible}
                    onOk={() => setHistoryModalVisible(false)}
                    onCancel={() => setHistoryModalVisible(false)}
                    width={800}
                    footer={[
                        <Button
                            key="back"
                            onClick={() => setHistoryModalVisible(false)}
                        >
                            Close
                        </Button>
                    ]}
                >
                    <div style={{ padding: '24px' }}>
                        <Typography>
                            <Paragraph style={{ whiteSpace: 'pre-line' }}>
                                {historyContent}
                            </Paragraph>
                        </Typography>
                    </div>
                </Modal>

                {/* Team Section */}
                <Divider orientation="center">
                    <Title level={2} style={{ margin: '40px 0' }}>Meet Our Dream Team</Title>
                </Divider>
                <Row gutter={[32, 32]} justify="center" style={{ paddingBottom: '80px' }}>
                    {teamMembers.map((member, index) => (
                        <Col key={index} xs={24} sm={12} lg={8}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: '8px',
                                    height: '100%', // Make cards fill column height
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1
                                }}
                                // bodyStyle={{ flex: 1 }} // Make card content fill available space
                                cover={
                                    <div style={{ height: '600px', overflow: 'hidden' }}>
                                        <img
                                            alt={member.name}
                                            src={member.photo}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'top center'
                                            }}
                                        />
                                    </div>
                                }
                            >
                                <Card.Meta
                                    title={member.name}
                                    description={member.role}
                                    style={{ marginBottom: '16px' }}
                                />
                                <Paragraph style={{ marginTop: 'auto' }}> {/* Push bio to bottom */}
                                    {member.bio}
                                </Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Core Values */}
                <div style={{
                    background: '#f0f2f5',
                    padding: '80px 0',
                    textAlign: 'center'
                }}>
                    <Title level={2} style={{ marginBottom: '48px' }}>
                        Our Core Values
                    </Title>
                    <Row gutter={[32, 32]}>
                        {coreValues.map((value, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <div style={{ padding: '24px' }}>
                                    <div style={{
                                        fontSize: '32px',
                                        color: '#1890ff',
                                        marginBottom: '16px'
                                    }}>
                                        {value.icon}
                                    </div>
                                    <Title level={4}>{value.title}</Title>
                                    <Paragraph>{value.content}</Paragraph>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* CTA Section */}
                <div style={{
                    textAlign: 'center',
                    padding: '80px 0',
                    background: '#ffffff'
                }}>
                    <Title level={2} style={{ marginBottom: '24px' }}>
                        Ready for Adventure?
                    </Title>
                    <Paragraph style={{
                        fontSize: '18px',
                        marginBottom: '32px'
                    }}>
                        Join millions of thrill-seekers who've experienced the magic of
                        Wednesday Adventures
                    </Paragraph>
                    <Link to="/homepage">
                        <Button type="primary" size="large">
                            Plan Your Visit
                        </Button>
                    </Link>
                </div>
            </Content>
        </Layout>
    );
}

export default AboutPage;