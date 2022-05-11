import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";


//----------------------------------------

export default function SearchLine(props) {

    const submited = (e) => {
        e.preventDefault();
        const handler = props.searchHandler;
        if(handler)
            handler(e.target['request'].value);
    }
   
    return (
        <Container className='mb-4 py-1'>
            <Form onSubmit={submited}>
            <Stack fluid direction="horizontal">
                <Form.Group class="container-lg">
                    <Form.Control class="w-75" type="text" name="request" className='shadow' placeholder="Search..." />
                </Form.Group>
                <Button variant="primary m-2" type="submit" className='shadow'>Search</Button>
            </Stack>
            </Form>
        </Container>
    );
}