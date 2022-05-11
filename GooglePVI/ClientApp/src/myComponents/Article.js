import {Container} from "react-bootstrap";
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
        const prom = await fetch(`api/articles/picture/${id}`);
        if(prom.status === 400){
            setUrl(null);
            return;
        }
        const blobRes = await prom.blob();
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
        <Container className="justify-content-center bg-light mx-auto text-primary mb-5 rounded-3 shadow">
            <h2 className="ms-5 pt-4 mb-4 fst-italic fw-normal">{article ? article.title : '. . .'}</h2>
            <hr/>
            <p className="py-2 fst-italic">
                {article ? article.content : '. . .'}
            </p>
            <hr/>
            <div className="mx-auto text-center article-photo">
                {url && <img thumbnail rounded src={url} className="circle img-fluid rounded-3 shadow"/>}
            </div>
            <hr/>
            <div className="text-center text-secondary py-2">
                <small className='fst-italic fw-bold'>{article ? article.creationTime : '. . .'}</small>
            </div>
        </Container>
    );
}