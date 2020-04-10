let instanceContainerWidth = 180;

let InstancesStyles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        overflowY: 'scroll',
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
    instanceItem: {
        width: instanceContainerWidth - 40,
        height: instanceContainerWidth - 40,
        transition: 'all .2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer'
        }
    },
    selectedInstance: {
        width: instanceContainerWidth - 40,
        height: instanceContainerWidth - 40,
        transform: 'scale(1.05)',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    createInstanceItem: {
        width: instanceContainerWidth - 40,
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
        backgroundImage: 'linear-gradient(transparent, transparent), linear-gradient(21deg, #10abff, #1beabd)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        transition: 'all .4s ease-out'
    }
});

export {InstancesStyles};