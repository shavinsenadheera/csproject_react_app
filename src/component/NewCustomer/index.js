import React, {useState} from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Success from './Success';
import Failed from './Failed';

function NewCustomer(){
    const welcomeContainerStyles = {
        background: "#EAEAEA",
        borderRadius:  16
    };
    const [ step, setStep ] = useState(1);
    const [ data, setData ] = useState({
        "name": "",
        "industry": "",
        "email": "",
        "contactNo": "",
        "message": ""
    });
    const [ successPageData, setSuccessPageData ] = useState({
        "message": ""
    });
    const [ failedPageData, setFailedPageData ] = useState({
        "message": ""
    });
    const renderSteps = () => {
        switch(step){
            case 1:
                return (
                    <Step1
                        nextStep={setStep}
                        setData={setData}
                        data={data}
                    />
                )
            case 2:
                return (
                    <Step2 
                        nextStep={setStep}
                        setData={setData}
                        data={data}
                        setSuccessPageData={setSuccessPageData}
                        setFailedPageData={setFailedPageData}
                    />
                )
            case 3:
                 return (
                    <Success
                        successPageData={successPageData}
                    />
                 )
            case 4:
                return (
                    <Failed 
                        failedPageData={failedPageData}
                    />
                )        
            default:    
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 offset-xl-3 offset-lg-3 mt-5 py-3 px-5" style={ welcomeContainerStyles}>
                    {renderSteps()}
                </div>
            </div>
        </div>    
    )   
}

export default NewCustomer;