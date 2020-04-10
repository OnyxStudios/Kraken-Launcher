import React from 'react';
import {MuiThemeProvider} from "@material-ui/core";
import {defaultTheme} from "../styles/Theme";

class SettingsScreen extends React.Component {

    render() {
        return(
            <MuiThemeProvider theme={defaultTheme.main}>
                Settings
            </MuiThemeProvider>
        );
    }
}

export default SettingsScreen;