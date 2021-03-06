import { createTheme } from '@mui/material/styles';


const muiTheme = createTheme({
    palette: {
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
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    marginTop: '4px !important',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    background: 'white',
                    border: '1px solid #cecece',
                    borderRadius: '8px',
                }
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'outlined' },
                    style: {
                        border: '1px solid #F46E59',
                        color: '#F46E59',
                        borderRadius: 15,
                        fontWeight: 400,
                        boxShadow: 'none',
                    },
                },
                {
                    props: { variant: 'contained' },
                    style: {
                        background: '#F46E59',
                        color: 'white',
                        borderRadius: 15,
                        fontWeight: 400,
                        boxShadow: 'none',
                    },
                },
                {
                    props: { variant: 'text' },
                    style: {
                        margin: 0,
                        color: 'black',
                        fontWeight: 300,
                        textTransform: 'none',
                        borderRadius: 0,
                    },
                },
            ]
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
})


export default muiTheme;