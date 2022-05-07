import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";
import AccountInfo from "./AccountInfo";
import SignUpForm from "./SignUpForm";


//----------------------------------------

export default function AccountPage(props) {

    var element = null;
    const currentAccountInfo = sessionStorage.getItem('currentAccountInfo');
    console.log(currentAccountInfo);
    if(currentAccountInfo)
        element = <AccountInfo/>;
    else
        element = <SignUpForm/>;
   
    return element;
}