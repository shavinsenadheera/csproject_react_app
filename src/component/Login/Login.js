import React, {useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faExclamationCircle, faInfoCircle ,faKey, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Alert, Button, Card, Form, FormControl, FormGroup, InputGroup, Row} from "react-bootstrap";
import Auth from "../../Auth";

const schema = yup.object().shape({
    email   : yup.string().required().email(),
    password: yup.string().required().min(8)
})

function Login(props){
    const [ successMsg, setSuccessMsg ] = useState(null)
    const [ failedMsg, setFailedMsg ] = useState(null)
    const { register, handleSubmit, errors } = useForm({
        resolver:yupResolver(schema)
    })
    const onSubmit=async (data)=>{
        axios
            .post('http://csprojecttemp.rabbitdevs.com/api/customer-login',{data})
            .then(async (response)=>{
                await localStorage.setItem('username',response.data.name);
                await localStorage.setItem('user_id',response.data.id);
            })
            .then(async ()=>{
                Auth.login(async ()=>{
                    await props.history.push('/order');
                })
            })
            .catch((error)=>{
                setFailedMsg(error.response)
            })
    }
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
                                <Button size="sm" variant="white" className="text-danger" onClick={() => setSuccessMsg(null)}>
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                </Button>
                            }
                            </div>
                            <Alert.Heading className="text-info"><h6 className="font-italic"><FontAwesomeIcon icon={faInfoCircle} /> {successMsg}</h6></Alert.Heading>
                        </Alert>
                    }
                    {
                        failedMsg &&
                    <Alert className="bg-light">
                        <div className="text-right float-right">
                            {
                            failedMsg &&
                                <Button size="sm" variant="white" className="text-danger" onClick={() => setFailedMsg(null)}>
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                </Button>
                            }
                        </div>
                        <Alert.Heading className="text-danger"><h6 className="font-italic"><FontAwesomeIcon icon={faInfoCircle} /> {failedMsg.data}</h6></Alert.Heading>
                    </Alert>
                    }
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <div className="card-header bg-darkblue">
                                <h3 className="h3 h3-responsive float-left text-white">Login here</h3>
                                <Button type="submit" variant="warning" className="float-right text-darkblue">Login</Button>
                            </div>
                            <div className="card-body text-left">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="email" name="email" ref={register} />
                                </InputGroup>
                                <p className="text-danger">{ errors.email && <FontAwesomeIcon icon={faExclamationCircle} /> } {errors.email?.message}</p>
    
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><FontAwesomeIcon icon={faKey} /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="password" name="password" ref={register} />
                                </InputGroup>
                                <p className="text-danger">{ errors.password && <FontAwesomeIcon icon={faExclamationCircle} /> } {errors.password?.message}</p>
    
                                <FormGroup>
                                    <span className="text-darkblue">Are you not a member in ABCTL? Please contact ABCTL</span>
                                </FormGroup>
                            </div>
                        </Card>
                    </Form>
                </div>
            </div>
        </Row>
    )
}

export default Login