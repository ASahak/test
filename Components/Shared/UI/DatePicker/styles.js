import {createUseStyles} from 'react-jss'
import variables from '../../../../static/styles/jss/variables';

export default createUseStyles({
    'input-wrap': {
        userSelect: 'none',
        '& .input-element-wrapper': {
            position: 'relative',
            fontFamily: 'Arial',
            '& .MuiFormHelperText-root': {
                display: 'none',
            },
        },
        '&.wrapper-md': {
            '& .arrows-slide-datepicker': {
                '& svg': {
                    width: '30px',
                }
            }
        },
        '&.wrapper-sm': {
            '& .arrows-slide-datepicker': {
                '& svg': {
                    width: '25px',
                }
            }
        },
        '&.wrapper-xsm': {
            '& .arrows-slide-datepicker': {
                '& svg': {
                    width: '20px',
                }
            }
        },
    }
    ,
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
    'theme-light': {},
    'theme-dark': {},
})