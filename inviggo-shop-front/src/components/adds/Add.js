import React from 'react';
import {Card, Button} from 'react-bootstrap';

export default function Add({add}) {
    return(
        <Card>
            <Card.Body>
                <Card.Img variant="top" className="col-md-2 float-left" src={add.imageUrl} style={{height: "220px", width: "220px"}}/>
                <div className="col-md-10 text-left">
                    <Card.Title>{add.name}</Card.Title>
                    <Card.Text>
                        {add.description}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </div>
            </Card.Body>
        </Card>
    );
}