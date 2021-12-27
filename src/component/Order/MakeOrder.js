import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimesCircle, faInfoCircle, faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {AiOutlineClose} from 'react-icons/ai';
import instance from '../../service/api/instance';

function MakeOrder(){
    const [ inputList, setInputList ] = useState(
        [
            {
                delivery_date:"",
                label_type:"",
                style_no:"",
                referencedoc:"",
                size_no: "",
                qty:"",
            }
        ]
    );
    const [ labeltypedata, setLabelTypedata ] = useState([]);
    const [ labelsizedata, setLabelSizedata ] = useState([]);
    const [ labelstyledata, setLabelStyledata ] = useState([]);
    const [ count, setCount ] = useState(1);
    const [ customerid, setCustomerId ] = useState(localStorage.getItem('user_id'));
    const [ successMsg, setSuccessMsg ] = useState(null);
    const [ failedMsg, setFailedMsg ] = useState(null);
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [ ...inputList ];
        list[index][name] = value;
        setInputList(list);
    };
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        setCount(prevState => prevState - 1);
    };
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { size_no: "", qty: ""}]);
        setCount(prevState => prevState + 1);
    };
    //Get make order details from database
    useEffect(()=>{
        instance
        .get('http://127.0.0.1:8000/api/make-order')
        .then((response)=>{
            setLabelTypedata(response.data.labeltypes)
            setLabelSizedata(response.data.labelsizes)
            setLabelStyledata(response.data.labelstyles)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[]);
    
    const label_types = labeltypedata.map(labeltype=>(
        {
            value:labeltype.id,
            label:labeltype.name
        }
    ))
    const label_sizes = labelsizedata.map(labelsize=>(
        {
            value:labelsize.id,
            label:labelsize.name
        }
    ))
    const label_styles = labelstyledata.map(labelstyle=>(
        {
            value:labelstyle.id,
            label:labelstyle.name
        }
    ))
    
    const makeOrder=(e)=>{
        e.preventDefault()
        instance
        .post('make-order',{inputList,count,customerid})
        .then((response)=>{
            setSuccessMsg('Successfully make the order!')
        })
        .catch((error)=>{
            setFailedMsg(error.message)
        })
    }
    
    return (
        <div className="my-3">
            {successMsg &&
            <Alert className="bg-light">
                <div className="text-right float-right">
                    {successMsg &&
                    <Button size="sm" variant="white" className="text-danger" onClick={() => setSuccessMsg(null)}>
                        <FontAwesomeIcon icon={faTimesCircle}/>
                    </Button>
                    }
                </div>
                <Alert.Heading className="text-info"><h6 className="font-italic"><FontAwesomeIcon
                    icon={faInfoCircle}/> {successMsg}</h6></Alert.Heading>
            </Alert>
            }
            {failedMsg &&
            <Alert className="bg-light">
                <div className="text-right float-right">
                    {failedMsg &&
                    <Button size="sm" variant="white" className="text-danger" onClick={() => setFailedMsg(null)}>
                        <FontAwesomeIcon icon={faTimesCircle}/>
                    </Button>
                    }
                </div>
                <Alert.Heading className="text-danger"><h6 className="font-italic"><FontAwesomeIcon
                    icon={faInfoCircle}/> {failedMsg}</h6></Alert.Heading>
            </Alert>
            }
            <Form onSubmit={(e) => makeOrder(e)}>
                <Card>
                    <div className="card-header p-2 bg-darkblue">
                        <div className="row px-2">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <h3 className="h3 h3-responsive float-left text-white">
                                    <FontAwesomeIcon icon={faCartPlus} className={'mr-2'} />Make order
                                </h3>
                                <Button type="submit" size="sm" variant="warning" className="float-right">
                                    Order confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <FormGroup className="mb-3">
                            <Row>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <FormLabel htmlFor="delivery_date">Delivery date</FormLabel>
                                    <FormControl type="date" min={new Date().getDate()} name="delivery_date" onChange={e => handleInputChange(e, 0)} required/>
                                    <p className="text-danger"></p>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <FormLabel htmlFor="label_type">Label type
                                        <a className="font-weight-lighter text-dark" href="#!">(Learn more)</a>
                                    </FormLabel>
                                    <select className="form-control" name="label_type" id="label_type" onChange={e => handleInputChange(e, 0)} required>
                                        <option selected value="">Choose size</option>
                                        {
                                            labeltypedata.map((data) =>
                                                <option selected value={data.id}>{data.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <FormLabel htmlFor="style_no">Style no</FormLabel>
                                    <select className="form-control" name="style_no" id="style_no" onChange={e => handleInputChange(e, 0)} required>
                                        <option selected value="">Choose size</option>
                                        {
                                            labelstyledata.map((data) =>
                                                <option selected value={data.id}>{data.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </Row>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            {inputList.map((x, i) => {
                                return (
                                    <Row>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                            <FormLabel htmlFor="size_no">Size type</FormLabel>
                                            <select className="form-control" name="size_no" id="size_no"
                                                    onChange={e => handleInputChange(e, i)}
                                                    value={x.size_no ? x.size_no : ''}
                                                    required
                                            >
                                                <option selected value="">Choose size</option>
                                                {
                                                    labelsizedata.map((data) =>
                                                        <option selected value={data.id}>{data.name}</option>
                                                    )
                                                }
                                            </select>
                                            <p className="text-danger"></p>
                                        </div>
                                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
                                            <FormLabel htmlFor="qty">Quantity</FormLabel>
                                            <FormControl type="number" min="1" name="qty"
                                                         onChange={e => handleInputChange(e, i)} value={x.qty} required/>
                                            <p className="text-danger"></p>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 align-middle">
                                            <FormLabel htmlFor="labellength" className="text-white">Add size</FormLabel>
                                            <div>
                                                {
                                                    inputList.length !== 1 &&
                                                    <Button 
                                                        variant="warning" size="sm" className="mx-1"
                                                        onClick={() => handleRemoveClick(i)}
                                                    >
                                                        <AiOutlineClose class={'text-white'} />
                                                    </Button>}
                                                {
                                                    inputList.length - 1 === i &&
                                                    <Button className={'bg-darkblue'} size="sm" onClick={handleAddClick}>
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </Button>}
                                            </div>
                                        </div>
                                    </Row>
                                );
                            })}
                        </FormGroup>
                    </div>
                </Card>
            </Form>
        </div>
    )
    
}

export default MakeOrder;