import React, {useEffect, useState} from 'react';
import { Col, Jumbotron, Form, Button } from 'react-bootstrap';
import NavigationBar from '../shared/NavigationBar';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddService from '../../services/Adds.service';
import { useParams } from 'react-router';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function ManageAdvertisement() {

    let {id} = useParams();

    const [add, setAdd] = useState({});

    useEffect(() => {
        if(id && !isNaN(id)) {
            AddService.fetchAdvertisement(id).then((res) => {
                setAdd(res);
            })
        } else {
            setAdd({});
        }
    }, [id]);

    const [open, setOpen] = useState(false);


    const formik = useFormik({
        initialValues: {
            id: add.id || null,
            name: add.name || '',
            description: add.description || '',
            imageUrl: add.imageUrl || '',
            price: add.price || '',
            category: add.category || '',
            city: add.city || ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .required('Required'),
            description: Yup.string()
            .required('Required')
            .max(100),
            imageUrl: Yup.string()
            .required('Required'),
            price: Yup.number()
            .required('Required'),
            category: Yup.string()
            .required('Required'),
            city: Yup.string()
            .required('Required'),
        }),
        onSubmit: values => {
            if(!add) {
                AddService.addAdvertisement(values).then((res) => {
                    if(res) {
                        setOpen(true);
                        formik.resetForm();
                    }
                });
            } else {
                AddService.editAdvertisement(values).then((res) => {
                    if(res) {
                        setOpen(true);
                    }
                });
            }
        },
        enableReinitialize: true
    });

    return(
        <div className="addAddvertisement pr-0 mr-0 row">
            <NavigationBar/>
            <div className="col-md-2 float-left"></div>
                <Jumbotron as={Col} className="col-md-8 float-left pt-3 mt-5 bg-white">
                <Form 
                    as={Col} 
                    className="mt-5"
                >
                        <h3 className="text-center mb-4">{!isNaN(id) ? "Edit Your Add" : "Create Your Add"}</h3>
                        <Form.Row  className="text-left">
                            <Form.Group as={Col}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                required
                                placeholder="Enter Name" 
                                id="name"
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                    <div style={{'color':'red'}}>*{formik.errors.name}</div>
                                ) : null}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="text-left">
                            <Form.Group as={Col}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea"
                                placeholder="Enter Description" 
                                required
                                id="description"
                                style={{'resize': 'none'}}
                                {...formik.getFieldProps('description')}
                            />
                            {formik.touched.description && formik.errors.description ? (
                                    <div style={{'color':'red'}}>*{formik.errors.description}</div>
                                ) : null}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} className="text-left">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control 
                                type="text" 
                                required
                                placeholder="Enter Image URL" 
                                id="imageUrl"
                                {...formik.getFieldProps('imageUrl')}
                                />
                            {formik.touched.imageUrl && formik.errors.imageUrl ? (
                                    <div style={{'color':'red'}}>*{formik.errors.imageUrl}</div>
                                ) : null}
                            </Form.Group>
                          
                        </Form.Row>

                        <Form.Row>
                        <Form.Group as={Col} className="text-left">
                            <Form.Label>Category</Form.Label>
                            <Form.Control 
                                as="select" 
                                required
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
                            {formik.touched.category && formik.errors.category ? (
                                    <div style={{'color':'red'}}>*{formik.errors.category}</div>
                                ) : null}
                            </Form.Group>
                        <Form.Group as={Col} className="text-left">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                required
                                placeholder="Enter Price" 
                                id="price"
                                {...formik.getFieldProps('price')}
                                />
                            {formik.touched.price && formik.errors.price ? (
                                    <div style={{'color':'red'}}>*{formik.errors.price}</div>
                                ) : null}
                            </Form.Group>
                          
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} className="text-left">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                type="text" 
                                required
                                placeholder="Enter City" 
                                id="city"
                                {...formik.getFieldProps('city')}
                                />
                            {formik.touched.city && formik.errors.city ? (
                                    <div style={{'color':'red'}}>*{formik.errors.city}</div>
                                ) : null}
                            </Form.Group>
                          
                        </Form.Row>
                        
                        <Button 
                            style={{'backgroundColor':'rgb(86,140,199)', 'borderColor':'rgb(86,140,199)'}} 
                            size="lg" 
                            type="submit"
                            onClick={formik.handleSubmit} 
                            className="mt-3"
                            block 
                        >
                            Submit Add
                        </Button>
                </Form>
                <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="success">
                        {add ? "Advertisement successfully edited!":"Advertisement successfully added!"}
                    </Alert>
                </Snackbar>
                </Jumbotron>
                <div className="col-md-2 float-right"></div>
        </div>
    )
}