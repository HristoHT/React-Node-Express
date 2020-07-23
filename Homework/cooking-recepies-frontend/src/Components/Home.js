import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import InfoIcon from '@material-ui/icons/Info';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        // backgroundColor: 'green',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    link: {
        textDecoration: 'none'
    }
}));

const MainView = ({ children, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ padding: 20 }}>
            <Grid container style={{ backgroundColor: "blue", }}>
                <Grid item xs={2} lg={1}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <IconButton>
                                <ExitToAppIcon style={{ color: "white" }} />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <ListItem button key="Вход" to={'/login'}>
                                <ListItemIcon> <SearchIcon /> </ListItemIcon>
                                <ListItemText primary={"Вход"} />
                            </ListItem>
                            <ListItem button key="Регитрация" to={'/register'}>
                                <ListItemIcon> <SearchIcon /> </ListItemIcon>
                                <ListItemText primary={"Регистрация"} />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button key="CarInfo">
                                <ListItemIcon> <InfoIcon /> </ListItemIcon>
                                <ListItemText primary={"За колата"} />
                            </ListItem>
                            <ListItem button key="AddPart" to={'/addpart'}>
                                <ListItemIcon> <AddBoxIcon /> </ListItemIcon>
                                <ListItemText primary={"Добави част"} />
                            </ListItem>
                            <ListItem button key="История на колата">
                                <ListItemIcon> <HistoryOutlinedIcon /> </ListItemIcon>
                                <ListItemText primary={"История на колата"} />
                            </ListItem>
                        </List>
                    </Drawer>
                </Grid>
                <Grid item xs={10} lg={11} style={{ backgroundColor: "red" }}>
                    <main className={classes.content} >
                        <div className={classes.toolbar} />
                        {children}
                    </main>
                </Grid>
            </Grid>
        </div>
    );
}

export default MainView;
