import React, {useEffect, useState} from "react";
import {
    Card,
    Table
} from "react-bootstrap";
import {
    faSearch,
    faIndustry,
    faUserTie,
    faPencilRuler,
    faTruckMoving,
    faHandHoldingHeart,
    faBusinessTime, faCalendarTimes, faClock, faBook, faSmile
} from "@fortawesome/free-solid-svg-icons";
import {faUsb, faWolfPackBattalion}  from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Select from 'react-select'

function TrackOrder(){
    
    const [ orders, setOrders ] = useState([])
    const [ order, setOrder ] = useState([])
    const [ trackOrder, setTrackOrder ] = useState([])
    const [ takenBy, setTakenBy ] = useState([])
    const [ statuses, setStatuses ] = useState([])
    const [ orderStatuses, setOrderStatuses ] = useState([])
    const [ currentStatus, setCurrentStatus ] = useState([])
    const [ labelSizes, setLabelSizes ] = useState([])
    const [ labelStyles, setLabelStyles ] = useState([])
    const [ labelTypes, setLabelTypes ] = useState([])
    const [ employees, setEmployees ] = useState([])
    const [ employee, setEmployee ] = useState([])
    const [ users, setUsers ] = useState([])
    const [ totalQty, setTotalQty ] = useState(0)
    const [ isSearched, setIsSearched ] = useState(false)
    
    useEffect(()=>{
        getOrderData()
    },[])
    
    const getOrderData=async ()=>{
        await axios
        .get(`http://csprojecttemp.rabbitdevs.com/api/get-all-orders/${localStorage.getItem('user_id')}`)
        .then((response)=>{
            setOrders(response.data.orders)
            setStatuses(response.data.statuses)
            setOrderStatuses(response.data.order_status)
            setEmployees(response.data.employees)
            setLabelSizes(response.data.labelsizes)
            setLabelStyles(response.data.labelstyles)
            setLabelTypes(response.data.labeltypes)
            setUsers(response.data.users)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
    const getOrderStatus=async(id)=>{

       await orders.map(order=> {
            if(parseInt(order.id)===parseInt(id))
            {
                setCurrentStatus(order.current_status_id)
                setTakenBy(order.taken_by)
                setOrder(order)
                setIsSearched(true)
            }
           {
               JSON.parse(order.quantity).map(data=> {
                   setTotalQty(prevState => prevState + parseInt(data))
               })
           }
        })
        await orderStatuses.map(order_status=>{
            if(parseInt(order_status.order_id)===parseInt(id))
            {
                setTrackOrder(order_status)
            }
        })
        await employees.map(cs_employees=>{
            if(parseInt(takenBy)===parseInt(cs_employees.id))
            {
                setEmployee(cs_employees)
            }
            console.log("dsd")
        })
    };
    
    return(
        <div className="my-3 mx-1">
            <Card>
                <div className="card-header p-2 bg-darkblue">
                    <div className="row px-2">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <h3 className="h3 h3-responsive float-left text-white">
                                <FontAwesomeIcon className={'mr-2'} icon={faSearch} />
                                {'Track orders'}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                                <select className="form-control" name="order_no" id="order_no" onChange={e=>getOrderStatus(e.target.value)}>
                                    <option selected disabled>Choose order no</option>
                                    {
                                        orders.map(order=>(
                                            <option value={order.id}>{order.order_no}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        {
                         isSearched &&
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <Card>
                                    <div className="card-header">
                                        <FontAwesomeIcon icon={faBook} /> Order details
                                    </div>
                                    <div className="card-body">
                                        <div className="row p-1">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 bg-light">
                                                <table className="table table-borderless w-100">
                                                    <tr>
                                                        <th className="text-darkblue">Coordinator name</th>
                                                        {
                                                            employees.map(employee_data => (
                                                                employee_data.id === trackOrder.status_1_empid &&
                                                                <td> {employee_data.name} </td>
                                                            ))
                                                        }
                                                    </tr>
                                                    <tr>
                                                        <th className="text-darkblue">Coordinator email</th>
                                                        {
                                                            users.map(data=>(
                                                                data.id===trackOrder.status_1_empid &&
                                                                <td>{data.email}</td>
                                                            ))
                                                        }
                                                    </tr>
                                                </table>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 bg-light">
                                                <table className="table table-borderless w-100">
                                                    <tr>
                                                        <th className="text-darkblue">Coor. contact no</th>
                                                        {
                                                            employees.map(employee_data=>(
                                                                employee_data.id===trackOrder.status_1_empid &&
                                                                <td>{employee_data.contact_no}</td>
                                                            ))
                                                        }
                                                    </tr>
                                                    <tr>
                                                        <th className="text-darkblue">Manager email</th>
                                                        <td>rabbitdevs@gmail.com</td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                <table className="table table-borderless w-100">
                                                    <tr>
                                                        <th className="text-darkblue">Style no</th>
                                                        {
                                                            labelStyles.map(data => (
                                                                parseInt(order.style_no) === parseInt(data.id) &&
                                                                <td className="text-darkblue"> {data.name}</td>
                                                            ))
                                                        }
                                                    </tr>
                                                    <tr>
                                                        <th className="text-darkblue">Label type</th>
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
                                                        <th className="text-darkblue">Current status</th>
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
                                                    <th className="text-darkblue">Size</th>
                                                    {
                                                        order.size_no &&
                                                        JSON.parse(order.size_no).map(data => (
                                                            labelSizes.map(size => (
                                                                parseInt(size.id) === parseInt(data) &&
                                                                <td className="text-darkblue">{size.name}</td>
                                                            )))
                                                        )}
                                                    <th className="text-darkblue">Total</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th className="text-darkblue">Quantity</th>
                                                    {
                                                        order.quantity &&
                                                        JSON.parse(order.quantity).map(data => (
                                                            <td className="text-darkblue">{data}</td>
                                                        ))}
                                                    <th className="text-darkblue">{totalQty}</th>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        }
                        {
                            isSearched &&
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 py-5">
                            <Card>
                                <div className="card-header">
                                    <FontAwesomeIcon icon={faClock} /> Order timeline
                                </div>
                                <div className="card-body">
                                    <VerticalTimeline>
                                        {
                                            trackOrder.status_1 &&
                                            <VerticalTimelineElement
                                                className="vertical-timeline-element--work"
                                                contentStyle={{ background: 'rgb(0,43,74)', color: '#fff' }}
                                                contentArrowStyle={{borderRight: '7px solid  rgb(0,43,74)'}}
                                                iconStyle={{ background: 'rgb(234,154,11)', color: '#fff' }}
                                                icon={<FontAwesomeIcon icon={faUserTie}/>}
                                            >
                                                <p>{trackOrder.status_1_datetime}</p>
                                                <h3 className="vertical-timeline-element-title">Order in Review</h3>
                                                <h6 className="vertical-timeline-element-subtitle">
                                                    {
                                                        employees.map(employee_data=>(
                                                            employee_data.id===trackOrder.status_1_empid &&
                                                            <span> Coordinator: {employee_data.name}</span>
                                                        ))
                                                    }
                                                </h6>
                                            </VerticalTimelineElement>
                                        }
                                        {
                                            trackOrder.status_2 &&
                                            <VerticalTimelineElement
                                                className="vertical-timeline-element--work"
                                                contentStyle={{ background: 'rgb(0,43,74)', color: '#fff' }}
                                                contentArrowStyle={{borderRight: '7px solid  rgb(0,43,74)'}}
                                                iconStyle={{ background: 'rgb(234,154,11)', color: '#fff' }}
                                                icon={<FontAwesomeIcon icon={faPencilRuler} /> }
                                            >
                                                <p>{trackOrder.status_2_datetime}</p>
                                                <h3 className="vertical-timeline-element-title">Order in Planning</h3>
                                                <h6
                                                    className="vertical-timeline-element-subtitle"
                                                >
                                                    {
                                                        employees.map(employee_data=>(
                                                            employee_data.id===trackOrder.status_2_empid &&
                                                            <span> Done by: {employee_data.name}</span>
                                                        ))
                                                    }
                                                </h6>
                                            </VerticalTimelineElement>
                                        }
                                        {
                                            trackOrder.status_3 &&
                                            <VerticalTimelineElement
                                                className="vertical-timeline-element--work"
                                                contentStyle={{ background: 'rgb(0,43,74)', color: '#fff' }}
                                                contentArrowStyle={{borderRight: '7px solid  rgb(0,43,74)'}}
                                                iconStyle={{ background: 'rgb(234,154,11)', color: '#fff' }}
                                                icon={<FontAwesomeIcon icon={faIndustry} /> }
                                            >
                                                <p>{trackOrder.status_3_datetime}</p>
                                                <h3 className="vertical-timeline-element-title">Order in Manufacturing</h3>
                                                <h6
                                                    className="vertical-timeline-element-subtitle"
                                                >
                                                    {
                                                        employees.map(employee_data=>(
                                                            employee_data.id===trackOrder.status_3_empid &&
                                                            <span> Done by: {employee_data.name}</span>
                                                        ))
                                                    }
                                                </h6>
                                            </VerticalTimelineElement>
                                        }
                                        {
                                            trackOrder.status_4 &&
                                            <VerticalTimelineElement
                                                className="vertical-timeline-element--work"
                                                contentStyle={{ background: 'rgb(0,43,74)', color: '#fff' }}
                                                contentArrowStyle={{borderRight: '7px solid  rgb(0,43,74)'}}
                                                iconStyle={{ background: 'rgb(234,154,11)', color: '#fff' }}
                                                icon={<FontAwesomeIcon icon={faWolfPackBattalion} /> }
                                            >
                                                <p>{trackOrder.status_4_datetime}</p>
                                                <h3 className="vertical-timeline-element-title">Order in Packing and QA</h3>
                                                <h6
                                                    className="vertical-timeline-element-subtitle"
                                                >
                                                    {
                                                        employees.map(employee_data=>(
                                                            employee_data.id===trackOrder.status_4_empid &&
                                                            <span> Done by: {employee_data.name}</span>
                                                        ))
                                                    }
                                                </h6>
                                            </VerticalTimelineElement>
                                        }
                                        {
                                            trackOrder.status_5 &&
                                            <VerticalTimelineElement
                                                className="vertical-timeline-element--work"
                                                contentStyle={{ background: 'rgb(0,43,74)', color: '#fff' }}
                                                contentArrowStyle={{borderRight: '7px solid  rgb(0,43,74)'}}
                                                iconStyle={{ background: 'rgb(234,154,11)', color: '#fff' }}
                                                icon={<FontAwesomeIcon icon={faTruckMoving} /> }
                                            >
                                                <p>{trackOrder.status_5_datetime}</p>
                                                <h3 className="vertical-timeline-element-title">Order is on the way to you</h3>
                                                <h6
                                                    className="vertical-timeline-element-subtitle"
                                                >
                                                    {
                                                        employees.map(employee_data=>(
                                                            employee_data.id===trackOrder.status_5_empid &&
                                                            <span> Done by: {employee_data.name}</span>
                                                        ))
                                                    }
                                                </h6>
                                            </VerticalTimelineElement>
                                        }
                                        {
                                            trackOrder.status_6 &&
                                            <VerticalTimelineElement
                                                className="vertical-timeline-element--work"
                                                contentStyle={{ background: 'rgb(225,225,225)', color: '#0e003a' }}
                                                contentArrowStyle={{borderRight: '7px solid  rgb(0,43,74)'}}
                                                iconStyle={{ background: 'rgb(234,154,11)', color: '#ffffff' }}
                                                icon={<FontAwesomeIcon icon={faSmile} /> }
                                            >
                                                <p>{trackOrder.status_6_datetime}</p>
                                                <h3 className="vertical-timeline-element-title">Order is delivered!</h3>
                                                <h6
                                                    className="vertical-timeline-element-subtitle"
                                                >
                                                    {
                                                        employees.map(employee_data=>(
                                                            employee_data.id===trackOrder.status_6_empid &&
                                                            <span> Done by: {employee_data.name}</span>
                                                        ))
                                                    }
                                                </h6>
                                            </VerticalTimelineElement>
                                        }
                                    </VerticalTimeline>
                                </div>
                            </Card>
                        </div>
                        }
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default TrackOrder