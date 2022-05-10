import {Modal, Form, Col, Row, Stack, ListGroup, Button} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./AdditionalStyles.css";


//----------------------------------------

const defaultPictureUrl = 'https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar.png';

export default function AccountInfo(props) {
    const [show, setShow] = useState(false);
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

    const postPicture = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const resp = await fetch(`api/accounts/picture/${accountInfo.id}`,{
            method: 'POST',
            body: formData
        });
        setShow(false);
    }

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const accountInfo = checkAccountInfo();
    useEffect(() => { getPicture(accountInfo.id); }, []);

    return redirect ? <Redirect to='/accountsetting' /> : (
        <Row className="justify-content-center bg-light shadow text-primary">
            <Col class="mx-auto text-warning bg-dark" xs={11} md={5}>
                <div class="text-center lead">
                    <h1>Welcome!</h1>
                    <p>Your account</p>
                </div>
                <Stack class="mx-auto">
                    <div className="shadow mx-auto text-center overflow-hidden btn profile-img-container" onClick={handleShow}>
                        {url && <img thumbnail rounded src={url} className="circle img-fluid"/>}
                    </div>
                    <ListGroup className='mt-3 mb-5 shadow'>
                        <ListGroup.Item className="bg-light border-1 border-info">
                            <i className='fw-bold fst-italic text-primary'>Name : </i>{accountInfo.name}
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-light border-1 border-info">
                            <i className='fw-bold fst-italic text-primary'>Email : </i>{accountInfo.email}
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-light border-1 border-info">
                            <i className='fw-bold fst-italic text-primary'>Status : </i>{accountInfo.isAdmin ? 'Admin' : 'Just user' }
                        </ListGroup.Item>
                        <Button variant="outline-danger" onClick={() => logOut()}>Log out</Button>
                    </ListGroup>
                </Stack>
            </Col>

            {/*   M O D A L   T O   U P D A T E   P I C T U R E   */}

            <Modal show={show} onHide={handleClose} className='text-primary'>
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bolder fst-italic'>Update picture ? ? ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={postPicture}>
                        <Form.Label for="picture" className="form-label">Picture :  </Form.Label>
                        <Form.Control type="file" size="sm" placeholder="choose picture" accept=".png" name="picture"/>
                        <Button variant="primary" className='mt-2' type="submit" size="sm">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row> 
    );
}