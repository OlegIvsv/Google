import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom';

//----------------------------------------

export default function SignUpForm(props) {

    const [redirectOn, setRedirectOn] = useState(false);

    var currentAccountIsAdmin = false;
    var currentAccountInfo = sessionStorage.getItem('currnetAccountInfo');
    if(currentAccountInfo){
        currentAccountInfo = JSON.parse(currentAccountInfo);
        currentAccountIsAdmin = currentAccountInfo.isAdmin;
    }
   
    const goToLogIn = () => {
        console.log('Redirect to log-in');
        setRedirectOn(true);
    }

    return redirectOn ? <Redirect to='/log-in' /> : (
        <Row className="justify-content-center bg-dark text-warning">
            <Col class="mx-auto text-warning bg-dark" xs={11} md={5}>
                <div class="text-center lead">
                    <h1>Welcome!</h1>
                    <p>Register a new account or log in!</p>
                </div>
                <Stack class="mx-auto">
                    <Form>
                        <Row class="d-flex justify-content-between my-3">
                            <Col>
                                <Form.Label for="name" class="form-label">Full Name : </Form.Label>
                                <Form.Control type="text" placeholder="firstname + lastname" name="name"/>
                            </Col>
                            {currentAccountIsAdmin &&
                            <Col className='d-flex align-items-end justify-content-end me-3'>
                                <Form.Check label='Admin status' name="isAdmin" class="w-25 form-check-inline" value="true"/>
                            </Col>}
                        </Row>
                        
                        <Form.Label for="email" class="form-label">Email : </Form.Label>
                        <Form.Control id="email" name='email' placeholder="example@gmail.com"/>

                        <Form.Label for="password" class="form-label">Why are you keen on chess?</Form.Label>
                        <Form.Control type='password' name='password' placeholder="password"/>

                        <Form.Group class="text-center my-3">
                            <Button type="submit" name="submit" variant="outline-warning">Submit</Button>
                        </Form.Group>
                        <Form.Group class="text-center my-3">
                            <Button onClick={() => goToLogIn()} type='button' name="logIn" variant="outline-warning">LogIn</Button>
                        </Form.Group>
                    </Form>
                </Stack>
            </Col>
        </Row> 
    );
}