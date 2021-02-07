import {createUseStyles} from 'react-jss'
import variables from '../../../../static/styles/jss/variables';

export default createUseStyles({
    'input-styles_extend': {
        fontFamily: 'Arial',
        boxSizing: 'border-box',
        width: '100%',
        transition: 'all 400ms cubic-bezier(0.04, 1.1, 1, 0.99)',
        position: 'relative',
        borderRadius: variables.$input.$radius,
        border: 'none',
        zIndex: 2,
        fontSize: variables.$input.$fontSize + 'px',
        display: 'flex',
        '&:hover': {
            ...variables.$input.$hover,
        },
        '&:focus': {
            ...variables.$input.$focus,
        },
        '&::-webkit-input-placeholder': {
            color: variables.$input.$placeholderColor
        },
        // '&:read-only': {
        //     backgroundColor: variables.$input.$readOnly,
        //     pointerEvents: 'none',
        // }
    },
    'input-wrap': {
        userSelect: 'none',
        position: 'relative',
        width: 'fit-content',
        minWidth: 'fit-content',
        fontFamily: 'Arial',
        height: 'fit-content',
        '& label': {
            fontWeight: '600',
            paddingBottom: '7px',
            color: props => props.labelColor,
        },
        '& .error-line': {
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

        // Helper Text
        '& .bottom-wrap': {
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
            '& .counter': {
                marginLeft: 'auto',
            }
        },

        // Input
        '& .input-element-wrapper': {
            flexWrap: 'nowrap',
            extend: 'input-styles_extend',
            padding: props => props.padding,
            marginBottom: props => props.marginBottom,
            backgroundColor: props => props.backgroundColor,
            border: props => props.border,
            overflow: 'hidden',
            '&[data-disabled=\"true\"]': {
                position: 'relative',
                '&::after': {
                    content: '""',
                    display: 'block',
                    border: '0',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: props => props.disabledColor,
                    zIndex: '22',
                    left: '0',
                    top: '0',
                    transform: 'scale(1)',
                },
            },
            '& .placeholder-option': {
                color: props => props.placeholderColor,
                fontSize: props => props.fontSize,
            },
            '& > .every-option': {
                display: 'block',
                width: '100%',
                flexShrink: '0',
                position: 'absolute',
                transform: 'translateX(10px)',
                fontSize: props => props.fontSize,
                opacity: '0',
                color: props => props.textColor,
                '&.active-option': {
                    transition: '.4s',
                    opacity: '1',
                    position: 'relative',
                    transform: 'translateX(0px)',
                }
            },
            '&:hover': {
                ...variables.$input.$hover,
            },
            // '& input:disabled': {
            //     backgroundColor: variables.$input.$disabledColor,
            // },
            '&.input-md': {
                padding: variables.$input.$md.$padding,
                fontSize: variables.$input.$md.$fontSize + 'px',
            },
            '&.input-sm': {
                fontSize: variables.$input.$sm.$fontSize + 'px',
                padding: variables.$input.$sm.$padding,
            },
            '&.input-xsm': {
                padding: variables.$input.$xsm.$padding,
                fontSize: variables.$input.$xsm.$fontSize + 'px',
            },
            '& .arrows-scroll-select': {
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                right: '0px',
                paddingRight: '4px',
                top: '0',
                bottom: '0',
                backgroundColor: props => props.backgroundColor,
                margin: 'auto',
                '& svg': {
                    cursor: 'pointer',
                    fill: props => props.iconColor,
                    '&.left-icon': {
                        transform: 'rotate(90deg)',
                        '&.disable-left': {
                            cursor: 'not-allowed',
                            opacity: '0.5',
                        }
                    },
                    '&.right-icon': {
                        transform: 'rotate(-90deg)',
                        '&.disable-right': {
                            cursor: 'not-allowed',
                            opacity: '0.5',
                        }
                    }
                }
            },
        },
        '&.wrapper-md': {
            '& .arrows-scroll-select': {
                '& svg': {
                    width: '30px',
                }
            }
        },
        '&.wrapper-sm': {
            '& .arrows-scroll-select': {
                '& svg': {
                    width: '25px',
                }
            }
        },
        '&.wrapper-xsm': {
            '& .arrows-scroll-select': {
                '& svg': {
                    width: '20px',
                }
            }
        },

        '& label.label-md': {
            fontSize: variables.$input.$md.$fontSize + 'px',
        },
        '& label.label-sm': {
            fontSize: variables.$input.$sm.$fontSize + 'px',
        },
        '& label.label-xsm': {
            fontSize: variables.$input.$xsm.$fontSize + 'px',
        },
        '&.error-field': {
            '& label': {
                color: variables.$danger + ' !important',
            },
            '& .input-element-wrapper': {
                marginBottom: props => props.marginBottom,
                boxShadow: '0 0 1px 1px '+ variables.$danger + ' inset !important',
                paddingRight: '25px !important',
            },
        },
    },
    'theme-light': {
        '& .input-element-wrapper': {
            backgroundColor: variables.$input.$theme.$light,
            '& .arrows-scroll-select': {
                backgroundColor: variables.$input.$theme.$light,
            },
        },
    },
    'theme-dark': {
        '& .input-element-wrapper': {
            backgroundColor: variables.$input.$theme.$dark,
            color: variables.$input.$theme.$darkColor,
            '& .arrows-scroll-select': {
                backgroundColor: variables.$input.$theme.$dark,
            },
        },
        '& .input-icon': {
            color: variables.$input.$theme.$darkColor + '!important',
        },
    },
})