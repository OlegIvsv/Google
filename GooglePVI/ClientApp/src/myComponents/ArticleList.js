import {Card, Row, Col, Container} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

//----------------------------------------

export default function ArticlesList(props) {

    const [redirect, setRedirect] = useState(null);

    const clicked = (element) => {
        setRedirect(
            <Redirect to={`/article/${element.id}`}></Redirect>
        );
    }

    const buildElements = () => {
        console.log("Build list for :");
        console.log(props.items);
        return(
            <Row xs={1} md={2} className="g-4">
                {props.items.map(element => 
                    <Col>
                        <Card bg='dark' border='warning' text='warning'>
                            <Card.Body>
                                <Card.Title onClick={() => clicked(element)} class='text-center fst-italic fw-bolder fs-4'>{element.title}</Card.Title>
                                <Card.Text class='fst-italic'>{element.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        );
    }

    if(redirect)
        return redirect;
    else if(props.items.length === 0)
        return <h1>Empty</h1>
    return  <Container fluid='lg'>{buildElements()} </Container>;
}