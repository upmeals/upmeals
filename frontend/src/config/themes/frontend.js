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
    }
})

export default muiTheme;