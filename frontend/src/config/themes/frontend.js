import * as colors from '../../styles/colors';

import { createTheme } from '@material-ui/core/styles';
// import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const muiTheme = createTheme({
    palette: {
        black: colors.black,
        primary: {
            main: '#5138EE',
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif'
        ].join(','),
    },
    overrides: {
        MuiInputBase: {
            input: {
                '&:-webkit-autofill': {
                    transitionDelay: '9999s',
                    transitionProperty: 'background-color, color',
                },
            },
        },
    },
})

export default muiTheme;