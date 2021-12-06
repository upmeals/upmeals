import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import propTypes from 'prop-types'
import React from 'react'


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        mainText: {
            color: theme.palette.black,
            fontSize: '24px'
        }
    })
)

// Component texts
const i18n = defineMessages({
    notFoundText: {
        id: 'errors.page_not_found',
        defaultMessage: 'Page not found.'
    }
})

// Component
const NotFound = () => {
    const classes = useStyles();

    return (
        <Typography variant="body1" align="center" className={classes.mainText}>
            <FormattedMessage {...i18n.notFoundText} />
        </Typography>
    )
}

// PropTypes
NotFound.propTypes = {
    intl: propTypes.object
    // x: PropTypes.type
}


export default injectIntl(NotFound)