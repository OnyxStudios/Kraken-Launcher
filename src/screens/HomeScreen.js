import React from 'react';
import Radium from 'radium';

const NavStyles = require('./../styles/NavStyles');

class HomeScreen extends React.Component {

    render() {
        return(
            <div style={NavStyles.content}>
                <h1>Hello World</h1>
            </div>
        );
    }
}

export default Radium(HomeScreen);