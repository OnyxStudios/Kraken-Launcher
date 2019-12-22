import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './redux/Store';

import HomeScreen from './screens/HomeScreen';
import InstancesScreen from './screens/InstancesScreen';
import CursePacksScreen from './screens/CursePacksScreen';
import SettingsScreen from './screens/SettingsScreen';

const NavStyles = require('./styles/NavStyles');
const StorageUtils = require('./utils/StorageUtils');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    render() {
        return (
            <BrowserRouter>
                <div style={NavStyles.sideNav}>
                    <center>
                        <img style={NavStyles.logo} src='/assets/images/logo.png' alt='' />
                        <hr style={NavStyles.divider} />

                        <span style={NavStyles.noPaddingLink}><NavLink activeStyle={NavStyles.active} style={NavStyles.icon} exact to='/'><i className='material-icons'>home</i></NavLink></span>
                        <span style={NavStyles.link}><NavLink activeStyle={NavStyles.active} style={NavStyles.icon} to='/instances'><i className='material-icons'>create_new_folder</i></NavLink></span>
                        <span style={NavStyles.link}><NavLink activeStyle={NavStyles.active} style={NavStyles.icon} to='/cursepacks'><i className='material-icons'>view_list</i></NavLink></span>
                        <span style={NavStyles.bottomLink}><NavLink activeStyle={NavStyles.active} style={NavStyles.icon} to='/settings'><i className='material-icons'>settings</i></NavLink></span>
                    </center>
                </div>

                <Switch>
                    <Route path='/' exact component={HomeScreen}/>
                    <Route path='/instances' component={InstancesScreen}/>
                    <Route path='/cursepacks' component={CursePacksScreen}/>
                    <Route path='/settings' component={SettingsScreen}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

App = Radium(App);
ReactDOM.render(<Provider store={Store}><App /></Provider>, document.getElementById('root'));