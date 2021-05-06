import React, { useState } from 'react';
import {Col, Form, Button} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/Auth.service';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import StoreIcon from '@material-ui/icons/Store';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function Login() {

    const [open, setOpen] = useState(false);

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
            .required('Required'),
            password: Yup.string()
            .required('Required')
        }),
        onSubmit: values => {
            AuthService.login(values).then((res) => {
                setOpen(!res);
                if(res) {
                    history.push('/');
                }
            })
        },
    });

    return(
        <div className="Login">
            <Button onClick={() => history.push("/")} style={{'backgroundColor':'rgb(86,140,199)', 'borderColor':'rgb(86,140,199)'}}  className="float-left ml-3">
                           {`<- Back`}
            </Button>
            <Form as={Col} className="col-md-4 mr-auto ml-auto mt-4 shadow-lg pl-5 pr-5 rounded pt-5 pb-4" style={{'backgroundColor':'rgb(245,247,248)'}}>
                <h3 className="text-left mb-4">Login</h3>
                        
                        <Form.Row  className="text-left">
                            <Form.Group as={Col}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    id="username"
                                    placeholder="Enter username" 
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
                                    id="password"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div style={{'color':'red'}}>*{formik.errors.password}</div>
                                ) : null}
                            </Form.Group>
                        </Form.Row>

                       

                        <Button onClick={formik.handleSubmit} type="submit" style={{'backgroundColor':'rgb(86,140,199)', 'borderColor':'rgb(86,140,199)'}} block  className="mt-4">
                            Sign In
                        </Button>
                </Form>
                <div className="mt-3 text-center">
                    <span style={{'color':'rgb(152,188,227)'}}>Don't have an account?   </span>
                    <Link to={'sign-up'}><span className="text-blue">Sign Up!</span></Link>
                </div>

                <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="error">
                        User with these credentials does not exist!
                    </Alert>
                </Snackbar>
        </div>
    );
}