import React, {useState} from "react";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import axios from "axios";

const schema=yup.object().shape({
    name: yup.string().required('The name is required!'),
    email: yup.string().required().email('The email is required!'),
    phoneno: yup.number().required(),
    telno: yup.number().required(),
    faxno: yup.number(),
    address_line_1: yup.string().required('The address line is required!'),
    city: yup.string().required('The city is required!'),
    zipcode: yup.number(),
    password: yup.string().required('The password is required!').min(8),
    confirmpassword: yup.string().oneOf([yup.ref('password'),null],'Passwords must match!')
})

function Register(){
    const [ sucessMsg, setSuccesMsg ] = useState(null)
    //Validation handling
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit=(data)=>{
        axios
            .post('http://127.0.0.1:8000/api/customer-register',{data})
            .then((res)=>{
                setSuccesMsg(res.data)
            })
            .catch((err)=>{
                alert(err)
            })
    }
    return(
        <Row className="body">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-5" align="center">
                { sucessMsg && <div>${sucessMsg}</div> }
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12" >
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <div className="card-header">
                                <h3 className="h3 h3-responsive float-left text-darkblue">Register Here</h3>
                                <Button type="submit" variant="primary" className="float-right">Register</Button>
                            </div>
                            <div className="card-body text-left">
                                <FormGroup className="mb-3" id="name">
                                    <Row>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <FormLabel htmlFor="name">Name</FormLabel>
                                        <FormControl type="text" name="name" ref={register} />
                                        <p className="text-danger">{ errors.name && <FontAwesomeIcon icon={faExclamationCircle} /> }  {errors.name?.message}</p>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <FormControl type="text" name="email" ref={register} />
                                        <p className="text-danger">{ errors.email && <FontAwesomeIcon icon={faExclamationCircle} /> } {errors.email?.message}</p>
                                    </div>
                                    </Row>
                                </FormGroup>
                                <FormGroup className="mb-3" id="name">
                                    <Row>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <FormLabel htmlFor="phoneno">Phone no</FormLabel>
                                            <FormControl type="text" name="phoneno" ref={register} />
                                            <p className="text-danger">{ errors.phoneno && <FontAwesomeIcon icon={faExclamationCircle} /> } {errors.phoneno?.message}</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <FormLabel htmlFor="telno">Telephone no</FormLabel>
                                            <FormControl type="text" name="telno" ref={register} />
                                            <p className="text-danger">{ errors.telno && <FontAwesomeIcon icon={faExclamationCircle} /> } {errors.telno?.message}</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <FormLabel htmlFor="faxno">Fax no</FormLabel>
                                            <FormControl type="text" name="faxno" ref={register} />
                                            <p className="text-danger">{ errors.faxno && <FontAwesomeIcon icon={faExclamationCircle} /> } {errors.faxno?.message}</p>
                                        </div>
                                    </Row>
                                </FormGroup>
                                <FormGroup className="mb-3" id="name">
                                    <Row>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <FormLabel htmlFor="address_line_1">Address Line 1</FormLabel>
                                            <FormControl type="text" name="address_line_1" ref={register} />
                                            <p className="text-danger">{ errors.address_line_1 && <FontAwesomeIcon icon={faExclamationCircle} /> } {errors.address_line_1?.message}</p>
                                        </div>
                                    </Row>
                                </FormGroup>
                                <FormGroup className="mb-3" id="name">
                                    <Row>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <FormLabel htmlFor="address_line_2">Address Line 2</FormLabel>
                                            <FormControl type="text" name="address_line_2" ref={register} />
                                        </div>
                                    </Row>
                                </FormGroup>
                                <FormGroup className="mb-3" id="name">
                                    <Row>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <FormLabel htmlFor="city">City</FormLabel>
                                            <select className="form-control" name="city" ref={register}>
                                                <option selected={true} disabled={true} value="">Kandy</option>
                                                <option value="kandy">Kandy</option>
                                                <option value="kandy">Kandy</option>
                                                <option value="kandy">Kandy</option>
                                                <option value="kandy">Kandy</option>
                                            </select>
                                            <p className="text-danger">{ errors.city && <FontAwesomeIcon icon={faExclamationCircle} /> } {errors.city?.message}</p>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <FormLabel htmlFor="zipcode">Zip code</FormLabel>
                                            <FormControl type="text" name="zipcode" ref={register} />
                                            <p className="text-danger">{ errors.zipcode && <FontAwesomeIcon icon={faExclamationCircle} /> }{errors.zipcode?.message}</p>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <FormControl type="password" name="password" ref={register} />
                                            <p className="text-danger">{ errors.password && <FontAwesomeIcon icon={faExclamationCircle} /> }{errors.password?.message}</p>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <FormLabel htmlFor="confirmpassword">Confirm password</FormLabel>
                                            <FormControl type="password" name="confirmpassword" ref={register} />
                                            <p className="text-danger">{ errors.confirmpassword && <FontAwesomeIcon icon={faExclamationCircle} /> }{errors.confirmpassword?.message}</p>
                                        </div>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <span className="text-darkblue">Are you already a member in ABCTL? </span>
                                    <Link to="/login">Login here</Link>
                                </FormGroup>
                            </div>
                        </Card>
                    </Form>
                </div>
            </div>
        </Row>
    )
}

export default Register