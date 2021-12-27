import React, {useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import instance from '../../service/api/instance';

function Step2(props){
    const [ industries, setIndustries ] = useState([]);
    const { nextStep, setData, data, setFailedPageData, setSuccessPageData } = props;
    const { register, handleSubmit, watch, formState: {errors} }= useForm();
    const findNextStep = () => {
        requestForRegister();
    };
    const findPreviousStep = () => {
        nextStep(1);
    };
    const writeOnIndustry = value => {
        setData({...data, industry: value});
    };
    const writeOnEmail = value => {
        setData({...data, email: value});
    };
    const writeOnContactNo = value => {
        setData({...data, contactNo: value});
    };
    const writeOnMessage = value => {
        setData({...data, message: value});
    };
    const requestForRegister = () => {
        instance
        .post('/new-customer', data)
        .then(res => {
            if(res.data.success){
                console.log("dsdsd");
                setSuccessPageData(res.data.message);
                return nextStep(3);
            }
            else{
                setFailedPageData(res.data.message);
                return nextStep(4);
            }
        });
    };
    useEffect(()=>{
        instance.get('industries')
        .then((res) => {
            setIndustries(res.data);
        })
        .catch((error) => {
          console.log(error.message);  
        });
    }, [])
    return (
        <form onSubmit={handleSubmit(findNextStep)}>
            <Form.Group className="text-left">
                <Form.Label htmlFor="industry" className="font-weight-bold">Your Industry *</Form.Label>
                <select 
                    size="sm" 
                    className="form-control" 
                    name="industry" 
                    value={data.industry} 
                    onChange={(e) => writeOnIndustry(e.target.value)}
                    ref={
                        register({
                            required: {
                                value: true,
                                message: "Industry field is required!"
                            }
                        })
                    }
                >
                    <option value="">Choose industry...</option>
                    {
                        industries.map((industry) =>
                            <option value={industry.id}>{industry.name}</option>
                        )
                    }
                </select>
                {errors.industry && <span className={'text-danger'}>{errors.industry?.message}</span>}
            </Form.Group>
            <Form.Group className="text-left">
                <Form.Label htmlFor="email" className="font-weight-bold">Email Address *</Form.Label>
                <Form.Control
                    name={'email'}
                    type="text" 
                    onChange={(e) => writeOnEmail(e.target.value)}
                    ref={
                        register({
                            required: {
                                value: true,
                                message: "Email field is required!"
                            },
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Email should be an email address"
                            }
                        })
                    }
                />
                {errors.email && <span className={'text-danger'}>{errors.email?.message}</span>}
            </Form.Group>
            <Form.Group className="text-left">
                <Form.Label htmlFor="contactNo" className="font-weight-bold">Contact No *</Form.Label>
                <Form.Control 
                    name="contactNo" 
                    type="text" 
                    onChange={(e) => writeOnContactNo(e.target.value)}
                    ref={
                        register({
                            required: {
                                value: true,
                                message: "Contact no field is required!"
                            },
                            minLength: {
                                value: 10,
                                message: "Contact no just like 0777777777"
                            },
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Contact no just like 0777777777"
                            }
                        })
                    }
                />
                {errors.contactNo && <span className={'text-danger'}>{errors.contactNo?.message}</span>}
            </Form.Group>
            <Form.Group className="text-left">
                <Form.Label htmlFor="message" className="font-weight-bold">Message</Form.Label>
                <Form.Control 
                    name="message" 
                    as="textarea" 
                    onChange={(e) => writeOnMessage(e.target.value)}
                    ref={
                        register({
                            required: {
                                value: true,
                                message: "Message field is required!"
                            }
                        })
                    }
                />
                {errors.message && <span className={'text-danger'}>{errors.message?.message}</span>}
            </Form.Group>
            <div className="text-right btn-group">
                <Button variant="warning" type="button" onClick={findPreviousStep}>
                    Back
                </Button>
                <Button variant="primary" type="submit">
                    Send Request
                </Button>
            </div>
        </form>
    )
}

export default Step2;