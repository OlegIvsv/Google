import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";


//----------------------------------------

export default function LogInForm(props) {

    const [redirectOn, setRedirectOn] = useState(false);

    const authorizeAccount = async (login, password) =>{
        const responce = await fetch(`api/accounts/authorization/${login}/${password}`);
        const jsonRes = await responce.json();

        const dataToStore = {
            password: jsonRes.password, 
            id: jsonRes.id, 
            name: jsonRes.name, 
            email: jsonRes.email,
            isAdmin: jsonRes.isAdmin
        };
        sessionStorage.setItem('currentAccountInfo',JSON.stringify(dataToStore));
        
        console.log(responce.status);
        return responce.status < 300;
    };

    const saveAccount = async (e) => {
        e.preventDefault();
        const password = e.target['password'].value;
        const login = e.target['login'].value;
       

        if(await authorizeAccount(login, password))
            setRedirectOn(true);
        else
            alert('Wrong data!');
    };

    return redirectOn ? <Redirect to='/accountsetting' /> : ( 
        <Row className="justify-content-center bg-dark text-warning">
            <Col class="mx-auto text-warning bg-dark" xs={11} md={5}>
                <div class="text-center lead">
                    <h1>Welcome!</h1>
                    <p>Register a new account or log in!</p>
                </div>
                <Stack class="mx-auto">
                    <Form onSubmit={(e) => saveAccount(e)}>
                       
                        <Form.Label for="login" class="form-label">Login : </Form.Label>
                        <Form.Control id="email" name='login' placeholder="name as login"/>

                        <Form.Label for="password" class="form-label">Why are you keen on chess?</Form.Label>
                        <Form.Control type='password' name='password' placeholder="password"/>

                        <Form.Group class="text-center my-3">
                            <Button type="submit" name="submit" variant="outline-warning">Submit</Button>
                        </Form.Group>
                    </Form>
                </Stack>
            </Col>
        </Row> 
    );
}