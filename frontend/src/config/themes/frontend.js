import * as colors from '../../styles/colors';
import { createTheme } from '@mui/material/styles';


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
                    transitionDelay: '9999s !important',
                    transitionProperty: 'background-color, color !important',
                },
                
            },
        },
    },

})

export default muiTheme;