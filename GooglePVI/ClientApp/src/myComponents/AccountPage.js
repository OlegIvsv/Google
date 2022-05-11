import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";
import AccountInfo from "./AccountInfo";
import SignUpForm from "./SignUpForm";
import { Redirect } from "react-router-dom";


//----------------------------------------

export default function AccountPage(props) {

    const currentAccountInfo = sessionStorage.getItem('currentAccountInfo');
 
    if(currentAccountInfo)
        return <AccountInfo/>;
    else
        return <Redirect to='/account-setting/sign-up'/>;
}