import React from 'react';
import {useHistory} from "react-router-dom";
import SomethingWrong from '../../resources/img/somethingWrong.png';

function Failed(props){
    const { failedPageData } = props;
    const history = useHistory();
    const backToHome = () => {
        history.push('/');
    };
    return (
        <div>
            <div className="my-5 text-center">
                <img src={SomethingWrong} alt="Something Wrong"/>
                <p className="text-danger font-weight-bold mt-3">Something getting wrong!</p>
                <p className="text-danger font-weight-bold">{failedPageData}</p>
                <button className="btn btn-warning" onClick={backToHome}>Back To Home</button>
            </div>
        </div>
    )
}

export default Failed;