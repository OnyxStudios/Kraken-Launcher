import React from 'react';
import Radium from 'radium';

const NavStyles = require('./../styles/NavStyles');

class SettingsScreen extends React.Component {

    render() {
        return(
            <div style={NavStyles.content}>
                <h1>Settings</h1>
            </div>
        );
    }
}

export default Radium(SettingsScreen);