import React from 'react';
import ReactDOM from 'react-dom';
import {withStyles, MuiThemeProvider, CssBaseline, List, ListItem, ListItemIcon, ListItemText, Drawer, Typography} from "@material-ui/core";
import {Menu, ArrowBackIos} from "@material-ui/icons";
import clsx from "clsx";
import {NavStyles} from './styles/NavStyles';
import {defaultTheme} from './styles/Theme'
import {renderNavigation} from "./utils/Navigation";
import {connect, Provider} from 'react-redux';
import Store from "./redux/Store";
import {setVersions} from "./redux/Actions";
import HomeScreen from "./screens/HomeScreen";
import {loadModpacks} from "./utils/ModpackUtils";
import {addPack} from './redux/Actions';

import {
    fabricMetaURL,
    forgeVersionsURL,
    getLoaderVersions,
    getMinecraftVersions,
    minecraftVersionsURL
} from "./utils/LoaderUtils";

class App extends React.Component {

    state = {
        sideNavOpen: false,
        activeScreen: 'Home',
        Screen: HomeScreen
    };

    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        loadModpacks().forEach(instance => this.props.addPack(instance));

        getMinecraftVersions(minecraftVersionsURL, false).then(versions => this.props.setVersions('vanilla', versions));
        getLoaderVersions(forgeVersionsURL).then(versions => this.props.setVersions('forge', versions));
        getLoaderVersions(fabricMetaURL + 'loader').then(versions => this.props.setVersions('fabric', versions));
    }

    toggleSideNav = () => {
        this.setState({sideNavOpen: !this.state.sideNavOpen})
    };

    navigate = (Screen, activeScreen) => {
        this.setState({Screen, activeScreen});
    };

    render() {
        let {sideNavOpen, activeScreen, Screen} = this.state;
        let {classes} = this.props;

        return (
            <MuiThemeProvider theme={defaultTheme.navTheme}>
                <CssBaseline />
                <Drawer
                    variant='permanent'
                    className={
                        clsx(classes.sideNav, {
                            [classes.sideNavOpen]: sideNavOpen,
                            [classes.sideNavClose]: !sideNavOpen
                        })
                    }
                    classes={{
                        paper: clsx({
                            [classes.sideNavOpen]: sideNavOpen,
                            [classes.sideNavClose]: !sideNavOpen
                        })
                    }}
                >
                    <List>
                        <ListItem button onClick={this.toggleSideNav}>
                            <ListItemIcon><Typography color='textSecondary'>{sideNavOpen ? <ArrowBackIos /> : <Menu />}</Typography></ListItemIcon>
                            <ListItemText><Typography color='textSecondary'>Close</Typography></ListItemText>
                        </ListItem>

                        {renderNavigation(this.navigate, activeScreen)}

                        <ListItem>
                            <ListItemIcon><img className={classes.logo} src='/assets/images/logo.png' alt='' /></ListItemIcon>
                            <ListItemText><Typography style={{fontWeight: 'bold'}}>Kraken Launcher</Typography></ListItemText>
                        </ListItem>
                    </List>
                </Drawer>

                <div className={clsx(classes.content, {[classes.contentShift]: sideNavOpen})}>
                    {Screen != null ? <Screen /> : 'Undefined Screen Error'}
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {loaders: state.loaders, instances: state.modpacks};
};

App = connect(mapStateToProps, {setVersions, addPack})(App);
App = withStyles(NavStyles)(App);
ReactDOM.render(<Provider store={Store}><App /></Provider>, document.getElementById('root'));