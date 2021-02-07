import {createUseStyles} from 'react-jss'
import variables from '../../../../static/styles/jss/variables';

export default createUseStyles({
    'input-slider': {
        minWidth: '280px',
        marginTop: '5px',
    },
    'value-badge-wrapper': {
        position: 'absolute',
        top: '0',
        right: '0',
        display: 'flex',
        alignItems: 'center',
        '& .value-badge': {
            fontSize: '13px',
            borderRadius: '6px',
            backgroundColor: '#0F3271',
            padding: '4px 10px',
            color: '#fff',
        },
        '& span.reset-icon': {
            color: '#C7C7C7',
            fontSize: '18px',
            marginLeft: '10px',
            cursor: 'pointer',
            marginTop: '-1px',
        }
    },
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
        fontFamily: 'Arial',
        position: 'absolute',
        left: '0',
        bottom: '0px',
        display: 'inline-block',
        transition: 'all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        fontSize: '11px',
        lineHeight: '14px',
        color: variables.$danger,
        width: '100%',
    },
})