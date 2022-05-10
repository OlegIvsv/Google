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
        if(props.items && props.items.length === 0)
            return (
                <Container className="text-center text-primary mt-5">
                    <h1 className='fw-bold fst-italic'>Nothing ...</h1>
                </Container>
            );
        return(
            <Row xs={1} md={2} className="g-4">
                {props.items.map(element => 
                    <Col>
                        <Card bg='light' border='primary' text='primary'>
                            <Card.Header className='border-1 border-primary'>
                                <Card.Title onClick={() => clicked(element)} class='text-center fst-italic fw-bolder fs-4'>  
                                    {element.title}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text class='fst-italic'>{element.content}</Card.Text>
                            </Card.Body>
                            <Card.Footer className='border-1 border-primary text-end'>
                                <small className="text-secondary fst-italic">{element.creationTime}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                )}
            </Row>
        );
    }

    if(redirect)
        return redirect;
    return  <Container fluid='lg'>{buildElements()} </Container>;
}