import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Footer(){

    return(
        <div>
            <div className="bg-warning w-100 p-1"/>
            <footer className="bg-light text-center text-lg-start">
                <div className="p-4 bg-darkblue text-white">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Welcome to ABCTL</h5>

                            <p className="text-left">
                                ABC Trimmings & Label is worldwide recognized company.ABC Trimmings & Label is worldwide recognized company.ABC Trimmings & Label is worldwide recognized company.
                            </p>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0 text-left">
                            <h5 className="text-uppercase h5 h5-responsive">Quick Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="/welcome" className="text-white-50"><FontAwesomeIcon icon={faArrowRight} /> Welcome</a>
                                </li>
                                {
                                    !localStorage.getItem('isLogged') &&
                                    <li>
                                        <a href="/login" className="text-white-50"><FontAwesomeIcon icon={faArrowRight} /> Login</a>
                                    </li>
                                }
                                <li>
                                    <a href="/about-us" className="text-white-50"><FontAwesomeIcon icon={faArrowRight} /> About Us</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0  text-left">
                            <h5 className="text-uppercase h5 h5-responsive">Quick Links</h5>

                            <ul className="list-unstyled">
                                <li>
                                    <a href="/" className="text-white-50"><FontAwesomeIcon icon={faArrowRight} /> Welcome</a>
                                </li>
                                {
                                    !localStorage.getItem('isLogged') &&
                                    <li>
                                        <a href="/login" className="text-white-50"><FontAwesomeIcon icon={faArrowRight} /> Login</a>
                                    </li>
                                }
                                <li>
                                    <a href="/about-us" className="text-white-50"><FontAwesomeIcon icon={faArrowRight} /> About Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3">
                    © 2021 designed by 🖤@UOR
                </div>
            </footer>
            <div className="bg-darkblue w-100 p-1"/>
        </div>
    )
}

export default Footer