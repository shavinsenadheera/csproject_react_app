import React from "react";
import { Route, Redirect } from 'react-router-dom';
import Auth from "./Auth";

function ProtectedRoutes({component:Component, ...rest}){
    return (
        <Route
            {...rest}
            render={props =>{
                if(localStorage.getItem('isLogged'))
                {
                    return <Component {...props} />;
                }
                else
                {
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state:{
                                from:props.location
                            }
                        }
                    } />;
                }
            }
        }>
        </Route>
    )
}

export default ProtectedRoutes