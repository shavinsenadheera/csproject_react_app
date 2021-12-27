import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Form, Row, Tab, Col, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useFormik} from 'formik';
import instance from '../../service/api/instance';

function Profile()
{
    const [ customerInfo, setCustomerInfo ] = useState([]);
    const [ cities, setCities ] = useState([]);
    const [ successMsg, setSuccessMsg ] = useState('');
    const [ failedMsg, setFailedMsg ] = useState('');
    useEffect(()=>{
        instance
            .get(`customer/info/${localStorage.getItem('user_id')}`)
            .then((response)=>{
                setCities(response.data.cities);
                setCustomerInfo(response.data.customer);
                changeProfileFormik.setValues(response.data.customer);
            })
            .catch((error)=>{
                console.log(error);
            })
    },[]);
    
    const changeProfileFormik = useFormik({
        initialValues: {
            name: customerInfo.name,
            email: customerInfo.email,
            address_line_1: customerInfo.address_line_1,
            address_line_2: customerInfo.address_line_2,
            city: customerInfo.city,
            zipcode: customerInfo.zipcode,
            telephone_no: customerInfo.telephone_no,
            telephone_land: customerInfo.telephone_land,
            telephone_fax:customerInfo.telephone_fax
        },
        onSubmit: values => {
            instance
            .put(`customer/info/${localStorage.getItem('user_id')}/update`, values)
            .then((response) => {
                setSuccessMsg(response);
            })
            .catch((error) => {
                setFailedMsg(error);
            });
        }
    }); 
    const changePasswordFormik = useFormik({
        initialValues: {
            current_password: '',
            password: '',
            confirm_password: ''
        },
        onSubmit: values => {
            instance
            .put(`customer/password/${localStorage.getItem('user_id')}/update`, values)
            .then((response) => {
                setSuccessMsg(response);
            })
            .catch((error) => {
                setFailedMsg(error);
            });
        }
    });    
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
                                        onClick={() => setSuccessMsg('')}
                                    >
                                        <FontAwesomeIcon icon={faTimesCircle} />
                                    </Button>
                                }
                            </div>
                            <Alert.Heading className="text-info">
                                <h6 className="font-italic text-left">
                                    <FontAwesomeIcon icon={faInfoCircle} /> {successMsg.data}
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
                                        onClick={() => setFailedMsg('')}
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
                                                <form onSubmit={changeProfileFormik.handleSubmit}>
                                                <div className="row">
                                                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="name">Company name</label>
                                                           <input
                                                               type="text"
                                                               name="name"
                                                               className="form-control"
                                                               onChange={changeProfileFormik.handleChange}
                                                               value={changeProfileFormik.values.name}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="email">Company email</label>
                                                           <input
                                                               type="text"
                                                               name="email"
                                                               className="form-control"
                                                               onChange={changeProfileFormik.handleChange}
                                                               value={changeProfileFormik.values.email}
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
                                                               name="address_line_1"
                                                               className="form-control"
                                                               onChange={changeProfileFormik.handleChange}
                                                               value={changeProfileFormik.values.address_line_1}
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
                                                               name="address_line_2"
                                                               className="form-control"
                                                               onChange={changeProfileFormik.handleChange}
                                                               value={changeProfileFormik.values.address_line_2}
                                                           />
                                                       </div>
                                                   </div>
                                               </div>
                                               <div className="row">
                                                   <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="name">City</label>
                                                           <select 
                                                                name="city" 
                                                                id="city" 
                                                                className="form-control" 
                                                                onChange={changeProfileFormik.handleChange}
                                                                value={changeProfileFormik.values.city}
                                                                >
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
                                                               name="zipcode"
                                                               className="form-control"
                                                               onChange={changeProfileFormik.handleChange}
                                                               value={changeProfileFormik.values.zipcode}
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
                                                               name="telephone_no"
                                                               className="form-control"
                                                               value={changeProfileFormik.values.telephone_no}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                                   <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="name">Telephone land</label>
                                                           <input
                                                               type="text"
                                                               name="telephone_land"
                                                               className="form-control"
                                                               onChange={changeProfileFormik.handleChange}
                                                               value={changeProfileFormik.values.telephone_land}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                                   <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-left">
                                                       <div className="form-group">
                                                           <label htmlFor="name">Telephone fax</label>
                                                           <input
                                                               type="text"
                                                               name="telephone_fax"
                                                               className="form-control"
                                                               onChange={changeProfileFormik.handleChange}
                                                               value={changeProfileFormik.values.telephone_fax}
                                                               required={true}
                                                           />
                                                       </div>
                                                   </div>
                                                   <div className={'col-12 text-left'}>
                                                        <Button 
                                                            type={'submit'} 
                                                            className={'bg-darkblue text-white'}
                                                        >Request To Change</Button>
                                                   </div>
                                               </div>
                                               </form>
                                           </Tab.Pane>
                                           <Tab.Pane eventKey="second">
                                               <form onSubmit={changePasswordFormik.handleSubmit}>
                                                   <div className="row">
                                                   <div className="col-12 text-left">
                                                           <div className="form-group">
                                                               <label htmlFor="name">Current password</label>
                                                               <input
                                                                    type="password"
                                                                    name="current_password"
                                                                    className="form-control"
                                                                    required={true}
                                                                    value={changePasswordFormik.values.current_password}
                                                                    onChange={changePasswordFormik.handleChange}
                                                               />
                                                           </div>
                                                       </div>
                                                       <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left">
                                                           <div className="form-group">
                                                               <label htmlFor="name">New password</label>
                                                               <input
                                                                    type="password"
                                                                    name="password"
                                                                    className="form-control"
                                                                    required={true}
                                                                    value={changePasswordFormik.values.password}
                                                                    onChange={changePasswordFormik.handleChange}
                                                               />
                                                           </div>
                                                       </div>
                                                       <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-left">
                                                           <div className="form-group">
                                                               <label htmlFor="email">Confirm password</label>
                                                               <input
                                                                   type="password"
                                                                   name="confirm_password"
                                                                   className="form-control"
                                                                   required={true}
                                                                   value={changePasswordFormik.values.confirm_password}
                                                                   onChange={changePasswordFormik.handleChange}
                                                                   />
                                                           </div>
                                                       </div>
                                                   </div>
                                                   <div className="row">
                                                       <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12" align="left">
                                                           <Button
                                                                type={'submit'}
                                                                className={'bg-darkblue text-white font-weight-bold'}>Change password</Button>
                                                       </div>
                                                   </div>
                                               </form>
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