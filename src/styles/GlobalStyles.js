let GlobalStyles = {
    contextMenu: {
        backgroundColor: '#18191C',
        position: 'absolute',
        width: 'auto',
        height: 'auto',
        maxWidth: 160,
        padding: 10,
        zIndex: 100,
        borderRadius: 5
    },
    contextItem: {
        cursor: 'pointer',
        color: 'white',
        backgroundColor: 'transparent',
        border: 'none',
        display: 'block',
        width: '100%',
        textAlign: 'left',
        marginBottom: 5,
        padding: 8,
        fontSize: 15,
        alignItems: 'center',
        borderRadius: 2,
        ':hover': {
            backgroundColor: '#2c2e33'
        }
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
    }
};

module.exports = GlobalStyles;