import {createUseStyles} from 'react-jss'
import variables from '../../../../../static/styles/jss/variables';
import {MediaQuery} from '../../../../../static/styles/jss/mixins';

export default createUseStyles({
    'count_extend': {
        position: 'absolute',
        top: '-9px',
        right: '-9px',
        background: variables.$baseRed,
        fontSize: '10px',
        lineHeight: '13px',
        width: '15px',
        height: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '2px',
    },
    '@global': {
        '.language-dropdown_popover': {
            padding: 0,
            listStyleType: 'none',
            margin: 0,
            '& > li': {
                padding: '7px 10px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '13px',
                '&.active-language': {
                    backgroundColor: '#3378d1',
                    color: '#fff',
                    fontWeight: '600',
                    '& img': {
                        borderColor: '#fff'
                    }
                },
                '& img': {
                    marginRight: '10px',
                    width: '22px',
                    height: '22px',
                    objectFit: 'cover',
                    border: '2px solid #ccc',
                    borderRadius: '50%',
                }
            }
        },
        '.see-all-notifications_popover': {
            color: '#3378D1',
            fontSize: '13px',
            fontWeight: 600,
            padding: '13px',
            display: 'block',
            textAlign: 'center',
        },
        '.notification-dropdown_popover': {
            listStyleType: 'none',
            padding: '0',
            margin: '0',
            '& li': {
                padding: '10px 25px 10px 10px',
                display: 'flex',
                borderBottom: '1px solid #C7C7C7',
                position: 'relative',
                '&.not-reed': {
                    fontWeight: 900,
                    '& .right-side_description > p': {
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: '-15px',
                            width: '10px',
                            height: '10px',
                            background: '#3378D1',
                            borderRadius: '50%',
                            top: '0',
                            bottom: '0',
                            margin: 'auto',
                        }
                    }
                },
                '& .img-wrapper': {
                    width: '50px',
                    '& img': {
                        width: '36px',
                        height: '36px',
                    },
                    '&.img_thumbnail': {
                        objectFit: 'cover',
                        borderRadius: '3px',
                    },
                    '&.img_icon': {
                        '& span': {
                            width: '36px',
                            height: '36px',
                            color: '#fff',
                            borderRadius: '50%',
                            backgroundColor: '#0B0E2A',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '900',
                        }
                    },
                },
                '& .right-side_description': {
                    width: 'calc(100% - 50px)',
                    '& > p': {
                        fontSize: '13px',
                        color: '#5D5D5D',
                        marginBottom: '8px',
                        '& > a': {
                            paddingLeft: '7px',
                            wordBreak: 'break-all',
                        },
                        '& .date-notification': {
                            fontSize: '11px',
                            color: '#B4B4B4',
                            '& i': {
                                margin: '0 3px 0 5px',
                            }
                        },
                    },
                    '& .btns-wrapper': {
                        display: 'flex',
                    }
                },
            },
        },
    },
    'auth-wrapper': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '& .avatar-wrapper': {
            '& img': {
                width: '36px',
                height: '36px',
                objectFit: 'cover',
                borderRadius: '50%',
            }
        },
        '& .cart-wrapper': {
            color: '#fff',
            position: 'relative',
            display: 'inline-flex',
            fontSize: '20px',
            ...MediaQuery.down({
                fontSize: '18px',
            }).xss,
            '& .cart-count': {
                extend: 'count_extend',
            }
        },
        '& .notifications-wrapper': {
            display: 'inline-flex',
            margin: '0 25px',
            color: '#fff',
            position: 'relative',
            cursor: 'pointer',
            fontSize: '20px',
            '&.notification-wrap-open': {
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    left: '50%',
                    width: 'calc(100% + 15px)',
                    height: 'calc(100% + 15px)',
                    background: variables.$iconActiveBG,
                    zIndex: '-1',
                    borderRadius: '50%',
                }
            },
            '& .notifications-count': {
                extend: 'count_extend',
            },
            ...MediaQuery.down({
                fontSize: '18px',
                margin: '0 15px',
            }).xss,
        },
        '& .user-question': {
            color: '#FFFFFF',
            fontSize: '13px',
            marginRight: '20px',
            ...MediaQuery.down({
                fontSize: '12px',
            }).sm,
            ...MediaQuery.down({
                display: 'none',
            }).xss,
        },
        '& .language-wrap': {
            margin: '0 20px 0 0',
            ...MediaQuery.between({
                margin: '0 10px 0 0',
            }).md_lg,
            ...MediaQuery.down({
                marginRight: '10px',
            }).xs,
            '& img': {
                cursor: 'pointer',
                width: '22px',
                height: '22px',
                objectFit: 'cover',
                border: '2px solid #fff',
                borderRadius: '50%',
            },
            '&.language-wrap-open': {
                position: 'relative',
                display: 'flex',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    left: '50%',
                    width: 'calc(100% + 15px)',
                    height: 'calc(100% + 15px)',
                    background: variables.$iconActiveBG,
                    zIndex: '-1',
                    borderRadius: '50%',
                }
            }
        },
        '& .user_icon': {
            color: '#fff',
            margin: '0 20px 0 0',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            ...MediaQuery.between({
                margin: '0 10px 0 0',
            }).md_lg,
            ...MediaQuery.down({
                marginRight: '0',
            }).xs,
            '& span': {
                fontSize: '20px',
            }
        },
        '& .ads-button': {
            ...MediaQuery.down({
                '&[data-appear=\"true\"]': {
                    display: 'none',
                },
            }).sm,
            ...MediaQuery.between({
                paddingLeft: '10px',
                paddingRight: '10px',
            }).md_lg,
            '& > i': {
                fontSize: '9px',
            }
        }
    },
})