import {Figure, Col, Row, Stack, ListGroup, Button} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./AdditionalStyles.css";


//----------------------------------------

const defaultPictureUrl = 'https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar.png';

export default function AccountInfo(props) {
    
    const [url, setUrl] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const checkAccountInfo = () => {
        const currentAccountInfo = sessionStorage.getItem('currentAccountInfo');
        if(!currentAccountInfo)
            return null;
        return JSON.parse(currentAccountInfo);
    }

    async function getPicture(accountId){

        if(accountId <= 0)
            setUrl(defaultPictureUrl);
        const prom = await fetch(`api/accounts/picture/${accountId}`);
        const blobRes = await prom.blob();
        if(blobRes.type === ""){
            setUrl("");
            return;
        }
        const url = await URL.createObjectURL(blobRes);
        setUrl(url);
    }

    const logOut = () =>{
        sessionStorage.removeItem("currentAccountInfo");
        setRedirect(true);
    }

    const accountInfo = checkAccountInfo();
    useEffect(() => { getPicture(accountInfo.id); }, []);

    return redirect ? <Redirect to='/accountsetting' /> : (
        <Row className="justify-content-center bg-dark text-warning">
            <Col class="mx-auto text-warning bg-dark" xs={11} md={5}>
                <div class="text-center lead">
                    <h1>Welcome!</h1>
                    <p>Your account</p>
                </div>
                <Stack class="mx-auto">
                        <div className=" mx-auto text-center overflow-hidden profile-img-container">
                            {url && <img thumbnail rounded src={url} className="circle img-fluid"/>}
                        </div>
                    <ListGroup>
                        <ListGroup.Item>User : {accountInfo.name}</ListGroup.Item>
                        <ListGroup.Item>Email : {accountInfo.email}</ListGroup.Item>
                        <ListGroup.Item>Status : {accountInfo.isAdmin ? 'Admin' : 'Just user' }</ListGroup.Item>
                    </ListGroup>
                    <Button variant="danger" onClick={() => logOut()}>Log out</Button>
                </Stack>
            </Col>
        </Row> 
    );
}