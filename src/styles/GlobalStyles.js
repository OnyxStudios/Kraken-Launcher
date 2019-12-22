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
    }
};

module.exports = GlobalStyles;