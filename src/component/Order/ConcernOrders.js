import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
    faLuggageCart,
    faFileInvoice
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function MyOrder() {

    const [concerns, setConcerns] = useState([]);

    useEffect(() => {
        getOrderData()
    }, [])
    const getOrderData = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/customer/concerns/${localStorage.getItem('user_id')}`)
            .then((response) => {
                setConcerns(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }
    return (
        <div className="my-3 mx-1">
            <Card>
                <div className="card-header p-2 bg-darkblue">
                    <div className="row px-2">
                        <div className="col-12">
                            <h3 className="h3 h3-responsive float-left text-white">
                                <FontAwesomeIcon className={'mr-2'} icon={faLuggageCart} />
                                {'Order concerns'}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                    {
                        concerns.map((concern, index) => (
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                <Card className="my-3 p-0">
                                    <Card.Body>
                                        <Card.Title>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="float-left">
                                                        <span className="btn btn-sm btn-light font-weight-bold">
                                                            <FontAwesomeIcon icon={faFileInvoice} /> {concern.order_no}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Title>
                                        <Card.Text>
                                            <div className="row">
                                                <div className="col-12">
                                                    <p className>Concern: {concern.concern}</p>
                                                </div>
                                            </div>
                                        </Card.Text>
                                        <Card.Text>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div class="btn-group">
                                                        <span className="btn btn-sm bg-darkblue text-white text-capitalize">
                                                            {'Order date:'} {concern.order_date}
                                                        </span>
                                                        <span className="btn btn-sm bg-darkblue text-white text-capitalize">
                                                            {'Delivery date:'} {concern.delivery_date}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    }
                    </div>
                    
                </div>
            </Card>
        </div>
    )
}

export default MyOrder