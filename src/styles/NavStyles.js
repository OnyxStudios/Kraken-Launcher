let NavStyles = {
    content: {
        backgroundColor: '#373E48',
        overflowWrap: 'break-word',
        width: 'calc(100% - 50px)',
        height: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
        marginLeft: 50
    },
    sideNav: {
        backgroundColor: '#272C32',
        position: 'fixed',
        height: '100%',
        width: 50,
        top: 30,
        left: 0,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.6)'
    },
    noPaddingLink: {
        textDecoration: 'none',
        display: 'block',
        transition: 0.3
    },
    link: {
        textDecoration: 'none',
        display: 'block',
        transition: 0.3,
        paddingTop: 20
    },
    bottomLink: {
        position: 'fixed',
        textDecoration: 'none',
        display: 'block',
        transition: 0.3,
        bottom: 8,
        left: 14,
    },
    logo: {
        display: 'block',
        transition: 0.3,
        paddingTop: 12,
        width: 32,
        height: 32
    },
    divider: {
        border: '2px solid #008DFF'
    },
    icon: {
        color: '#8A8F9D',
        fontSize: 22
    },
    active: {
        color: ' white !important'
    }
};

module.exports = NavStyles;