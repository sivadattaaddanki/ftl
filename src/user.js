import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import { TextField } from '@material-ui/core';
// import {classes} from '@material-ui';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

export class User extends React.Component {



    state = {
        selectedUser: '',
        errorMessage:'',
        modalOpen: false,
        dataCheck:false,
        calenderdate: moment().format('YYYY-MM-DD'),
        data: {
            "ok": true,
            "members": [{
                "id": "W012A3CDE",
                "real_name": "Egon Spengler",
                "tz": "America/Los_Angeles",
                "activity_periods": [{
                    "start_time": "Feb 1 2020  1:33PM",
                    "end_time": "Feb 1 2020 1:54PM"
                },
                {
                    "start_time": "Mar 1 2020  11:11AM",
                    "end_time": "Mar 1 2020 2:00PM"
                },
                {
                    "start_time": "Mar 1 2020  2:00AM",
                    "end_time": "Mar 1 2020 3:00PM"
                },
                {
                    "start_time": "Mar 16 2020  5:33PM",
                    "end_time": "Mar 16 2020 8:02PM"
                }
                ]
            },
            {
                "id": "W07QCRPA4",
                "real_name": "Glinda Southgood",
                "tz": "Asia/Kolkata",
                "activity_periods": [{
                    "start_time": "Feb 1 2020  2:30PM",
                    "end_time": "Feb 1 2020 2:14PM"
                },
                {
                    "start_time": "Mar 1 2020  19:11AM",
                    "end_time": "Mar 1 2020 5:00PM"
                },
                {
                    "start_time": "Mar 16 2020  2:33PM",
                    "end_time": "Mar 16 2020 1:02PM"
                }
                ]
            }
            ]
        }
    };

    selectedDataArray=(date)=>{
        let array=[];
        if(this.state.selectedUser&&this.state.selectedUser.activity_periods){
            this.state.selectedUser.activity_periods.map((activity)=>{
                if(moment(activity.start_time, 'MMM D YYYY, h:mm a').format('YYYY-MM-DD') == date){
                    array.push(activity)
                }
            })
        }
        // if(array.length==0)this.setState({errorMessage:"No Data"})
        return array;
    }

    render() {
        const { data, selectedUser, modalOpen, calenderdate,dataCheck } = this.state;
        var arrayData=this.selectedDataArray(calenderdate);
        var errorMessage=arrayData.length>0?'':'No Data , Choose Another Date';
        const body = (
            <TableBody>
                {
                    arrayData && arrayData.length > 0 &&
                    arrayData.map((activity) => {
                            // if(!dataCheck){this.setState({errorMessage:"true"})};
                            return (
                                <TableRow><TableCell align="center">{moment(activity.start_time, 'MMM D YYYY, h:mm a').format('h:mm a')}</TableCell>
                                    <TableCell align="center">{moment(activity.end_time, 'MMM D YYYY, h:mm a').format('h:mm a')}</TableCell></TableRow>
                            )
                    })      
                }
           
            </TableBody>
        );
        // console.log(data);
        return (

            <React.Fragment>
                <div className="col-sm-8 offset-sm-2" >

                
                <TableContainer  component={Paper}>
                    <Table aria-label="simple table" className="table-hover" >
                        <TableHead >
                            <TableRow className="bg-dark ">
                                <TableCell className="text-light" align="center">ID</TableCell>
                                <TableCell className="text-light" align="center">Name</TableCell>
                                <TableCell className="text-light" align="center">Time Zone</TableCell>
                                <TableCell className="text-light" align="center">Number of activities</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.members.map((row) => (
                                <TableRow hover key={row.name}
                                    style={{ cursor: 'pointer', }}
                                    onClick={() => {
                                        console.log(row);
                                        this.setState({ calenderdate:moment().format('YYYY-MM-DD'),selectedUser: row, modalOpen: true })
                                    }}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.real_name}</TableCell>
                                    <TableCell align="center">{row.tz}</TableCell>
                                    <TableCell align="center">{row.activity_periods.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
                
                <div className="col-sm-7">
                <Dialog fullWidth='true' maxWidth='sm' onClose={() => { this.setState({ modalOpen: false }) }} aria-labelledby="simple-dialog-title" open={modalOpen}>
                    <DialogTitle className="text-center" id="simple-dialog-title">View Activity</DialogTitle>
                    <div className='row'>
                        <div className="col-sm-4 offset-sm-4">

                       
                        <form  noValidate>
                            <TextField
                                fullWidth="true"
                                id="date"
                                label="Choose Date"
                                type="date"
                                defaultValue={moment().format('YYYY-MM-DD')}
                                placeholder="Please select date to check activity"
                                onChange={(event)=>{this.setState({calenderdate:event.target.value })}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">In Time</TableCell>
                                    <TableCell align="center">Out Time</TableCell>
                                </TableRow>
                            </TableHead>

                            {body}
                        </Table>
                            
                    </TableContainer>
                            <div className="col-sm-6 offset-sm-3" >
                            <span className="center text-danger">{errorMessage}</span>
                            </div>
                        

                </Dialog>

                </div>
            </React.Fragment>
        );
    };
}


