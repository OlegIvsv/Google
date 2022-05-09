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

        console.log(jsonRes.map(i => i.id));

        return jsonRes;
    };

    const runSearch = async (requestLine) => {
        console.log("Run search with : " + requestLine);
        if(/\s/.test(requestLine)){
            console.log("Empty line");
            setItems([]);
            return;
        }
        setItems( await getItems(requestLine));
    };



    return (
        <Stack direction="vertical" class="mx-auto">
            <SearchLine searchHandler={runSearch}/>
            <ArticleList items={items}/>
        </Stack>
    );
}