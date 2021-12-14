import * as colors from '../../styles/colors';
import { createTheme } from '@mui/material/styles';


const muiTheme = createTheme({
    palette: {
        black: colors.black,
        primary: {
            main: '#F46E58',
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
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
})

export default muiTheme;