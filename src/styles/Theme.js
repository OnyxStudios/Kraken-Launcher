import {createMuiTheme} from "@material-ui/core";

let defaultTheme = {
    main: createMuiTheme({
        palette: {
            primary: {
                light: 'rgba(77, 171, 245, 1)',
                main: 'rgba(33, 150, 243, 1)',
                dark: 'rgba(23, 105, 170, 1)'
            },
            secondary: {
                light: 'rgba(101, 115, 195, 1)',
                main: 'rgba(63, 81, 181, 1)',
                dark: 'rgba(44, 56, 126, 1)'
            },
            error: {
                main: 'rgba(233, 30, 99, 1)'
            },
            success: {
                main: 'rgba(0, 230, 118, 1)'
            },
            background: {
                paper: 'rgba(39, 44, 50, 0.8)',
                default: 'rgba(55, 62, 72, 1)'
            },
            text: {
                primary: 'rgba(255, 255, 255, 0.87)',
                secondary: 'rgba(255, 255, 255, 0.54)'
            }
        }
    }),
    navTheme: createMuiTheme({
        palette: {
            background: {
                paper: 'rgba(39, 44, 50, 1)',
                default: 'rgba(55, 62, 72, 1)'
            },
            text: {
                primary: 'rgba(255, 255, 255, 0.87)',
                secondary: '#8A8F9D'
            },
            action: {
                hover: 'rgba(0, 0, 0, 0.2)',
                selected: 'rgba(50, 62, 77, 0.87)'
            }
        }
    })
};

export {defaultTheme};