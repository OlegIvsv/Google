import {Card, Row, Col, Container} from "react-bootstrap";
import { useEffect, useState } from "react";

//----------------------------------------

export default function ArticlesList(props) {

    const buildElements = () => {
        console.log("Build list for :");
        console.log(props.items);
        return(
            <Row xs={1} md={2} className="g-4">
                {props.items.map(element => 
                    <Col>
                        <Card bg='dark' border='warning' text='warning'>
                            <Card.Body>
                                <Card.Title class='text-center fst-italic fw-bolder fs-4'>{element.title}</Card.Title>
                                <Card.Text class='fst-italic'>{element.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        );
    }

    return props.items.length === 0 ? <h1>Empty</h1> : (
        <Container fluid='lg'>
            {buildElements()}
        </Container>
    );
}