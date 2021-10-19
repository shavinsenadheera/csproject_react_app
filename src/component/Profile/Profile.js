import React, {useEffect, useState} from "react";
import axios from "axios";
import {Alert, Button, Card, Form, Row, Tab, Col, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    password : yup.string().required().min(8),
    confirmPassword: yup.string().oneOf([yup.ref('password','null') ,'Password match'])
});
function Profile()
{
    const [ customerInfo, setCustomerInfo ] = useState([])
    const [ cities, setCities ] = useState([])
    const [ successMsg, setSuccessMsg ] = useState(null)
    const [ failedMsg, setFailedMsg ] = useState(null)
    const { register, handleSubmit, errors } = useForm({
        resolver:yupResolver(schema)
    })
    
    const onSubmit=async (data)=>{
        axios
        .post(`http://127.0.0.1:8000/api/customer/update/${localStorage.getItem('user_id')}`,{data})
        .then(async (response)=>{
        
        })
        .catch((error)=>{
            setFailedMsg(error.response)
        })
    }
    
    useEffect(()=>{
        axios
            .get(`http://127.0.0.1:8000/api/customer/info/${localStorage.getItem('user_id')}`)
            .then(async (response)=>{
                await setCities(response.data.cities)
                await setCustomerInfo(response.data.customer)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])
    
    return(
        <Row className="body">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-5" align="center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12" >
                    {
                        successMsg &&
                        <Alert className="bg-light">
                            <div className="text-right float-right">
                                {
                                    successMsg &&
                                    <Button
                                        size="sm"
                                        variant="white"
                                        className="text-danger"
                                        onClick={() => setSuccessMsg(null)}
                                    >
                                        <FontAwesomeIcon icon={faTimesCircle} />
                                    </Button>
                                }
                            </div>
                            <Alert.Heading className="text-info">
                                <h6 className="font-italic">
                                    <FontAwesomeIcon icon={faInfoCircle} /> {successMsg}
                                </h6>
                            </Alert.Heading>
                        </Alert>
                    }
                    {
                        failedMsg &&
                        <Alert className="bg-light">
                            <div className="text-right float-right">
                                {
                                    failedMsg &&
                                    <Button
                                        size="sm"
                                        variant="white"
                                        className="text-danger"
                                        onClick={() => setFailedMsg(null)}
                                    >
                                        <FontAwesomeIcon icon={faTimesCircle} />
                                    </Button>
                                }
                            </div>
                            <Alert.Heading
                                className="text-danger"
                            >
                                <h6 className="font-italic">
                                    <FontAwesomeIcon icon={faInfoCircle} /> {failedMsg.data}
                                </h6>
                            </Alert.Heading>
                        </Alert>
                    }
                    <Card>
                       <Card.Header className={'bg-darkblue'}>
                           <div className="text-left float-left text-white font-weight-bold">
                               Profile
                           </div>
                           <div className="text-right float-right">
                               <span className="text-danger font-weight-bold">Profile handle by ABCTL</span>
                           </div>
                       </Card.Header>
                       <Card.Body>
                           <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                               <Row>
                                   <Col sm={3}>
                                       <Nav variant="pills" className="flex-column text-left">
                                           <Nav.Item>
                                               <Nav.Link className={'bg-warning text-dark mb-2'} eventKey="first">Profile details</Nav.Link>
                                           </Nav.Item>
                                           <Nav.Item>
                                               <Nav.Link className={'bg-warning text-dark'} eventKey="second">Change password</Nav.Link>
                                           </Nav.Item>
                                       </Nav>
                                   </Col>
                                   <Col sm={9}>
                                       <Tab.Content>
                                           <Tab.Pane eventKey="first">
                                               <div className="row">
                                                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="name">Company name</label>
                                                           <input
                                                               type="text"
                                                               disabled={true}
                                                               name="name"
                                                               className="form-control"
                                                               value={customerInfo.name}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="email">Company email</label>
                                                           <input
                                                               type="text"
                                                               disabled={true}
                                                               name="email"
                                                               className="form-control"
                                                               value={customerInfo.email}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                               </div>
                                               <div className="row">
                                                   <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="address_line_1">Delivery address line 1</label>
                                                           <input
                                                               type="text"
                                                               disabled={true}
                                                               name="address_line_1"
                                                               className="form-control"
                                                               value={customerInfo.address_line_1}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                               </div>
                                               <div className="row">
                                                   <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="address_line_2">Delivery address line 2</label>
                                                           <input
                                                               type="text"
                                                               disabled={true}
                                                               name="address_line_2"
                                                               className="form-control"
                                                               value={customerInfo.address_line_2}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                               </div>
                                               <div className="row">
                                                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="name">City</label>
                                                           <select name="city" id="city" className="form-control" disabled={true} value={customerInfo.city}>
                                                               <option selected disabled>Choose your city</option>
                                                               {
                                                                   cities.map(data=> (
                                                                       <option value={data.id}>{data.name}</option>
                                                                   ))
                                                               }
                                                           </select>
                                                       </div>
                                                   </div>
                                                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="name">Zipcode</label>
                                                           <input
                                                               type="text"
                                                               disabled={true}
                                                               name="zipcode"
                                                               className="form-control"
                                                               value={customerInfo.zipcode}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                               </div>
                                               <div className="row">
                                                   <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="name">Telephone no</label>
                                                           <input
                                                               type="text"
                                                               disabled={true}
                                                               name="telephone_no"
                                                               className="form-control"
                                                               value={customerInfo.telephone_no}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                                   <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="name">Telephone land</label>
                                                           <input
                                                               disabled={true}
                                                               type="text"
                                                               name="telephone_land"
                                                               className="form-control"
                                                               value={customerInfo.telephone_land}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                                   <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="name">Telephone fax</label>
                                                           <input
                                                               type="text"
                                                               disabled={true}
                                                               name="telephone_fax"
                                                               className="form-control"
                                                               value={customerInfo.telephone_fax}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                               </div>
                                           </Tab.Pane>
                                           <Tab.Pane eventKey="second">
                                               <Form >
                                                   <div className="row">
                                                       <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left">
                                                           <div className="form-group">
                                                               <label htmlFor="name">New password</label>
                                                               <input
                                                                   type="password"
                                                                   name="password"
                                                                   className="form-control"
                                                                   required={true}
                                                                   ref={register}
                                                               />
                                                           </div>
                                                       </div>
                                                       <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left">
                                                           <div className="form-group">
                                                               <label htmlFor="email">Confirm password</label>
                                                               <input
                                                                   type="password"
                                                                   name="confirmPassword"
                                                                   className="form-control"
                                                                   required={true}
                                                                   ref={register}
                                                               />
                                                           </div>
                                                       </div>
                                                   </div>
                                                   <div className="row">
                                                       <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12" align="left">
                                                           <Button size="sm" className={'bg-darkblue text-white font-weight-bold'}>Change password</Button>
                                                       </div>
                                                   </div>
                                               </Form>
                                           </Tab.Pane>
                                       </Tab.Content>
                                   </Col>
                               </Row>
                           </Tab.Container>
                           
                       </Card.Body>
                   </Card>
                </div>
            </div>
        </Row>
    )
}

export default Profile