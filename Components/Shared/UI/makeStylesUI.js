import {makeStyles} from "@material-ui/core/styles";
import variables from '../../../static/styles/jss/variables';

const sharedProps = {
    overflowThumb: {
        'max-height': 220,
        overflowX: 'hidden',
        scrollbarColor: props => props.isDark ? '#C7C7C7 #07224D' : '#C7C7C7 #EFEFEF',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
            width: '6px',
            backgroundColor: props => props.isDark ? '#07224D' : '#EFEFEF',
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            background: '#C7C7C7',
        },
    },
    disableNoneLayer: {
        position: 'relative',
        '&::after': {
            content: '""',
            display: 'block',
            border: '0',
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: props => (props.isDark ? '#0a29559e' : '#ffffffa8') + '!important',
            zIndex: '999',
            left: '0',
            top: '0',
            transform: 'scale(1)',
        },
        '& .MuiInputAdornment-root': {
            zIndex: '-1 !important',
        }
    }
}
const useFormControlStyles = makeStyles((theme) => ({
    root: {
        userSelect: 'none',
        width: props => props.width,
        display: 'flex',
        '& label': {
            fontSize: props => variables.$input['$' + props.size].$fontSize,
        },
        '& .MuiSelect-root, & .MuiAutocomplete-input': {
            padding: props => variables.$input['$' + props.size].$padding + '!important',
            fontSize: props => variables.$input['$' + props.size].$fontSize + 'px',
        },
        '&.disable-select-wrapper': {
            '& .MuiAutocomplete-root': {
                ...sharedProps.disableNoneLayer,
            },
        },
        // input Mask
        '& .mask-input': {
            position: 'relative',
            '&[data-disabled=\"true\"]': {
                '& .MuiInputBase-root': {
                    ...sharedProps.disableNoneLayer,
                },
            },
            '& > .MuiTextField-root': {
                width: '100%',
                position: 'relative',
                zIndex: '22',
                '& .MuiInputBase-root': {
                    transition: '.4s',
                    marginBottom: props => props.marginBottom,
                    boxShadow: props => props.boxShadow,
                    color: props => props.valueColor,
                    borderRadius: props => props.isOpened ? variables.$input.$radius + ' ' + variables.$input.$radius + ' 0 0' : variables.$input.$radius,
                    backgroundColor: props => (props.backgroundColor || '#fff') + '!important',
                    zIndex: '22',
                    '& input::-webkit-input-placeholder': {
                        color: props => props.placeholderColor,
                        opacity: '1',
                    },
                    '&::before': {
                        display: 'none',
                    },
                    padding: '0 !important',
                    '&:hover': {
                        ...variables.$input.$hover,
                    },
                    '& input': {
                        padding: props => variables.$input['$' + props.size].$padding,
                        fontSize: props => variables.$input['$' + props.size].$fontSize + 'px',
                        height: 'auto',
                        paddingLeft: '40px !important',
                        borderRadius: 'inherit',
                        zIndex: '222',
                        '&:focus': {
                            ...variables.$input.$focus,
                        }
                    },
                    '& .MuiInputAdornment-root': {
                        '&.MuiInputAdornment-positionStart': {
                            left: '12px',
                        },
                        margin: 0,
                        position: 'absolute',
                        '& .icon-clock': {
                            color: variables.$datepicker.$iconColor,
                            fontSize: props => variables.$datepicker['$' + props.size].$iconSize,
                        },
                        '&.MuiInputAdornment-positionEnd': {
                            height: 'auto',
                            margin: 'auto',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            position: 'absolute',
                            paddingRight: '4px',
                            zIndex: '223',
                            '& .arrows-slide-datepicker': {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                '& svg': {
                                    width: '30px',
                                    cursor: 'pointer',
                                    fill: props => props.iconColor,
                                    '&.left-icon': {
                                        transform: 'rotate(90deg)',
                                    },
                                    '&.right-icon': {
                                        transform: 'rotate(-90deg)',
                                    },
                                    '&.disable-btn': {
                                        cursor: 'not-allowed',
                                        opacity: '0.5',
                                    },
                                }
                            },
                        },
                    },
                }
            },
            '&.focused-input': {
                '& .MuiInputBase-root': {
                    boxShadow: 'none !important'
                }
            },
            '& .MuiAutocomplete-root': {
                position: 'absolute',
                opacity: '0',
                width: '100%',
                visibility: 'hidden',
                top: '0',
                margin: '0 !important'
            },
        }
    },
}));

