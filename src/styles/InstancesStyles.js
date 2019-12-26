let InstancesStyles = {
    instances: {
        width: 220,
        height: '100%',
        position: 'absolute',
        overflowY: 'scroll',
        marginLeft: 50,
        backgroundColor: 'rgba(39, 44, 50, 0.8)',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.6)',
        zIndex: 0
    },
    instancesPage: {
        backgroundImage: 'url(/assets/images/instances_bg.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    instanceItem: {
        width: '100%',
        height: 'auto',
        textAlign: 'center',
        marginTop: 20
    },
    selectedStyle: {
        width: '100%',
        height: 'auto',
        textAlign: 'center',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 5
    },
    createInstanceItem: {
        height: 80,
        backgroundColor: 'rgba(55, 62, 72, 0.8)',
        marginBottom: 20,
        borderRadius: '5%',
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    instanceListLogo: {
        width: 120,
        borderRadius: '10%',
        border: '2px solid #373e48'
    },
    selectedLogo: {
        width: 160,
        borderRadius: '10%',
        border: '4px solid #373e48'
    },
    blurredBackground: {
        backgroundColor: 'rgba(39, 44, 50, 0.5)',
        width: 'calc(100% - 50px)',
        position: 'absolute',
        height: '100%',
        zIndex: 1
    },
    createInstance: {
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: 300,
        height: 'auto',
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 5,
        backgroundColor: '#272C32',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.6)'
    },
    instancePage: {
        width: 'calc(100% - 270px)',
        marginLeft: 270,
        height: '100%'
    },
    //Instance Header
    instanceHeaderWrapper: {
        width: 600,
        paddingTop: 20,
        overflow: 'hidden'
    },
    instanceDesc: {
        float: 'left',
        height: 160,
        width: 400
    },
    logoWrapper: {
        width: 170,
        float: 'right'
    },
    instanceLogo: {
        width: 160,
        height: 160,
        borderRadius: '10%',
        border: '4px solid #373e48'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 18
    },
    options: {
        width: 300
    },
    optionsBtn: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 20,
        paddingLeft: 20,
        cursor: 'pointer',
        color: 'white',
        border: 'none',
        opacity: 0.9,
        width: 100,
        borderRadius: 2,
        marginRight: 10,
        ':hover': {
            opacity: 1
        }
    },
    //Instance Mods
    instanceMods: {
        width: 600,
        height: '50%',
        backgroundColor: 'rgba(39, 44, 50, 0.8)',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.6)',
        overflowY: 'scroll',
    },
    searchBar: {
        backgroundColor: '#272C32',
        color: 'white',
        border: 'none',
        width: '80%',
        marginTop: 10,
        fontSize: 16,
        padding: 6
    },
    inputFields: {
        width: '80%',
        padding: 10,
        outline: 'none',
        border: 'none',
        marginBottom: 10,
        backgroundColor: 'rgba(55, 62, 72, 0.8)',
        color: 'white'
    },
    select: {
        width: '40%',
        padding: 5,
        outline: 'none',
        border: 'none',
        marginBottom: 10,
        backgroundColor: 'rgba(55, 62, 72, 0.8)',
        color: 'white'
    },
    selectOptions: {
        backgroundColor: 'rgba(55, 62, 72, 1)',
        padding: 5,
        outline: 'none',
        border: 'none'
    }
};

module.exports = InstancesStyles;