import {createUseStyles} from 'react-jss'

export default createUseStyles({
    'bottom-wrap': {
        lineHeight: '14px',
        position: 'absolute',
        bottom: '0px',
        fontSize: '11px',
        color: '#C7C7C7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        '& .helper-text': {
            margin: '0px'
        },
    },
    'error-line': {

    },
})