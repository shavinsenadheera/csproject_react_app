import {BrowserRouter as Router, Link, Route, Switch, useHistory} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faTruckLoading, faUnlock} from "@fortawesome/free-solid-svg-icons";
import Auth from "../../Auth";
import Welcome from "../Welcome/Welcome";
import Login from "../Login/Login";
import AboutUs from "../AboutUs/AboutUs";
import ProtectedRoutes from "../../protected.routes";
import Order from "../Order/Order";
import MakeOrder from "../Order/MakeOrder";
import NotFound from "../NotFound/NotFound";
import NewCustomer from "../NewCustomer"
import React from "react";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import Profile from "../Profile/Profile";


function Header(props){
    const history = useHistory();
    const logout = () => {
        Auth.logout();
        history.push('/');
    };
    return(
        <Router>
            <Container fluid={true} className="p-0">
                <Navbar collapseOnSelect expand="lg" className="bg-darkblue px-4" variant="light">
                    <Navbar.Brand href="#home" className="text-white"><FontAwesomeIcon className="text-warning" icon={faTruckLoading}/> ABCTL</Navbar.Brand>
                    <Navbar.Toggle variant="white" aria-controls="responsive-navbar-nav" className="bg-warning" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>
                                <Link to="/" tag={Nav.Link} className="text-white">Welcome</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/about-us" tag={Nav.Link} className="text-white">About Us</Link>
                            </Nav.Link>
                            {
                                !localStorage.getItem('isLogged') &&
                                <Nav.Link>
                                    <Link to="/new-customer" tag={Nav.Link} className="text-warning">New Customer</Link>
                                </Nav.Link>
                            }
                        </Nav>
                        <Nav>
                            <Nav.Link>
                                {
                                    localStorage.getItem('isLogged') &&
                                    <Link to="/profile" tag={Nav.Link} className="btn btn-sm btn-outline-dark text-white mx-2">
                                        <FontAwesomeIcon icon={faUser} /> Hi,  { localStorage.getItem('username') }
                                    </Link>
                                }
                                <Link to="/order" tag={Nav.Link} className="btn btn-sm btn-warning text-black mx-2">
                                    <FontAwesomeIcon icon={faShoppingCart} /> Order
                                </Link>
                                {
                                    !localStorage.getItem('isLogged') ?
                                        <Link to="/login" tag={Nav.Link} className="btn btn-sm btn-warning text-black">
                                            <FontAwesomeIcon icon={faUnlock} /> Login
                                        </Link>
                                        :
                                        <Button onClick={logout} className="btn btn-sm btn-warning text-black">
                                            <FontAwesomeIcon icon={faUnlock} /> Logout
                                        </Button>
                                }
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div  className="m-0 p-0 h-100 mb-5">
                    <Switch>
                        <Route exact path="/" component={Welcome} />
                        <Route exact path="/about-us" component={AboutUs} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/new-customer" component={NewCustomer} />
                        <ProtectedRoutes exact path="/order" component={Order} />
                        <ProtectedRoutes exact path="/make-order" component={MakeOrder} />
                        <ProtectedRoutes exact path="/profile" component={Profile} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Container>
        </Router>
    )
}

export default Header