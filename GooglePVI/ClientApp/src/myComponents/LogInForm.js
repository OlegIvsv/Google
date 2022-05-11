import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";


//----------------------------------------

export default function LogInForm(props) {

    const [redirect, setRedirect] = useState(null);

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
            setRedirect(<Redirect to='/account-setting' />);
        else
            alert('Wrong data!');
    };

    const goToSignUp = () => {
        setRedirect(<Redirect to='/account-setting/sign-up' />);
    }
    return redirect ? redirect : ( 
        <Row className="justify-content-center bg-light rounded-3 text-primary py-5 mt-2 shadow">
            <Col className="mx-auto p-5" xs={11} md={5}>
                <div className="text-center lead">
                    <h1>Welcome!</h1>
                    <p>Register a new account or log in!</p>
                </div>
                <Stack class="mx-auto">
                    <Form onSubmit={(e) => saveAccount(e)}>
                       
                        <Form.Label for="login" class="form-label">Login : </Form.Label>
                        <Form.Control id="email" name='login' placeholder="name as login"/>

                        <Form.Label for="password" class="form-label">Password :</Form.Label>
                        <Form.Control type='password' minLength={4} maxLength={12} name='password' placeholder="password"/>

                        <Form.Group class="text-center my-3">
                            <Button type="submit" name="submit" className='shadow' variant="outline-primary">Submit</Button>
                        </Form.Group>
                        <Form.Group class="text-center my-3">
                            <Button size='sm' className="shadow" onClick={() => goToSignUp()} type='button' name="logIn" variant="outline-primary">SignUp</Button>
                        </Form.Group>
                    </Form>
                </Stack>
            </Col>
        </Row> 
    );
}