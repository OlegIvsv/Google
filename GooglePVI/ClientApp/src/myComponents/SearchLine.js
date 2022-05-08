import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";


//----------------------------------------

export default function CommunityPosts(props) {

    const submited = (e) => {
        e.preventDefault();
        const handler = props.searchHandler;
        if(handler)
            handler(e.target['request'].value);
    }
   
    return (
        <Container>
            <Form onSubmit={submited}>
            <Stack fluid direction="horizontal">
                <Form.Group class="container-lg">
                    <Form.Control class="w-75" type="text" name="request" placeholder="Search..." />
                </Form.Group>
                <Button variant="primary m-2" type="submit">Search</Button>
            </Stack>
            </Form>
        </Container>
    );
}