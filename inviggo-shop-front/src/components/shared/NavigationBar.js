import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import StoreIcon from '@material-ui/icons/Store';
import AuthService from '../../services/Auth.service';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function NavigationBar() {

    const [user, setUser] = useState(null);

    const history = useHistory();

    const classes = useStyles();

    const logout = () => {
      AuthService.logout();
      setUser(null);
      history.push("/");
    }

    useEffect(() => {
      setUser(localStorage.getItem("username"));
    }, []);

    return(
        <AppBar position="fixed" className="mb-5" style={{'backgroundColor':'rgb(86,140,199)'}}>
            <Toolbar>
                <Link to={""} className="nav-brand text-white" style={{textDecoration: 'none'}}>
                  <StoreIcon className="mr-2"/>Home
                </Link>
                <Typography variant="h6" className={classes.title}>
                    Shopping Site
                </Typography>
                {
                  user === null ?
                  (<>
                    <Link to={"log-in"} className="nav-brand text-white" style={{textDecoration: 'none'}}>
                      <Button color="inherit" >Login</Button>
                    </Link>
                    <Link to={"sign-up"} className="nav-brand text-white" style={{textDecoration: 'none'}}>
                      <Button color="inherit" >Sign Up</Button>
                    </Link>
                  </>) : 
                  (<>
                    <p className="float-left mb-0 mr-5">{user}</p>
                    <Link to={"manage-advertisement"} className="nav-brand text-white" style={{textDecoration: 'none'}}>
                    <Button color="inherit" >Add Advertisement</Button>
                    </Link>
                    <Button onClick={logout} color="inherit" >Logout</Button>
                  </>)
                }
            </Toolbar>
        </AppBar>
    );
}