const usePopoverStyles = makeStyles(() => ({
    paper: {
        transitionDuration: '0s !important',
        backgroundColor: props => props.backgroundColor,
        borderRadius: '0 0 ' + variables.$input.$radius + ' ' + variables.$input.$radius,
        border: props => props.isDark ? '1px solid ' + variables.$select.$dark.$borderColor : 'none',
        marginLeft: props => props.marginLeft,
        boxShadow: '0px 2px 2.5px 0px rgb(0 0 0 / 45%)',
        marginTop: props => props.paperMarginTop,
        '& .MuiList-root': {
            ...sharedProps.overflowThumb,
            '& > li': {
                color: props => props.listItemColor,
                fontSize: props => variables.$input['$' + props.size].$fontSize,
                padding: props => variables.$select.$dropdown.$listItem['$' + props.size].$padding,
                '& .MuiListItemText-root': {
                    margin: props => variables.$select.$dropdown.$listItem['$' + props.size].$margin,
                },
                '&.Mui-selected': {
                    color: props => props.selectedItemColor,
                    backgroundColor: props => props.selectedItemBG,
                    fontWeight: 'bold',
                    '& .MuiListItemIcon-root': {
                        color: 'inherit',
                        '& span.icon': {
                            color: 'inherit',
                        }
                    },
                }
            }
        }
    }
}));
const useSelectStyles = makeStyles(() => ({
    select: {
        '&:before, &:after': {
            display: 'none',
        },
        width: '100%',
        marginTop: '0px !important',
        transition: '.4s',
        lineHeight: 'inherit',
        marginBottom: props => props.marginBottom,
        boxShadow: props => props.isOpened ? '0px 1px 2px 0px rgb(0 0 0 / 45%)' : 'none',
        borderRadius: props => props.isOpened ? variables.$input.$radius + ' ' + variables.$input.$radius + ' 0 0' : variables.$input.$radius,
        backgroundColor: props => props.backgroundColor || '#fff',
        zIndex: '22',
        '&.Mui-disabled': {
            pointerEvents: 'none',
            ...sharedProps.disableNoneLayer,
        },
    },
    root: {
        minHeight: 'auto',
        padding: variables.$input.$padding,
        fontSize: variables.$input.$fontSize,
        boxShadow: props => props.boxShadow,
        borderRadius: 'inherit !important',
        transition: '.4s',
        backgroundColor: 'transparent !important',
        color: props => props.textColor,
        '&[aria-expanded=\"true\"]': {
            ...variables.$input.$focus,
        },
        '& .default-value-empty': {
            color: props => props.placeholderColor,
        },
        '&:hover': {
            ...variables.$input.$hover,
        },
    },
    icon: {
        fill: props => props.iconColor,
        fontSize: '30px',
        top: 'calc(50% - 15px)',
        right: '4px'
    },
    disabled: {
    },
}));
const useLabelStyles = makeStyles(() => ({
    root: {
        transform: 'translate(0px) !important',
        position: 'relative',
        fontSize: variables.$input.$fontSize,
        fontWeight: '600',
        paddingBottom: '7px',
        marginBottom: '0',
        color: props => props.color,
    },
    disabled: {
        '&:not(.Mui-error)': {
            color: props => [props.color, '!important'],
        },
    },
    error: {
        color: variables.$danger + '!important',
    },
}));

