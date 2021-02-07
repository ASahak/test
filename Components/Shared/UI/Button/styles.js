import {createUseStyles} from 'react-jss'
import variables from '../../../../static/styles/jss/variables';

export default createUseStyles({
    '@keyframes spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    },
    'btn-global': {
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        outline: 'none',
        color: '#fff',
        backgroundColor: variables.$baseColor,
        border: '2px solid red',
        borderRadius: variables.$button.$radius,
        justifyContent: 'center',
        margin: 0,
        padding: variables.$button.$padding,
        transition: '.1s',
        '&.custom-icon-dir-right': {
            '& i[class^=\"icon-\"], & .loading-icon': {
                marginLeft: '7px',
            }
        },
        '&.custom-icon-dir-left': {
            flexDirection: 'row-reverse',
            '& i[class^=\"icon-\"], & .loading-icon': {
                marginRight: '7px',
            }
        },
        '& .loading-icon': {
            width: '13px',
            height: '13px',
            boxSizing: 'border-box',
            border: '1px solid #f3f3f3',
            borderRadius: '50%',
            borderRightColor: '#555',
            animation: '$spin 1s linear infinite',
        },
    },
    'btn-default': {
        backgroundColor: variables.$button.$default.$bg,
        border: variables.$button.$default.$border,
        color: variables.$button.$default.$color,
        '&:hover': {
            ...variables.$button.$default.$hover
        },
        '&:disabled': {
            pointerEvents: 'none',
            ...variables.$button.$default.$disabled
        }
    },
    'btn-cta': {
        background: variables.$button.$cta.$bg,
        border: variables.$button.$cta.$border,
        color: variables.$button.$cta.$color,
        '&:hover': {
            ...variables.$button.$cta.$hover
        },
        '&:disabled': {
            pointerEvents: 'none',
            ...variables.$button.$cta.$disabled
        }
    },
    'btn-primary': {
        backgroundColor: variables.$button.$primary.$bg,
        border: variables.$button.$primary.$border,
        color: variables.$button.$primary.$color,
        '&:hover': {
            ...variables.$button.$primary.$hover
        },
        '&:disabled': {
            pointerEvents: 'none',
            ...variables.$button.$primary.$disabled
        }
    },
    'btn-alt': {
        backgroundColor: variables.$button.$alt.$bg,
        border: variables.$button.$alt.$border,
        color: variables.$button.$alt.$color,
        '&:hover': {
            ...variables.$button.$alt.$hover
        },
        '&:disabled': {
            pointerEvents: 'none',
            ...variables.$button.$alt.$disabled
        }
    },
    'btn-white-bg': {
        backgroundColor: variables.$button.$whiteBG.$bg,
        border: variables.$button.$whiteBG.$border,
        color: variables.$button.$whiteBG.$color,
        '&:hover': {
            ...variables.$button.$whiteBG.$hover
        },
        '&:disabled': {
            pointerEvents: 'none',
            ...variables.$button.$whiteBG.$disabled
        }
    },
    'btn-alert': {
        backgroundColor: variables.$button.$alert.$bg,
        border: variables.$button.$alert.$border,
        color: variables.$button.$alert.$color,
        '&:hover': {
            ...variables.$button.$alert.$hover
        },
        '&:disabled': {
            pointerEvents: 'none',
            ...variables.$button.$alert.$disabled
        }
    },
    'hover-from-transparent': {
        '&:hover': {
            backgroundColor: variables.$baseColor + ' !important',
            color: '#fff !important',
        }
    },
    'btn-md': {
        padding: variables.$button.$md.$padding,
    },
    'btn-sm': {
        padding: variables.$button.$sm.$padding,
    },
    'btn-xs': {
        padding: variables.$button.$xs.$padding,
    }
});