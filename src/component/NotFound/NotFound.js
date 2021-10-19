import React from "react";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {Card} from "react-bootstrap";

function NotFound(){
    return(
        <div className="row justify-content-center mt-5">
            <Card className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center p-5">
                <h1 className="text-danger"><FontAwesomeIcon icon={faExclamationTriangle} /></h1>
                <h1 className="text-danger">404 Error</h1>

                <p className="font-weight-bold">This page is not found. Please go to home...</p>
                <div>
                    <a className="btn btn-outline-warning" href="/">Go home</a>
                </div>
            </Card>
        </div>
    )
}

export default NotFound;