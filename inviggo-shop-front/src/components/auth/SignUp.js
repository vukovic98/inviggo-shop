import React, {useState} from 'react';
import {Col, Form, Button} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/Auth.service';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function Register() {

    const [open, setOpen] = useState(false);

    const history = useHistory();

    const [openSuccess, setOpenSuccess] = useState(false);


    const formik = useFormik({
        initialValues: {
            phoneNumber: '',
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
            .required('Required'),
            phoneNumber: Yup.string()
            .required('Required'),
            username: Yup.string()
            .required('Required'),
        }),
        onSubmit: values => {
            AuthService.signup(values).then((res) => {
                console.log(res);
                setOpen(!res);
                setOpenSuccess(res);

                if(res) {
                    formik.resetForm();
                }
            })
        },
    });

    return(
        <div className="Signup" >
            <Button onClick={() => history.push("/")} style={{'backgroundColor':'rgb(86,140,199)', 'borderColor':'rgb(86,140,199)'}}  className="float-left ml-3">
                           {`<- Back`}
            </Button>
                <Form 
                    as={Col} 
                    className="col-md-4 mr-auto ml-auto mt-4 shadow-lg pl-5 pr-5 rounded pt-5 pb-4" 
                    style={{'backgroundColor':'rgb(245,247,248)'}}
                >
                        <h3 className="text-left mb-4">Create Your Account</h3>
                        <Form.Row  className="text-left">
                            <Form.Group as={Col}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                required
                                placeholder="Enter Username" 
                                id="username"
                                {...formik.getFieldProps('username')}
                            />
                            {formik.touched.username && formik.errors.username ? (
                                    <div style={{'color':'red'}}>*{formik.errors.username}</div>
                                ) : null}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="text-left">
                            <Form.Group as={Col}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Password" 
                                required
                                id="password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                    <div style={{'color':'red'}}>*{formik.errors.password}</div>
                                ) : null}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} className="text-left">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control 
                                type="text" 
                                required
                                placeholder="Enter Phone Number" 
                                id="phoneNumber"
                                {...formik.getFieldProps('phoneNumber')}
                                />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                    <div style={{'color':'red'}}>*{formik.errors.phoneNumber}</div>
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
                            Sign Up
                        </Button>
                </Form>
                <div className="mt-3 text-center">
                    <span style={{'color':'rgb(152,188,227)'}}>Have an account?   </span>
                    <Link to={'log-in'}><span className="text-blue">Sign In!</span></Link>
                </div>

                <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="error">
                        User with this username already exists!
                    </Alert>
                </Snackbar>

                <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
                    <Alert onClose={() => setOpenSuccess(false)} severity="success">
                        You successfully created account! You can now login!
                    </Alert>
                </Snackbar>
        </div>
    );
}