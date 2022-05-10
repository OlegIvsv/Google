import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom';

//----------------------------------------

export default function SignUpForm(props) {

    const [redirectOn, setRedirectOn] = useState(false);

    const checkIfAdmin = () => {

        var currentAccountIsAdmin = false;
        var currentAccountInfo = sessionStorage.getItem('currentAccountInfo');
        if(currentAccountInfo){
            currentAccountInfo = JSON.parse(currentAccountInfo);
            currentAccountIsAdmin = currentAccountInfo.isAdmin;
        }
        return currentAccountIsAdmin;
    }
   
    const goToLogIn = () => {
        setRedirectOn(true);
    }

    const currentIsAdmin = checkIfAdmin();

    return redirectOn ? <Redirect to='/log-in' /> : (
        <Row className="justify-content-center bg-light shadow text-primary">
            <Col class="mx-auto text-warning bg-dark" xs={11} md={5}>
                <div class="text-center lead">
                    <h1>Welcome!</h1>
                    <p>Register a new account or log in!</p>
                </div>
                <Stack class="mx-auto">
                    <Form action="api/accounts" method="post">
                        <Form.Label for="name" class="form-label">Full Name : </Form.Label>
                        <Form.Control type="text" placeholder="firstname + lastname" name="name"/>
                        
                        <Form.Label for="email" class="form-label">Email : </Form.Label>
                        <Form.Control id="email" name='email' placeholder="example@gmail.com"/>

                        <Form.Label for="password" class="form-label">Why are you keen on chess?</Form.Label>
                        <Form.Control type='password' name='password' placeholder="password"/>

                        <Form.Check label='Admin status' name="isAdmin" className="form-check-inline mt-3 mx-0" value="false"/>

                        <Form.Group class="text-center my-3">
                            <Button type="submit" name="submit" className="shadow" variant="outline-primary">Submit</Button>
                        </Form.Group>
                        <Form.Group class="text-center my-3">
                            <Button size='sm' className="shadow" onClick={() => goToLogIn()} type='button' name="logIn" variant="outline-primary">LogIn</Button>
                        </Form.Group>
                    </Form>
                </Stack>
            </Col>
        </Row> 
    );
}