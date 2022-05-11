import { useEffect, useState } from "react";
import { Col, Container, Row, Stack, Form, Button, FormGroup } from "react-bootstrap";

//----------------------------------------

export default function AddForm(props){

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

    const sentData = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const picture = formData.get('picture');
        const content = formData.get('content');
        if(content === '' && picture.size === 0){
            alert('The article is empty. It\'s not allowed!' );
            return;
        }
        if(content === '')
            formData.set('content', null);
        if(picture.size === 0)
            formData.set('picture', null);

        console.log('content : ' + content + "  picture length : " + picture.length);
        const resp = await fetch('api/articles', {
            method: 'POST',
            body: formData,
        });
        console.log(resp.body.getReader().read());
    }

    useEffect(() => checkIfAdmin(), []);

    return !userIsAdmin ? 
    <h2 className='text-primary fst-italic fw-bold mx-auto text-center mt-5'>
        <i>Admins only are allowed to post something. Sorry.</i>
    </h2> 
    : (
        <Row className="justify-content-center bg-light text-primary shadow">
            <Col class="mx-auto text-warning bg-dark" xs={11} md={5}>
                <div class="text-center lead fst-italic">
                    <h1>You can enter your data here!</h1>
                </div>
                <Stack class="mx-auto">
                   <Form onSubmit={(e) => sentData(e)} encType="multipart/form-data">
                        <Form.Label for="title" className="form-label">Title : </Form.Label>
                        <Form.Control type="text" placeholder="title" name="title" pattern="\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*"/>
                        
                        <Form.Label for="picture" className="form-label">Picture :  </Form.Label>
                        <Form.Control type="file" size="sm" placeholder="choose picture" accept=".png" name="picture"/>

                        <Form.Label for="content" className="form-label">Content : </Form.Label>
                        <Form.Control as='textarea' name='content' placeholder="La...la...la...." rows="12"/>

                        <Form.Group class="text-center my-3">
                            <Button type="submit" name="submit" variant="outline-primary" className='shadow'>Submit</Button>
                        </Form.Group>
                    </Form>
                </Stack>
            </Col>
        </Row> 
    );
}