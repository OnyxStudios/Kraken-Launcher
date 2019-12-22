import React from 'react';
import Radium from 'radium';

const NavStyles = require('./../styles/NavStyles');

class CursePacksScreen extends React.Component {

    render() {
        return(
            <div style={NavStyles.content}>
                <h1>Modpacks</h1>
            </div>
        );
    }
}

export default Radium(CursePacksScreen);