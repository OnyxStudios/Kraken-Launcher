let instanceContainerWidth = 180;
let instanceHeaderHeight = 50;
let instanceLogoSize = instanceContainerWidth - 60;
let selectMinWidth = 120;

let InstancesStyles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        overflowY: 'auto',
        flexWrap: 'wrap'
    },
    instancesContainer: {
        width: instanceContainerWidth,
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: theme.palette.background.paper,
        paddingTop: 10,
        paddingBottom: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    instancePage: {
        width: `calc(100% - ${instanceContainerWidth}px)`,
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    //TODO MAYBE REMOVE ANIMATION??????
    instancePageAnimation: {
        width: `calc(100% - ${instanceContainerWidth}px)`,
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        //animation: '1s ease-out 0s 1 slideIn',
        //zIndex: -1
    },
    instanceItem: {
        width: instanceLogoSize,
        height: instanceLogoSize,
        transition: 'all .2s ease-in-out',
        animation: 'growItems .75s',
        '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer'
        }
    },
    selectedInstance: {
        width: instanceLogoSize,
        height: instanceLogoSize,
        transform: 'scale(1.05)',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    createInstanceItem: {
        width: instanceLogoSize + 20,
        height: instanceContainerWidth / 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        marginTop: 30,
        transition: 'all .2s ease-in-out',
        animation: 'growItems .75s',
        '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer'
        }
    },
    instanceContainer: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        flexWrap: 'wrap'
    },
    instanceBorder: {
        borderRadius: 8,
        border: 'double 8px transparent',
        backgroundColor: theme.palette.background.default,
        transition: 'all .4s ease-out'
    },
    instanceHeader: {
        width: '100%',
        height: instanceHeaderHeight,
        minHeight: instanceHeaderHeight,
        backgroundColor: theme.palette.background.paper,//theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    instanceBody: {
        width: '100%',
        height: 'auto',
        padding: 20
    },
    instanceMods: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    playBtn: {
        height: '75%',
        backgroundColor: '#1fc25d',
        borderRadius: 2,
        marginRight: 15,
        boxShadow: '0 3px 5px 2px rgba(30, 227, 105, .05)',
        animation: 'growItems .75s'
    },
    moreBtn: {
        minWidth: 'auto',
        height: '75%',
        backgroundColor: '#FE6B8B',
        borderRadius: 2,
        marginRight: 15,
        animation: 'growItems .75s'
    },
    pageLogo: {
        width: instanceLogoSize,
        height: instanceLogoSize,
        float: 'left',
        borderRadius: 8,
        marginRight: 10,
        animation: 'growItems .75s'
    },
    errorText: {
        color: theme.palette.error.main
    },
    successText: {
        color: theme.palette.success.main
    },
    contextMenu: {
        '& .MuiMenu-paper': {
            backgroundColor: theme.palette.primary.dark
        }
    },
    createInstanceDialog: {
        backgroundColor: theme.palette.background.default
    },
    select: {
        minWidth: selectMinWidth
    }
});

export {InstancesStyles};