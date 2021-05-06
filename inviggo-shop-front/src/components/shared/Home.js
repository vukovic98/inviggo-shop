import React, {useEffect, useState} from 'react';
import {Jumbotron, Col} from 'react-bootstrap';
import AddService from '../../services/Adds.service';
import AuthService from '../../services/Auth.service';
import Pagination from '@material-ui/lab/Pagination';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Filter from './Filter';
import NavigationBar from './NavigationBar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function Home() {

    const [open, setOpen] = useState(false);
    const [filterMode, setFilterMode] = useState(false);
    const [filterDto, setFilterDto] = useState({});

    const [page, setPage] = useState(1);
    const [filterPage, setFilterPage] = useState(2);
    const [adds, setAdds] = useState([]);
    const [total, setTotal] = useState(0);



    const loadAdds = () => {
        AddService.loadAdds(page-1).then((res) => {
            if(res == null) {
                console.log("NO");
            } else {
                setAdds(res.content);
                setTotal(res.totalPages);
            }
        })
    }

    const loadFilterAdds = () => {
        AddService.filterAdds(page-1, filterDto).then((res) => {
            if(res) {
                setAdds(res.content);
                setTotal(res.totalPages);
            } else {
                setAdds([]);
                setTotal(0);
            }
        })
    }

    const deleteAdd = (id) => {
        AddService.deleteAdd(id).then((res) => {
            if(res){
                setOpen(true);
                loadAdds();
            } else {
                console.log("error");
            }
        })
    }

    const handleChange = (event, value) => {
        setPage(value);  
    }

    const onFilter = (data) => {
        setFilterMode(true);
        setPage(1);
        setFilterDto(data);
    }

    useEffect(() => {
        console.log("OVDE");
        if(filterMode) {
            loadFilterAdds();
        } else
            loadAdds();
    }, [page, filterDto]); 

    // useEffect(() => {
    //     loadFilterAdds();
    // }, [filterDto]);

    return(
        <div className="homePage pr-0 mr-0 row">
            <NavigationBar/>
            <div className="col-md-1 float-left"></div>
            <Jumbotron as={Col} className="col-md-10 float-left pt-3 bg-white mt-5">
                <div className="mt-3 mb-3 text-center pt-3 pb-3">
                    <Filter onFilter={onFilter}/>
                </div>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>City</th>
                            <th>Category</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adds.length !== 0 ? adds.map((add) => {
                                return <tr key={add.id}>
                                    <td><img src={add.imageUrl} className="rounded-circle" style={{height: "120px", width: "120px"}}/></td>
                                    <td className="align-middle">{add.name}</td>
                                    <td className="align-middle">{add.price} €</td>
                                    <td className="align-middle">{add.city}</td>
                                    <td className="align-middle">{add.category}</td>
                                    {AuthService.getLoggedUser() === add.user.username ? <td colSpan="2" className="p-auto align-middle">
                                        <button className="w-100 btn btn-info">Edit</button>
                                        <button className="w-100 btn btn-danger mt-3" onClick={() => deleteAdd(add.id)}>Delete</button>
                                    </td> : <td colSpan="2"></td>}
                                </tr>
                            }) : <tr><td colSpan="7" className="align-middle">No adds</td></tr>
                        }
                    </tbody>
                </table>
                <div className="text-center col-md-5 m-auto">
                    <Pagination count={total} className="m-auto" page={page} onChange={handleChange} showFirstButton showLastButton/>
                </div>
            </Jumbotron>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="success">
                        Advertisement successfully deleted!
                    </Alert>
            </Snackbar>
            <div className="col-md-1 float-left"></div>
        </div>
    );
}