const useAutoCompleteStyles = makeStyles(() => ({
    root: {
        marginBottom: props => props.marginBottom,
        zIndex: '22',
        '&.Mui-focused .MuiInputBase-root': {
            ...variables.$input.$focus,
        },
        '&.MuiMultiple_Autocomplete_field .MuiFilledInput-root': { // todo need to discuss about multiple prop
            display: 'flex',
            flexWrap: 'nowrap',
            overflow: 'hidden',
            '&::-webkit-scrollbar-thumb': {
                width: '0px',
                background: 'none',
                height: '0px',
            },
            '&::-webkit-scrollbar': {
                background: 'none',
                height: '0px',
                width: '0px',
            },
        },
    },
    popupIndicator: {
        padding: '0',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '& .MuiTouchRipple-root': {
            display: 'none',
        },
        '& .MuiIconButton-label': {
            '& svg': {
                fill: props => props.iconColor,
                fontSize: '30px',
            }
        }
    },
    endAdornment: {
        bottom: '0',
        top: '0',
        margin: 'auto',
        height: '30px',
        width: '30px',
        right: '4px !important',
    },
    inputRoot: {
        boxShadow: props => props.boxShadow,
        transition: '.4s',
        color: props => props.textColor,
        borderRadius: props => props.isOpened ? variables.$input.$radius + ' ' + variables.$input.$radius + ' 0 0' : variables.$input.$radius,
        backgroundColor: props => (props.backgroundColor || '#fff') + '!important',
        '& input::-webkit-input-placeholder': {
            color: props => props.placeholderColor,
            opacity: '1',
        },
        '&::before': {
            display: 'none',
        },
        padding: '0 !important',
        '&:hover': {
            ...variables.$input.$hover,
        },
    },
    input: {
        padding: variables.$input.$padding + '!important',
        fontSize: variables.$input.$fontSize,
        height: 'auto',
    },
    clearIndicator: {
        display: 'none',
    },
    popper: {
        border: props => props.isDark ? '1px solid ' + variables.$select.$dark.$borderColor : 'none',
        boxShadow: '0px 2px 2.5px 0px rgb(0 0 0 / 45%)',
        borderRadius: '0 0 ' + variables.$input.$radius + ' ' + variables.$input.$radius,
        marginTop: props => props.paperMarginTop,
        boxSizing: 'content-box',
    },
    paper: {
        margin: '0',
        boxShadow: 'none',
        backgroundColor: props => (props.backgroundColor || '#fff') + '!important',
        borderRadius: '0',
        '& .MuiAutocomplete-noOptions': {
            color: props => props.listItemColor,
            fontSize: props => variables.$input['$' + props.size].$fontSize,
            padding: props => variables.$input['$' + props.size].$padding,
        },
    },
    listbox: {
        ...sharedProps.overflowThumb,
        '& > li': {
            transition: '.2s',
            color: props => props.listItemColor,
            fontSize: props => variables.$input['$' + props.size].$fontSize,
            padding: props => variables.$input['$' + props.size].$padding,
            letterSpacing: '0.7px',
            '&.MuiAutocomplete-option:active, &.MuiAutocomplete-option[aria-selected=\"true\"]': {
                color: props => props.selectedItemColor,
                backgroundColor: props => props.selectedItemBG,
                textShadow: '.5px 0px 0px #fff, 0px 0px 0px #fff, 0px 0px 0px #fff',
                letterSpacing: '0.7px',
            }
        }
    }
}));

const useItemStyles = makeStyles(() => ({
    root: {
        '& .MuiListItemIcon-root': {
            minWidth: '0',
            width: props => variables.$select.$dropdown.$listItem['$' + props.size].$size,
            height: props => variables.$select.$dropdown.$listItem['$' + props.size].$size,
            borderRadius: '50%',
            marginRight: props => variables.$select.$dropdown.$listItem['$' + props.size].$iconRight,
            overflow: 'hidden',
            '& img': {
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                '&.till-loading': {
                    transform: 'scale(3)',
                },
            },
            '& .like-avatar': {
                fontSize: '15px',
                fontWeight: '600',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: props => props.avatarBG,
                color: props => props.avatarColor,
            },
            '& span.icon': {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: props => props.iconColor,
                fontSize: props => variables.$select.$dropdown.$listItem['$' + props.size].$iconSize,
            }
        },
        '& .MuiListItemText-root': {
            margin: '0',
            '& .MuiListItemText-primary': {
                fontSize: 'inherit',
            }
        },
    },
}));

