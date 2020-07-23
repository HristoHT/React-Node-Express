import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Drawer from '../components/utils/Drawer';
import Paper from '@material-ui/core/Paper';
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

const ENDPOINT = "http://localhost:8080";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 10,
    },
    // receipt: {
    //     margin: 5
    // }
}));

const PosMenu = ({ data, ...rest }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [path, setPath] = useState('root');
    const [path2, setPath2] = useState('root');
    const [menu, setMenu] = useState({ children: [] });
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();
    const socket = socketIOClient(ENDPOINT);

    const handleClick = (e) => {
        setOpen(true);
    }

    useEffect(() => {
        if (location.state) {
            setPath(location.state.parent);
            setPath2(path2 + ':' + location.state.parent);
        } else {
            setPath('root');
            setPath2('root');
        }
    }, [location.pathname]);

    useEffect(() => {
        setLoading(true);
        api.request('GET', 'menus', {}, { queries: [`query=${path}`] })()
            .then(data => {
                setMenu(data);
                setLoading(false);
            }).catch((e) => {
                history.push({
                    pathname: `/pricelist`
                })
            });
    }, [path])

    useEffect(() => {
        socket.on('add:menu', (result) => {
            //alert('Should update! (' + result.parent + ' <-> ' + path + ')');
            console.log(JSON.stringify(result));
            if (result.parent === path) {
                setMenu(result);
            }
        });
        return () => {
            socket.disconnect();
            socket.close();
        }
    }, []);

    const goBack = () => {
        history.goBack();
    }

    const openGroup = (i, index) => (e) => {
        history.push({
            pathname: `${location.pathname}/${i}`,
            state: {
                parent: index,
            }
        })
    }

    return <Drawer options={<Grid container className={classes.menu}>
        <Grid container justify="space-evenly">
            <Grid item style={{ padding: '10px' }}>
                <Button color="primary" onClick={handleClick} endIcon={<AddIcon />}>Добави</Button>
            </Grid>
            <Grid item style={{ padding: '10px' }}>
                <Button color="primary" onClick={goBack} endIcon={<ArrowBackIosIcon />}>Назад</Button>
            </Grid>
            {loading &&

                <Grid container justify="center" direction="row">
                    <Loader />
                </Grid>}
            {!loading &&
                <Grid item xs={12} container justify="center">
                    <Typography variant="h6">{menu.name}</Typography>
                </Grid>}
            {!loading && <GroupList data={menu.children.filter(el => el.type === 'group')} openGroup={openGroup} />}
        </Grid>

    </Grid >} title="Меню">
        <Grid container justify="center" direction="row">
            {!loading &&
                <ItemList data={menu.children.filter(element => element.type === 'product')} actions={[{ function: () => { }, text: <AddIcon /> }]} />
            }

        </Grid>

        <AddItemDialog open={open} setOpen={setOpen} parent={path} path={path2} element={null} />
    </Drawer>
}

export default PosMenu;