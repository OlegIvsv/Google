import {Card, Row, Col, Container} from "react-bootstrap";
import { useEffect, useState } from "react";

//----------------------------------------

export default function ArticlesList() {

    const [data, setData] = useState(null);

    const getData = async () => {
        const param = { method: 'GET'} 
        const responce = await fetch('http://127.0.0.1:8000/userdata', param);
        const jsonRes = await responce.json();
        console.log(jsonRes);
        setData(jsonRes);
    }

    useEffect(() => {getData()}, []);

    const buildElements = () => {
        return(
            <Row xs={1} md={2} className="g-4">
                {data.map(element => 
                    <Col>
                        <Card bg='dark' border='warning' text='warning'>
                            <Card.Body>
                                <Card.Title class='text-center fst-italic fw-bolder fs-4'>{element.name}</Card.Title>
                                <Card.Subtitle class='text-center small border-bottom border-warning mb-1'>
                                    {element.age} years old | experience : {(element.experience == 5 ? 'more than 5' : element.experience)} years 
                                </Card.Subtitle>
                                <Card.Text class='fst-italic'>{element.issue}</Card.Text>
                                <Card.Footer class="text-center fw-bolder small">{element.created_at.slice(0, 10)}</Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        );
    }

    return(
        <Container fluid='lg'>
            {data ?
            buildElements() :
            (<Card>
                <Card.Body>
                    <Card.Title>Hold on a second ...</Card.Title>
                </Card.Body>
            </Card>)
            }
        </Container>
    );
}