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
import { useSelector, useDispatch } from 'react-redux';
import { setMenuAction, addMenuAction } from '../store/actions';

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
    const [menuPath, setMenuPath] = useState([]);
    const [menu, setMenu] = useState({ children: [], path: ',root,' });
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();
    const socket = socketIOClient(ENDPOINT);
    const globalMenu = useSelector(state => state.menu);
    const dispatch = useDispatch();
    const setGlobalMenu = (obj) => dispatch(setMenuAction(obj));
    const addGlobalMenu = (item) => dispatch(addMenuAction(item));

    const handleClick = (e) => {
        setOpen(true);
    }

    const findMenuPath = (path) => {
        try {
            setMenuPath([...path]);
            let newMenu = globalMenu;

            for (let i = 0; i < path.length; i++) {
                newMenu = newMenu.children[path[i]];
            }

            setLoading(false);
            setMenu({ ...newMenu });
        } catch (e) {
            history.push('/pricelist');
        }
    }

    useEffect(() => {
        //Не използва кашираната информация за менюто. Всеки път прави гет заявката на /pricelist
        if ((!location.state || !location.state.path)) {
            setLoading(true);
            fetch('/api/menus')
                .then(res => res.json())
                .then(data => {
                    setMenuPath([]);
                    setGlobalMenu(data);
                    setLoading(false);
                });
        } else {
            findMenuPath(location.state.path);
        } 
        console.log(location.state);
    }, [location.pathname]);

    const openGroup = (i) => (e) => {
        history.push({
            pathname: `${location.pathname}/${i}`,
            state: {
                path: [...menuPath, i],
            }
        })
    }

    useEffect(() => {
        socket.on('add:menu', (result) => {
            addGlobalMenu(result.data);
        });
        return () => {
            socket.disconnect();
            socket.close();
        } 
    }, []);

    useEffect(() => {
        findMenuPath(menuPath);
    }, [globalMenu]);

    return <Drawer options={<Grid container className={classes.menu}>
        <Grid container justify="space-evenly">
            <Grid item style={{ padding: '10px' }}>
                <Button color="primary" onClick={handleClick} endIcon={<AddIcon />}>Добави</Button>
            </Grid>
            {loading &&
                <Grid container justify="center" direction="row">
                    <Loader />
                </Grid>}
            {/* На следващия ред не трябва да има .filter() преди .map , защото се използва истинската позиция на избраното меню за рендериране! */}
            {!loading && menu.children.map((element, i) => element.type === 'group' ? <Button fullWidth onClick={openGroup(i)}>{`${element.name}`}</Button> : null)}
        </Grid>

    </Grid >} title="Меню">
        {menu.path}
        <Grid container justify="center" direction="row">
            {!loading &&
                <ItemList data={menu.children.filter(element => element.type === 'product')} actions={[{ function: () => { }, text: <AddIcon /> }]} />
            }

        </Grid>

        <AddItemDialog open={open} setOpen={setOpen} path={menu.path} />
    </Drawer>
}

export default PosMenu;