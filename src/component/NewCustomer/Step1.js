import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import WelcomeImage from '../../resources/img/newCustomerWelcome.png';

const schema = yup.object().shape({
    name: yup.string().required()
  }).required();

function Step1(props){
    const { nextStep, setData, data } = props;
    const [ name, setName ] = useState(data.name);
    const { register, handleSubmit, formState: {errors} }= useForm({
        resolver: yupResolver(schema),
    });
    const findNextStep = () => {
        writeOnData();
        nextStep(2);
        console.log(name);
    };
    const writeOnName = value => {
        setName(value);
    };
    const writeOnData = () => {
        setData({...data, name : name})
    };
    return (
        <form onSubmit={handleSubmit(findNextStep)}>
            <div className="my-5 text-center">
                <img src={WelcomeImage} alt="Welcome"/>
            </div>
            <Form.Group className="text-left">
                <Form.Label htmlFor="name" className="font-weight-bold">Your Company Name *</Form.Label>
                <Form.Control
                    value={name}
                    name={'name'}
                    onChange={(e) => writeOnName(e.target.value)}
                    ref={
                        register({
                            required: {
                                value: true,
                                message: 'Company name is required!'
                            }
                        })
                    }         
                />
                {errors.name?.message && <span className={'text-danger'}>{errors.name?.message}</span>}
            </Form.Group>
            <div className="text-right">
                <Button variant="warning" type="submit">
                    Next
                </Button>
            </div>
        </form>
    )
}

export default Step1;