import React from "react"
import {Button, Carousel, Image, Jumbotron, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLifeRing, faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import firstImage from "../../resources/img/1.jpg"
import thirdImage from "../../resources/img/3.jpg"
import sixthImage from "../../resources/img/6.jpg"
import label_1 from "../../resources/img/label-1.jpg"
import label_2 from "../../resources/img/label-2.jpg"

function Welcome(){
    return(
        <div className="body">
            <Row>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <Carousel fade className="carousel">
                        <Carousel.Item>
                            <img
                                className="d-block w-100 img-fluid"
                                src={firstImage}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3 className="h3 h3-responsive text-white"><FontAwesomeIcon icon={faLifeRing}/> Sustainability of Products</h3>
                                <p className="text-white">We are doing the production used by the natural standard materials.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={sixthImage}
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h3 className="h3 h3-responsive text-white"><FontAwesomeIcon icon={faPaintBrush}/> Perfect artworks for products</h3>
                                <p className="text-white">We are hiring high-expertise designers to design your products</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={thirdImage}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3 className="h3 h3-responsive text-white"><FontAwesomeIcon icon={faPaintBrush}/> Modern designs</h3>
                                <p className="text-white">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </Row>
            <Row>
                <div className="col-lg-6 col-md-6 col-sm-12 bg-new-light text-center p-5">
                    <img
                        alt={''}
                        className="d-block w-100"
                        src="https://images.pexels.com/photos/1111319/pexels-photo-1111319.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 bg-new-light  p-5">
                    <Jumbotron className="bg-new-light">
                        <h1>Sustainability of Products</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            <Button variant="primary">Learn more</Button>
                        </p>
                    </Jumbotron>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 p-5">
                    <Jumbotron>
                        <h1>Quality of Products</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            <Button variant="primary">Learn more</Button>
                        </p>
                    </Jumbotron>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 p-5 bg-new-light">
                    <Jumbotron className="bg-new-light">
                        <h1>Modern Labels</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            <Button variant="primary">Learn more</Button>
                        </p>
                    </Jumbotron>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 text-center p-5 bg-new-light">
                    <img
                        alt={''}
                        className="d-block w-100"
                        src={label_1}
                    />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 p-5">
                    <Jumbotron className="bg-new-light">
                        <h1>Sustainability of Products</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            <Button variant="primary">Learn more</Button>
                        </p>
                    </Jumbotron>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 bg-new-light text-center p-5">
                    <img
                        alt={''}
                        className="d-block w-100"
                        src={label_2}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 bg-new-light  p-5">
                    <Jumbotron className="bg-new-light">
                        <h1>Sustainability of Products</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            <Button variant="primary">Learn more</Button>
                        </p>
                    </Jumbotron>
                </div>
            </Row>
        </div>
    )
}

export default Welcome