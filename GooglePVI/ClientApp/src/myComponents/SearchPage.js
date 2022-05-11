import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";
import {Route} from 'react-router'; 
import {Redirect} from 'react-router';
import SearchLine from './SearchLine';
import ArticleList from './ArticleList';

//----------------------------------------

export default function SearchPage(props) {
    
    const [items, setItems] = useState([]);
    const [redirect, setRedirect] = useState(null);

    const formRequestLineForServer = (requestLine) =>{
        console.log("Form line with : " + requestLine);
        return (
            String(requestLine)
            .split(" ")
            .filter(w => w !== "")
            .join("+")
            );
    };

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

    const selectOne = (id) => {
        setRedirect(
            <Redirect to={`/articles/${id}`}></Redirect>
        );
    };

    useEffect(() => {console.log('rendered sp');})

    return redirect ? redirect : (
        <Container fluid='true' className="mx-auto">
            <SearchLine searchHandler={runSearch}/>
            <ArticleList items={items} selectOne={selectOne}/>
        </Container>
    );
}