import { Row, Col, Container, Form, FormGroup, Button, Stack} from "react-bootstrap";
import { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom';
import SearchLine from './SearchLine';

//----------------------------------------

export default function SearchPage(props) {
    
    return (
        <Stack direction="vertical" class="mx-auto">
            <SearchLine requestHandler=/>
            <ArticleList />
        </Stack>
    );
}