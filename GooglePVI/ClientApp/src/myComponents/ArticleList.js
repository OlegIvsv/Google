import {Card, Row, Col, Container} from "react-bootstrap";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//----------------------------------------

export default function ArticlesList(props) {

    const buildElements = () => {
        if(props.items && props.items.length === 0)
            return (
                <Container className="text-center text-primary mt-5">
                    <h1 className='fw-bold fst-italic'>Nothing ...</h1>
                </Container>
            );
        return(
            <Row xs={1} md={2} className="shadow py-4 px-5 rounded-3 g-3">
                {props.items.map(element => {

                    const content = element.content === 'null' ? '(Picture only)' :  (element.content.length > 70 ? (element.content.substr(0,70) + '...') : element.content);
                    const title = element.title.length > 30 ? ( element.title.substr(0,30) + '...') : element.title;
                    
                   return (<Col>
                        <Card bg='light' border='primary' text='primary' className='shadow'>
                            <Card.Header className='border-1 border-primary'>
                                <Card.Title  class='text-center fst-italic fw-bolder fs-4'>  
                                    <NavLink to={`articles/${element.id}`}>
                                        {title}
                                    </NavLink>
                                </Card.Title> 
                            </Card.Header>
                            <Card.Body>
                                <Card.Text class='fst-italic'>
                                    {content}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className='border-1 border-primary text-end'>
                                <small className="text-secondary fst-italic">{element.creationTime}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                   )
                }
                )}
            </Row>
        );
    }

    return <Container fluid='lg'>{buildElements()} </Container>;
}