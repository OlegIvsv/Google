import { useEffect, useState } from "react";
import { Col, Container, Row, Stack, Form, Button, FormGroup } from "react-bootstrap";

//----------------------------------------

export default function AddForm(props){

    // async function sendData(e){

    //     e.preventDefault();
    //     const userData = formData(e.target);
    //     console.log(userData);
    //     const param = {
    //         method: 'POST',
    //         headers : {'Content-Type': 'application/json'},
    //         body: JSON.stringify(userData)
    //     };

    //     const response = await fetch('api/articles', param);
    //     const answer = await response.text();
    // }

    // function formData(form){
    //     const formData = new FormData(form);
    //     const title = formData.get("title");
    //     const content = formData.get("content");
    //     const picture = formData.get("picture");
       
    //     return { title, content, picture };
    // }

    const [userIsAdmin, setUserIsAdmin] = useState(false);

    const checkIfAdmin = () => {
        const accountInfo = checkAccountInfo();
        setUserIsAdmin(accountInfo ? accountInfo.isAdmin : false);
    }

    const checkAccountInfo = () => {
        const currentAccountInfo = sessionStorage.getItem('currentAccountInfo');
        if(!currentAccountInfo)
            return null;
        return JSON.parse(currentAccountInfo);
    }

    useEffect(() => checkIfAdmin(), []);

    console.log('rend');
    return !userIsAdmin ? <h1>Admins only are allowed to post something. Sorry.</h1> : (
        <Row className="justify-content-center bg-dark text-warning">
            <Col class="mx-auto text-warning bg-dark" xs={11} md={5}>
                <div class="text-center lead">
                    <h1>You can enter your data here!</h1>
                </div>
                <Stack class="mx-auto">
                    <Form encType="multipart/form-data" action="api/articles" method="post"> 
                        <Form.Label for="title" className="form-label">Title : </Form.Label>
                        <Form.Control type="text" placeholder="title" name="title"/>
                        
                        <Form.Label for="picture" className="form-label">Picture :  </Form.Label>
                        <Form.Control type="file" size="sm" placeholder="choose picture" accept=".png" name="picture"/>

                        <Form.Label for="content" className="form-label">Content : </Form.Label>
                        <Form.Control as='textarea' name='content' placeholder="It's because ..." rows="10"/>

                        <Form.Group class="text-center my-3">
                            <Button type="submit" name="submit" variant="outline-warning">Submit</Button>
                        </Form.Group>
                    </Form>
                </Stack>
            </Col>
        </Row> 
    );
}