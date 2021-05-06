import React from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/Auth.service';
import { deprecatedPropType } from '@material-ui/core';

export default function Filter ({onFilter}) {

    const formik = useFormik({
        initialValues: {
            name: '',
            minPrice: '',
            maxPrice: '',
            category: '',
            myAdds: false
        },
        validationSchema: Yup.object({
            name: Yup.string(),
            minPrice: Yup.number(),
            maxPrice: Yup.number(),
            category: Yup.string(),
            myAdds: Yup.boolean()
        }),
        onSubmit: values => {
            let dto = {...values};

            if(dto.minPrice === "") dto.minPrice = -1;
            if(dto.maxPrice === "") dto.maxPrice = -1;
            if(dto.name === "") dto.name = null;
            if(dto.category === "") dto.category = null;
            console.log(dto);
            onFilter(dto);
        },
    });

    return (
        <>
            <Form className="col-md-8 m-auto">
                <Row>
                    <Col>
                        <Form.Control 
                            type="text"
                            id="name"
                            placeholder="Enter Name" 
                            {...formik.getFieldProps('name')}
                        />
                    </Col>
                </Row>
                <Row className="mt-2 pl-0 pr-0">
                    <Col>
                        <Form.Control 
                            placeholder="Min price" 
                            type="number" 
                            id="minPrice"
                            {...formik.getFieldProps('minPrice')}
                        />
                    </Col>
                    <Col>
                        <Form.Control 
                            placeholder="Max price" 
                            type="number" 
                            id="maxPrice"
                            {...formik.getFieldProps('maxPrice')}
                        />
                    </Col>
                </Row>

                <Row className="mt-2 pl-0 pr-0">
                    <Col>
                    <Form.Control 
                        as="select"
                        id="category"
                        {...formik.getFieldProps('category')}
                    >
                        <option defaultValue value="">Select category</option>
                        <option>CLOTHING</option>
                        <option>TOOLS</option>
                        <option>SPORTS</option>
                        <option>ACCESSORIES</option>
                        <option>FURNITURE</option>
                        <option>PETS</option>
                        <option>GAMES</option>
                        <option>BOOKS</option>
                        <option>TECHNOLOGY</option>
                    </Form.Control>
                    </Col>
                    <Col>
                        {   AuthService.getToken() !== null ?
                            <Form.Group className="align-middle">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Only My Adds" 
                                    id="myAdds"
                                    {...formik.getFieldProps('myAdds')}
                                />
                            </Form.Group> : null}
                    </Col>
                    <Col>
                        <Button style={{'backgroundColor':'rgb(86,140,199)', 'borderColor':'rgb(86,140,199)'}} className="btn-block" onClick={formik.handleSubmit} type="submit">Filter</Button>
                    </Col>
                </Row>
            </Form>
        </>
        );
}