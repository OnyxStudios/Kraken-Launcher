let HomeStyles = {
    mainContent: {
        width: 'calc(100% - 275px)',
        height: 'calc(100% - 55px)',
        float: 'left',
        marginLeft: 25,
        marginTop: 30
    },
    featuredContent: {
        marginLeft: 25,
        width: 200,
        height: 'calc(100% - 55px)',
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        float: 'right',
        marginRight: 25
    },
    news: {
        width: '100%',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.6)',
        backgroundColor: 'rgba(39, 44, 50, 0.8)',
        height: 'calc(100% - 230px)',
        overflowX: 'hidden',
        overflowY: 'scroll',
        borderRadius: 5,
        textAlign: 'center'
    },
    links: {
        height: 200,
        width: '100%',
        marginTop: 25
    },
    link: {
        width: 'calc(50% - 12.5px)',
        height: '100%',
        borderRadius: 5,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        ':hover': {
            cursor: 'pointer'
        }
    },
    featuredPack: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.6)'
    },
    trendingTitle: {
        width: 200,
        fontSize: 22,
        fontWeight: 'bold'
    },
    issuesTitle: {
        fontSize: 50,
        fontWeight: 'bold',
        textShadow: '2px 2px 10px black'
    }
};

module.exports = HomeStyles;