import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faBars,
    faCartPlus,
    faLuggageCart
} from "@fortawesome/free-solid-svg-icons";
import {AiFillNotification} from 'react-icons/ai';
import { ButtonGroup } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Link,
    Switch
} from "react-router-dom";
import MyOrder from "./Myorder";
import MakeOrder from "./MakeOrder";
import TrackOrder from "./TrackOrder";
import ConcernOrders from './ConcernOrders';
import ProtectedRoutes from "../../protected.routes";

function Order(){
    return(
        <Router>
        <div className="row justify-content-center text-left mt-5 p-1">
            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12">
                <div className="bg-light">
                <ButtonGroup>
                    <span className="btn bg-darkblue text-white active"> 
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                    <Link to="my-order">
                        <a className="btn btn-light" href="#!">
                            <FontAwesomeIcon icon={faLuggageCart} /> {'My orders'}
                        </a>
                    </Link>
                    <Link to="make-order">
                        <a className="btn btn-light" href="#!">
                            <FontAwesomeIcon icon={faCartPlus} /> {'Make order'}
                        </a>
                    </Link>
                    <Link to="track-order">
                        <a className="btn btn-light" href="#!"> 
                            <FontAwesomeIcon icon={faSearch} /> {'Track orders'}
                        </a>
                    </Link>
                    <Link to="concern-orders">
                        <a className="btn btn-light" href="#!"> 
                            <AiFillNotification /> {'Concern orders'}
                        </a>
                    </Link>
                </ButtonGroup>
                </div>
                <Switch>
                    <ProtectedRoutes exact path="/order" component={MyOrder} />
                    <ProtectedRoutes exact path="/my-order" component={MyOrder} />
                    <ProtectedRoutes exact path="/make-order" component={MakeOrder} />
                    <ProtectedRoutes exact path="/track-order" component={TrackOrder} />
                    <ProtectedRoutes exact path="/concern-orders" component={ConcernOrders} />
                </Switch>
            </div>
        </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            </div>
        </Router>
    )
}

export default Order