const usePickerPaperStyles = makeStyles(() => ({
    root: {
        '&.mobile-mode_datePicker': {
            backgroundColor: props => props.isDark ? 'rgb(255 243 243 / 30%)' : 'rgba(0,0,0, .5)',
            '& .MuiPopover-paper': {
                left: '0px !important',
                right: '0px !important',
                top: '0px !important',
                bottom: '0px !important',
                width: 'fit-content !important',
                height: 'fit-content !important',
                margin: 'auto'
            }
        },
        '& .MuiPopover-paper': {
            transitionDuration: '0s !important',
            marginTop: '5px',
            backgroundColor: props => props.backgroundColor,
            border: props => props.isDark ? '1px solid #11509F' : 'none',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.5)',
            '& .MuiPickersCalendarHeader-daysHeader': {
                '& .MuiTypography-root': {
                    color: props => props.weekColor,
                }
            },
            '& .MuiPickersCalendarHeader-switchHeader': {
                '& .MuiTypography-root': {
                    color: props => props.valueColor,
                },
            },
            '& .MuiButtonBase-root': {
                backgroundColor: props => props.backgroundColor,
                color: props => props.valueColor,
                '&.MuiPickersDay-daySelected': {
                    backgroundColor: variables.$datepicker.$actionsColor,
                    color: '#fff !important',
                    '&.MuiPickersDay-dayDisabled': {
                        color: '#b4b4b4 !important',
                    }
                },
                '&.MuiPickersDay-dayDisabled': {
                    color: props => [props.weekColor, '!important'],
                },
            }
        },
        '& .datepicker-actions-wrap': {
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '20px',
            '& button': {
                background: 'none',
                border: 'none',
                fontWeight: '900',
                color: props => props.actionsColor,
                fontSize: '13px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                outline: 'none',
                '&.disable-select': {
                    pointerEvents: 'none',
                    opacity: .5,
                },
            }
        }
    }
}));

const useDatePickerStyles = makeStyles(() => ({
    root: {
        margin: '0',
        '& .MuiInputBase-root': {
            '&:before, &:after': {
                display: 'none',
            },
            '&:hover': {
                ...variables.$input.$hover,
            },
            width: '100%',
            marginTop: '0px !important',
            transition: '.4s',
            padding: '0',
            marginBottom: props => props.marginBottom,
            outline: 'none',
            zIndex: '22',
            boxShadow: props => props.isOpened ? '0px 0px 1px 2px #B0F2F1 inset' : 'none',
            borderRadius: variables.$input.$radius,
            backgroundColor: props => props.backgroundColor || '#fff',
            '&::after': {
                color: props => props.valueColor,
                display: props => props.dayNearly ? 'block': 'none',
                content: props => '\"' + props.dayNearly + '\"',
                transform: 'scale(1)',
                top: '0',
                margin: 'auto',
                bottom: '0',
                height: props => variables.$input['$' + props.size].$fontSize + 'px',
                left: '40px',
                borderBottom: 'none',
                fontSize: props => variables.$input['$' + props.size].$fontSize + 'px',
                lineHeight: props => variables.$input['$' + props.size].$fontSize + 'px',
            },
            '&.Mui-disabled': {
                ...sharedProps.disableNoneLayer,
            },
            '& input': {
                padding: props => variables.$input['$' + props.size].$padding + '!important',
                fontSize: props => variables.$input['$' + props.size].$fontSize + 'px',
                color: props => props.valueColor,
                opacity: props => props.dayNearly ? '0' : 1,
                height: 'auto',
                '&::-webkit-input-placeholder': {
                    color: props => props.placeholderColor,
                    opacity: '1 !important',
                },
            },
            '& .MuiInputBase-input': {
                paddingLeft: '40px !important',
            },
            '& .MuiInputAdornment-positionEnd': {
                height: 'auto',
                margin: 'auto',
                top: '0px',
                right: '0px',
                bottom: '0px',
                position: 'absolute',
                paddingRight: '4px',
                '& .arrows-slide-datepicker': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '& svg': {
                        width: '30px',
                        cursor: 'pointer',
                        fill: props => props.iconColor,
                        '&.left-icon': {
                            transform: 'rotate(90deg)',
                        },
                        '&.right-icon': {
                            transform: 'rotate(-90deg)',
                        },
                        '&.disable-btn': {
                            cursor: 'not-allowed',
                            opacity: '0.5',
                        },
                    }
                },
            },
            '& .MuiInputAdornment-positionStart': {
                position: 'absolute',
                left: '0',
                marginLeft: '12px',
                marginRight: '12px',
                marginTop: '0px',
                height: 'auto',
                '& button': {
                    padding: '0',
                    cursor: 'text',
                    fontSize: props => variables.$datepicker['$' + props.size].$iconSize,
                    '& .MuiIconButton-label': {
                        color: variables.$datepicker.$iconColor,
                    }
                },
            },
        },
    },
}));

