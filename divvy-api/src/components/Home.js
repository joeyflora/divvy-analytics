import React from 'react';
import {Jumbotron, 
        Container, 
        Row,
        Card, 
        Button} from 'react-bootstrap'
import Tilt from 'react-parallax-tilt';
import Fade from 'react-reveal/Fade';
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className="overlay">
                <Jumbotron fluid className="home-hero-section" >
                    <Container className="home-hero-container">
                    </Container>
                    <div className="text-container">
                            <h1>React Demo</h1>
                            <p>
                                This is a React/Redux Demo using Divvy Trips and Station data.
                            </p>
                        </div>
                </Jumbotron>
            </div>
            <Container fluid>
                <Row bsPrefix="row" className="home-row">
                    <Fade Left>
                        <Tilt tiltReverse={true} tiltMaxAngleX={8} tiltMaxAngleY={8} className="tiltFormat">
                            <Card className="shadow-lg rounded cards"style={{ width: '25rem'}}>
                                <Card.Img variant="top" src="../../trips-image.jpg" />
                                <Card.Body>
                                    <Card.Title>Trip Charts</Card.Title>
                                        <Card.Text>
                                            See a visual representation of Divvy trip data in Chicago, IL. <em>Data is from 2019(most recent).</em>
                                        </Card.Text>
                                        <Link to="/Trips">
                                            <Button className="cardButton" variant="secondary">See Charts</Button>
                                        </Link>
                                </Card.Body>
                            </Card>
                        </Tilt>
                    </Fade>
                    <Fade Left>
                        <Tilt tiltReverse={true} tiltMaxAngleX={8} tiltMaxAngleY={8} className="tiltFormat">
                            <Card className="shadow-lg rounded cards"style={{ width: '25rem'}}>
                                <Card.Img variant="top" src="../../chicago.jpg" />
                                <Card.Body>
                                    <Card.Title>Divvy Stations</Card.Title>
                                        <Card.Text>
                                            Find Divvy Docks in Chicago, IL. Click them to see the status and inventory at each station.
                                        </Card.Text>
                                    <Link to="/Map">
                                        <Button className="cardButton" variant="secondary">See Map</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Tilt>
                    </Fade>
                    <Fade Left>
                        <Tilt tiltReverse={true}  tiltMaxAngleX={8} tiltMaxAngleY={8} className="tiltFormat">
                            <Card className="shadow-lg rounded cards" style={{ width: '25rem'}}>
                                <Card.Img variant="top" src="../../image-card2.jpg" />
                                <Card.Body>
                                    <Card.Title>Station List</Card.Title>
                                        <Card.Text>
                                            See a List of all Stations in Chicago, IL. See if active and Location.
                                        </Card.Text>
                                    <Link to="/Stations">
                                        <Button className="cardButton" variant="secondary">See List</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Tilt>
                    </Fade>
                </Row>
            </Container>
        </div>
    )
}

export default Home