import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom';
import SearchLine from './SearchLine';
import ArticleList from './ArticleList';

//----------------------------------------

export default function SearchPage(props) {
    
    const [items, setItems] = useState([]);

    const formRequestLineForServer = (requestLine) =>{
        console.log("Form line with : " + requestLine);
        return (
            String(requestLine)
            .split(" ")
            .filter(w => w !== "")
            .join("+")
            );
    }

    const getItems = async (requestLine) =>{
        console.log("Get items with : " + requestLine);
        const requestLineForServer = formRequestLineForServer(requestLine); 
        const responce = await fetch(`api/articles/find/${requestLineForServer}`);
        const jsonRes = await responce.json();
        return jsonRes;
    };

    const runSearch = async (requestLine) => {
        if(requestLine === '' ||  /\s/.test(requestLine)){
            console.log("HERE");
            setItems([]);
            return;
        }
        setItems( await getItems(requestLine));
    };



    return (
        <Container fluid='true' className="mx-auto">
            <SearchLine searchHandler={runSearch}/>
            <ArticleList items={items}/>
        </Container>
    );
}