const useDialogStyles = makeStyles(() => ({
    root: {
        '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
        '& .MuiDialog-container': {
            '& .MuiDialogTitle-root': {
                '& .MuiTypography-h6': {
                    fontWeight: 'bold',
                    letterSpacing: '-0.5px',
                    fontSize: '19px',
                },
            },
            '& .MuiDialogContent-root': {
                lineHeight: '19px',
                margin: '0 2px',
                padding: '8px 20px',
                '&::-webkit-scrollbar': {
                    width: '8px',
                    backgroundColor: '#EFEFEF',
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '10px',
                    background: '#C7C7C7',
                },
            },
            '& .MuiDialogActions-root': {
                padding: '8px 24px',
                marginBottom: '16px',
                '&[data-vertical=\"true\"]': {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    '& > button:first-child': {
                        marginBottom: '15px'
                    }
                },
                '& > button': {
                    outline: 'none',
                    color: variables.$datepicker.$actionsColor,
                    fontSize: '13px',
                    fontWeight: 'bold',
                    background: 'none',
                    border: 'none',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    '&:disabled': {
                        color: '#D8D8D8',
                        cursor: 'default',
                    }
                }
            },
        }
    },
    paper: {
        minWidth: '280px',
    }
}));

const useRangeSliderStyles = makeStyles(() => ({
    root: {
        marginBottom: props => props.marginBottom,
        display: 'block',
        zIndex: '22',
        height: '6px',
    },
    rail: {
        height: '6px',
        borderRadius: '3px',
        backgroundColor: '#C3CBD5',
    },
    track: {
        borderRadius: '3px',
        backgroundColor: '#B0F2F1',
        height: '6px',
    },
    thumb: {
        height: '22px !important',
        width: '22px !important',
        backgroundColor: '#B0F2F1',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.5) !important',
        marginTop: '-8px !important',
    },
    disabled: {
        '& .MuiSlider-rail': {
            backgroundColor: '#bdbdbd',
        },
        '& .MuiSlider-track': {
            backgroundColor: '#bdbdbd',
        },
        '& .MuiSlider-thumb': {
            backgroundColor: '#bdbdbd',
        }
    },
}));

const useDropDownPopoverStyles = makeStyles(() => ({
    paper: {
        margin: props => props.margin,
        transform: 'scale(1) !important',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.5)',
        borderRadius: '2px',
        // transitionDuration: '0s !important',
        overflow: props => props.overflow,
        '&::after': {
            display: props => props.triangle || 'none',
            position: 'absolute',
            content: '""',
            top: '-8px',
            right: '42px',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '10px solid #fff',
        }
    }
}));

export {
    useFormControlStyles,
    usePopoverStyles,
    useSelectStyles,
    useLabelStyles,
    useAutoCompleteStyles,
    useItemStyles,
    useDatePickerStyles,
    usePickerPaperStyles,
    useDialogStyles,
    useRangeSliderStyles,
    useDropDownPopoverStyles,
}