import React from 'react';
import {useHistory} from "react-router-dom";
import ThankYouForRegister from '../../resources/img/thankYouForRegister.png';

function Success(props){
    const { successPageData } = props;
    const history = useHistory();
    const backToHome = () => {
        history.push('/');
    };

    return (
        <div>
            <div className="my-5 text-center">
                <img src={ThankYouForRegister} alt="ThankYou"/>
                <p className="text-primary font-weight-bold mt-3">Thank you for request to us!</p>
                <p className="text-primary font-weight-bold">Our Customer Service Coordinator will contact you soon!</p>
                <button className="btn btn-warning" onClick={backToHome}>Back To Home</button>
            </div>
        </div>
    )
}

export default Success;