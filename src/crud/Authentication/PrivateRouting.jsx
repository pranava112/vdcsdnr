import React from 'react'
import Login from './Login';

const PrivateRouting = (props) => {

    // console.log(props);

    let token=localStorage.getItem("TOKEN");
    // console.log(token);
    
    if(token){
        ///if some logged in
        return props.children ;
    }else{
        return<Login/>
    }

    
  
}

export default PrivateRouting
