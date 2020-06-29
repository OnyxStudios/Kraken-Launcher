let boxShadowProp = '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.6)';

let HomeStyles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'space-around',
        padding: '15px 25px',
        overflowX: 'hidden',
        overflowY: 'scroll',
        flexWrap: 'wrap'
    },
    mainContent: {
        width: '75%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
        [theme.breakpoints.between(0, 841)]: {
            width: '100%',
            height: 'auto'
        },
        [theme.breakpoints.up('md')]: {
            width: '78%'
        },
        [theme.breakpoints.up('lg')]: {
            width: '85%'
        }
    },
    news: {
        width: '100%',
        height: '70%',
        boxShadow: boxShadowProp,
        backgroundColor: theme.palette.background.paper,
        overflowX: 'hidden',
        overflowY: 'scroll',
        borderRadius: 5,
        padding: 10,
        [theme.breakpoints.up('md')]: {
            height: '60%'
        }
    },
    links: {
        width: '100%',
        height: 180,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 30,
        [theme.breakpoints.between(0, 641)]: {
            height: 400,
            alignItems: 'space-between'
        }
    },
    link: {
        width: 180,
        height: 100,
        borderRadius: 8,
        backgroundColor: theme.palette.background.paper,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: boxShadowProp,
        animation: 'growItems 1s',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }
    },
    featuredPacks: {
        width: 172,
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.between(0, 841)]: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '100%',
            height: 172,
            marginBottom: 20
        }
    },
    pack: {
        backgroundSize: 'cover',
        width: 172,
        height: 172,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'flex-end',
        animation: 'growItems 1s'
    },
    marginPack: {
        backgroundSize: 'cover',
        width: 172,
        height: 172,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'flex-end',
        animation: 'growItems 1s',
        [theme.breakpoints.up(840)]: {
            marginTop: 40,
            marginBottom: 40
        }
    },
    installBtn: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        cursor: 'pointer',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.light,
        border: 'none',
        opacity: 0.9,
        width: '100%',
        borderRadius: 2,
        margin: '0 auto',
        fontWeight: 'bold',
        '&:hover': {
            opacity: 1
        }
    }
});

export {HomeStyles};