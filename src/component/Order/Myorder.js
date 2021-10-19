import React, {useEffect, useState} from "react";
import {Accordion, Button, Card} from "react-bootstrap";
import {
    faLuggageCart,
    faFileInvoice,
    faArrowCircleDown, faBook
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "react-js-pagination";
import axios from "axios";

function MyOrder(){

    const [currentPage, setCurrentPage]   = useState()
    const [totalPages, setTotalPages]     = useState()
    const [itemsPerPage, setItemsPerPage] = useState()
    const [orders, setOrders]             = useState([])
    const [statuses, setStatuses]         = useState([])
    const [labelTypes, setlabeltypes]     = useState([])
    const [labelSizes, setLabelSizes]     = useState([])
    const [labelStyles, setLabelStyles]   = useState([])
    
    useEffect(()=>{
        getOrderData()
    },[])
    const getOrderData=async (pageNumber=1)=>{
        await axios
            .get(`http://127.0.0.1:8000/api/get-orders/${localStorage.getItem('user_id')}?page=${pageNumber}`)
            .then(async (response)=>{
                await setOrders(response.data.orders.data)
                await setCurrentPage(response.data.orders.current_page)
                await setTotalPages(response.data.orders.total)
                await setItemsPerPage(response.data.orders.per_page)
                await setStatuses(response.data.statuses)
                await setlabeltypes(response.data.labeltypes)
                await setLabelSizes(response.data.labelsizes)
                await setLabelStyles(response.data.labelstyles)
            })
            .catch((error)=>{
                console.log(error)
            })
        
    }
    return(
        <div className="my-3 mx-1">
            <Card>
                <div className="card-header p-2 bg-darkblue">
                    <div className="row px-2">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <h3 className="h3 h3-responsive float-left text-white">
                                <FontAwesomeIcon className={'mr-2'} icon={faLuggageCart} />
                                {'My orders'}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="float-right text-darkblue">
                                <Pagination
                                    activePage={currentPage}
                                    totalItemsCount={totalPages}
                                    itemsCountPerPage={itemsPerPage}
                                    onChange={(pageNumber)=>getOrderData(pageNumber)}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="First"
                                    lastPageText="Last"
                                    color="warning"
                                />
                            </div>
                        </div>
                    </div>
                {
            orders.map((order, index)=>(
                <Card className="my-3 p-0">
                    <Card.Body>
                        <Card.Title>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div className="float-left">
                                        <span className="btn btn-sm btn-light font-weight-bold">
                                            <FontAwesomeIcon icon={faFileInvoice} /> {order.order_no}
                                        </span>
                                    </div>
                                        <div className="float-right">
                                        {
                                            order.current_status_id ?
                                            statuses.map(status =>
                                            (
                                                status.id===order.current_status_id ?
                                                    <span className="btn btn-sm bg-darkblue text-white font-weight-bold">
                                                        {status.description}
                                                    </span>
                                                    : ''
                                            )
                                            )
                                                :
                                                <span className="btn btn-sm btn-warning font-weight-bold">
                                                    {'Pending'}
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Card.Title>
                            <Card.Text>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div class="btn-group">
                                        <span className="btn btn-sm bg-darkblue text-white text-capitalize">
                                            {'Order date:'} {order.order_date}
                                        </span>
                                        <span className="btn btn-sm bg-darkblue text-white text-capitalize">
                                            {
                                                labelTypes.map(labeltype => (
                                                    labeltype.id===order.label_type
                                                    ? <span>{'Label type: '}{labeltype.name}</span>
                                                    :''
                                                ))
                                            }
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12 xol-lg-2 col-md-12 col-sm-12 text-left p-0">
                                        <Accordion className="p-0">
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                <Button className={'text-capitalize'} size="sm" variant="warning">More details <FontAwesomeIcon icon={faArrowCircleDown}/></Button>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                        <Card>
                                                            <div className="card-header text-capitalize">
                                                                <FontAwesomeIcon icon={faBook} /> Order details
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="row p-1">
                                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                                        <table className="table table-borderless w-100">
                                                                            <tr>
                                                                                <th className="text-darkblue">{'Style no'}</th>
                                                                                {
                                                                                    labelStyles.map(data => (
                                                                                        parseInt(order.style_no) === parseInt(data.id) &&
                                                                                        <td className="text-darkblue"> {data.name}</td>
                                                                                    ))
                                                                                }
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="text-darkblue">{'Label type'}</th>
                                                                                {
                                                                                    labelTypes.map(data => (
                                                                                        parseInt(order.label_type) === parseInt(data.id) &&
                                                                                        <td className="text-darkblue">{data.name}</td>
                                                                                    ))
                                                                                }
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                                        <table className="table table-borderless w-100">
                                                                            <tr>
                                                                                <th className="text-darkblue">Delivery date</th>
                                                                                {
                                                                                    <td className="text-darkblue">{order.delivery_date}</td>
                                                                                }
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="text-darkblue">{'Current status'}</th>
                                                                                {
                                                                                    statuses.map(data => (
                                                                                        parseInt(order.current_status_id) === parseInt(data.id) &&
                                                                                        <td className="text-darkblue">{data.description}</td>
                                                                                    ))
                                                                                }
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div className="table-responsive">
                                                                    <table className="table table-hover table-bordered">
                                                                        <thead>
                                                                        <tr>
                                                                            <th className="text-darkblue">{'Size'}</th>
                                                                            {
                                                                                order.size_no &&
                                                                                JSON.parse(order.size_no).map(data => (
                                                                                    labelSizes.map(size => (
                                                                                        parseInt(size.id) === parseInt(data) &&
                                                                                        <td className="text-darkblue">{size.name}</td>
                                                                                    )))
                                                                                )
                                                                            }
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        <tr>
                                                                            <th className="text-darkblue">{'Quantity'}</th>
                                                                            {
                                                                                order.quantity &&
                                                                                JSON.parse(order.quantity).map(data => (
                                                                                    <td className="text-darkblue">{data}</td>
                                                                                ))
                                                                            }
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Accordion>
                                    </div>
                                </div>
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                ))
            }
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="float-right">
                                <Pagination
                                    activePage={currentPage}
                                    totalItemsCount={totalPages}
                                    itemsCountPerPage={itemsPerPage}
                                    onChange={(pageNumber)=>getOrderData(pageNumber)}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="First"
                                    lastPageText="Last"
                                />
                            </div>
                        </div>
                    </div>
            </div>
        </Card>
    </div>
    )
}

export default MyOrder