import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Drawer from '../components/utils/Drawer';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ItemList from '../components/PriceList/ItemList';
import AddItemDialog from '../components/PriceList/AddItemDialog';
import Loader from '../components/utils/Loader';
import { useHistory, useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";
import GroupList from '../components/PriceList/GroupList';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import api from '../globals/api';
import { DatePicker } from '@material-ui/pickers';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useSnackbar } from 'notistack';
import { formatNumber } from '../globals/NumberFormat';
import TableFooter from '@material-ui/core/TableFooter';

const ENDPOINT = "http://localhost:8080";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 20,
    },
    // receipt: {
    //     margin: 5
    // }
}));

const Turnovers = ({ data, ...rest }) => {
    const classes = useStyles();
    const history = useHistory();
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [result, setResult] = useState({ loading: true, data: [] });
    const [totalSum, setTotalSum] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    const goBack = () => {
        history.goBack();
    }

    const showReport = () => {
        setResult({ ...result, loading: false });
        api.request('GET', 'turnovers', {}, { queries: [`dateFrom=${dateFrom.toISOString()}`, `dateTo=${dateTo.toISOString()}`] })()
            .then(data => {
                setResult({ loading: false, data });
            }).catch(err => {
                enqueueSnackbar(err.message, { variant: 'error' });
            });
    }

    useEffect(() => {
        if(!result.loading){
            setTotalSum(result.data.reduce((prevSum, row) => prevSum += row.sum, 0));
        }
    }, [result])

    useEffect(() => {
        showReport();
    }, [])

    return <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} container justify="space-between">
            <Grid item xs container spacing={3} alignItems="center">
                <Grid item>
                    <DatePicker
                        label="Начална дата"
                        value={dateFrom}
                        onChange={setDateFrom}
                        id="dateFrom"
                        okLabel="OK"
                        format="dd.MM.yyyy"
                        autoOk
                        clearLabel="Изчити"
                        cancelLabel="Затвори" />
                </Grid>
                <Grid item>
                    <DatePicker
                        label="Крайна дата"
                        value={dateTo}
                        onChange={setDateTo}
                        okLabel="OK"
                        format="dd.MM.yyyy"
                        id="dateTo"
                        autoOk
                        clearLabel="Изчити"
                        cancelLabel="Затвори" />
                </Grid>
                <Grid item>
                    <Button color="primary" variant="outlined" onClick={showReport}>Изведи</Button>
                </Grid>
            </Grid>
            <Grid item>
                <Button color="secondary" variant="outlined" onClick={goBack}>Назад</Button>
            </Grid>
        </Grid>
        <Grid item xs={12} container component={Paper} justify="center">
            <Grid item>
                {result.loading && <Loader />}
            </Grid>
            <Grid item xs={12}>
                {!result.loading && <TableContainer>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell key="user" align="left" >Служител</TableCell>
                                <TableCell key="floor" align="left" >Помещение</TableCell>
                                <TableCell key="table" align="left" >Маса</TableCell>
                                <TableCell key="date" align="left" >Дата</TableCell>
                                <TableCell key="sum" align="right" >Сума</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {result.data.map((entry, i) => (
                                <TableRow key={i}>
                                    <TableCell key="user" align="left" >{entry.user.firstName} {entry.user.thirdName}</TableCell>
                                    <TableCell key="floor" align="left" >{entry.floor.name}</TableCell>
                                    <TableCell key="table" align="left" >{entry.table.name}</TableCell>
                                    <TableCell key="date" align="left" >{(new Date(entry.date)).toLocaleString()}</TableCell>
                                    <TableCell key="sum" align="right" >{formatNumber(entry.sum)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell><Typography fontWeight="fontWeightBold"> Общо:</Typography></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right"><Typography fontWeight="fontWeightBold">{formatNumber(totalSum)}</Typography></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>}
                {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={result.data.length}
                rowsPerPage={25}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}
            </Grid>
        </Grid>
    </Grid >
}

export default Turnovers;