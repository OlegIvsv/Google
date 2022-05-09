import {Modal, Form, Col, Row, Stack, ListGroup, Button} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./AdditionalStyles.css";
import { useParams } from "react-router-dom";


//----------------------------------------

export default function Article(props) {

    const [article, setArticle] = useState(null);
    const [url, setUrl] = useState(""); 
    const articleId = useParams().id;

    const getPicture = async (id) => {
        console.log("ID - " + id);
        const prom = await fetch(`api/articles/picture/${id}`);
        if(prom.status === 400){
            console.log('4  0  0 --- id = ' + articleId);
            setUrl(null);
            return;
        }
        const blobRes = await prom.blob();
        console.log(blobRes);
        const url = await URL.createObjectURL(blobRes);
        setUrl(url);
    };

    const getArticle = async (id) => {
        const resp = await fetch(`api/articles/${id}`);
        const data = await resp.json();
        setArticle(data);
    };

    useEffect(() => {
        getPicture(articleId); 
        getArticle(articleId);
    }, []);

    return (
        <Row className="justify-content-center bg-dark text-warning">
            <Col class="mx-auto text-warning bg-dark" xs={11} md={5}>
                <p>{article ? article.title : <h2>. . .</h2>}</p>
                <p>{article ? article.content : <h2>. . .</h2>}</p>
                <div className="mx-auto text-center overflow-hidden btn">
                    {url && <img thumbnail rounded src={url} className="circle img-fluid"/>}
                </div>
            </Col>
        </Row>
    );
}