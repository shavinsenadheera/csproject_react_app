import React from "react";
import {Card, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHeart, faChessKing, faStamp } from "@fortawesome/free-solid-svg-icons";

function AboutUs(){
    return(
        <div className="body">
            <Row>
                <div className="col-lg-12 col-md-12 col-sm-12 text-center pt-5 px-5">
                    <div>
                        <h1 className="h1 h1-responsive text-darkblue"><FontAwesomeIcon icon={faUsers}/> Who we are...</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.This is a simple hero unit, a simple jumbotron-style component for calling
                        </p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 text-center text-darkblue pt-5 px-5">
                    <Card>
                        <Card.Header as="h5"><FontAwesomeIcon icon={faChessKing}/> Employees</Card.Header>
                        <Card.Body>
                            <Card.Title>12,000</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 text-center text-darkblue pt-5 px-5">
                    <Card>
                        <Card.Header as="h5"><FontAwesomeIcon icon={faHeart}/> Clients</Card.Header>
                        <Card.Body>
                            <Card.Title>1,000</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 text-center text-darkblue pt-5 px-5">
                    <Card border={0}>
                        <Card.Header as="h5"><FontAwesomeIcon icon={faStamp}/> Labels</Card.Header>
                        <Card.Body>
                            <Card.Title>24M</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </div>
    )
}

export default AboutUs