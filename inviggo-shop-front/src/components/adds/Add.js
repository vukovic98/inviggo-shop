import React, { useEffect, useState } from 'react';
import {Card, Button, Jumbotron, Col} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import AddService from '../../services/Adds.service';
import AuthService from '../../services/Auth.service';
import NavigationBar from '../shared/NavigationBar';

export default function Add() {

    const {id} = useParams();
    const history = useHistory();

    const [add, setAdd] = useState(null);

    useEffect(() => {
        AddService.fetchAdvertisement(id).then((res) => {
            setAdd(res);
        })
    }, [id]);

    const deleteAdd = (id) => {
        AddService.deleteAdd(id).then((res) => {
            if(res){
                history.push("/");
            } else {
                console.log("error");
            }
        })
    }

    const handleBack = () => {
        history.push("/");
    }

    return(
        <div className="homePage pr-0 mr-0 row">
            <NavigationBar/>
            <div className="col-md-1 float-left"></div>
            <Jumbotron as={Col} className="col-md-10 float-left pt-3 bg-white mt-5">
                {add !== null ? 
                <Card className="col-md-10 ml-auto mr-auto mt-5">
                    <Card.Body className="col-md-12 float-left">
                    <Button onClick={handleBack} style={{'backgroundColor':'rgb(86,140,199)', 'borderColor':'rgb(86,140,199)'}} className="col-md-1">
                        {`<- Back`}
                        </Button>

                        <Card.Img variant="top" src={add.imageUrl} className="col-md-5 float-left"/>
                        <div className="col-md-6 float-left text-left">
                            <Card.Title className="text-center">{add.name}</Card.Title>
                            <Card.Text className="mt-5"><b><i>Date published:</i></b> {add.date}</Card.Text>
                            <Card.Text><b><i>City:</i></b> {add.city}</Card.Text>
                            <Card.Text><b><i>Category:</i></b> {add.category}</Card.Text>
                            <Card.Text><b><i>Price:</i></b> {add.price} €</Card.Text>
                            <Card.Text><b><i>Seller:</i></b> {add.user.username} , <b><i>phone No.</i></b> {add.user.phoneNumber}</Card.Text>
                            <Card.Text className="mt-3"><b><i>Description of product:</i></b> {add.description}</Card.Text>
                            {AuthService.getLoggedUser() === add.user.username ? <div className="text-right">
                                <Button variant="info" onClick={() => history.push("/manage-advertisement/" + add.id)} >Edit</Button>
                                <Button variant="danger" className="ml-3" onClick={() => deleteAdd(add.id)}>Delete</Button>
                            </div>: null}
                        </div>
                    </Card.Body>
                </Card> 
                : 
                <p>Loading...</p>}
            </Jumbotron>
            <div className="col-md-1 float-right"></div>
        </div>
    );
}