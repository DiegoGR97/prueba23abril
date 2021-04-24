import { fade, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    list: {
        paddingLeft: 0,
        paddingBottom: "3em",
        width: "500px"
    },
    buttonNav: {
        position: "relative",
        minWidth: "20%",
        minHeight: "3em"
    },
    toDoList: {
        position: "absolute",
        top: "5%",
        left: "0px",
        width: "500px",
        height: "405px",
        right: "0px",
        margin: "0px auto",
    },
    addTaskDiv: {
        marginTop: "1em",
        marginBottom: "1em"
    },
    addTaskText: {
        marginRight: "1em",

    },
    multilineColor:{
        borderRadius: theme.shape.borderRadius,
        borderColor: 'red',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        color: 'inherit',

    },

    //CSS tomado de https://material-ui.com/es/components/app-bar/
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        marginTop: "2em",
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    //CSS tomado de https://material-ui.com/es/components/app-bar/

    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },

}));
