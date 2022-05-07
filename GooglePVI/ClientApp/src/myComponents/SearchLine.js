import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";


//----------------------------------------

export default function CommunityPosts() {

   
    return (
        <Container>
            <Form>
            <Stack fluid direction="horizontal">
                <Form.Group class="container-lg">
                    <Form.Control class="" type="text" placeholder="Search..." />
                </Form.Group>
                <Button variant="primary m-2" type="submit">Search</Button>
            </Stack>
            </Form>
        </Container>
    );
}