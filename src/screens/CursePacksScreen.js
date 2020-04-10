import React from 'react';
import {MuiThemeProvider} from "@material-ui/core";
import {defaultTheme} from "../styles/Theme";

class CursePacksScreen extends React.Component {

    render() {
        return(
            <MuiThemeProvider theme={defaultTheme.main}>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div className="loader"></div>
                    <h2>Loading...</h2>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default CursePacksScreen;