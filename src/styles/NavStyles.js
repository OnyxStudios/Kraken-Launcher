let sideNavWidth = 240;

let NavStyles = theme => ({
    body: {
        width: '100%',
        height: '100%'
    },
    content: {
        width: `calc(100% - ${theme.spacing(7) + 1}px)`,
        height: '100%',
        flexGrow: 0,
        marginLeft: theme.spacing(7) + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    contentShift: {
        width: `calc(100% - ${sideNavWidth}px)`,
        height: '100%',
        flexGrow: 0,
        marginLeft: sideNavWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        })
    },
    sideNav: {
        width: sideNavWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    sideNavOpen: {
        width: sideNavWidth,
        height: '100%',
        overflow: 'hidden',
        position: 'fixed',
        paddingTop: 22,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    sideNavClose: {
        width: theme.spacing(7) + 1,
        height: '100%',
        overflow: 'hidden',
        position: 'fixed',
        paddingTop: 22,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1
        },
    },
    logo: {
        height: sideNavWidth * 0.1
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        ...theme.mixins.toolbar,
        justifyContent: 'center'
    }
});

export {NavStyles};