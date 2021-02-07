import {createUseStyles} from 'react-jss'
import variables from '../../../static/styles/jss/variables';
import {MediaQuery} from '../../../static/styles/jss/mixins';

export default createUseStyles({
    'aside-menu-bar': {
        borderRadius: '3px',
        backgroundColor: variables.$lightBlue,
        boxShadow: '0 3px 6px 0 rgba(0,0,0,0.15)',
        ...MediaQuery.between({
            minWidth: '305px',
            width: '40%',
        }).xss_sm,
        ...MediaQuery.down({
            borderRadius: '0px',
            backgroundColor: variables.$darkOpacity50,
            position: 'fixed',
            top: '0',
            zIndex: '999',
            height: '100vh',
            left: '-100%',
            transition: '.4s',
            padding: '10px',
            '& > div > ul': {
                margin: '10px 0 !important',
            },
            '&.open-mobile-categories_menu': {
                left: '0px',
                '&::after': {
                    right: '0',
                    zIndex: '-1',
                    content: '""',
                    position: 'fixed',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.2)',
                },
            }
        }).sm,
        ...MediaQuery.down({
            width: '100%',
        }).xss,
        '& > div': {
            '@media (hover: none)': {
                '&::-webkit-scrollbar': {
                    width: '0px',
                    backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'transparent',
                },
            },
            '@media (hover: hover)': {
                paddingRight: '5px',
                '&::-webkit-scrollbar': {
                    width: '6px',
                    backgroundColor:'#07224D',
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '10px',
                    background: '#C7C7C7',
                },
                scrollbarWidth: 'thin',
                scrollbarColor: '#C7C7C7 #07224D',
            },
            '& .mobile-top-panel': {
                borderBottom: '1px solid #3378D1',
                padding: '20px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                '& .ads-button': { // injected from header
                    marginTop: '20px !important',
                    padding: '8.5px 15px !important',
                    width: '100% !important',
                },
                '& > p': {
                    paddingLeft: '40px',
                    marginBottom: '0',
                    lineHeight: '22px',
                    position: 'relative',
                    color: '#fff',
                    fontSize: '13px',
                    cursor: 'pointer',
                    '& .icon-back-arrow': {
                        left: '10px',
                        fontSize: '22px',
                        position: 'absolute',
                        fontWeight: '900',
                        transform: 'rotate(-90deg) !important',
                    }
                },
                '& .close-menu_icon': {
                    color: '#fff',
                    fontSize: '22px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                },
            },
            ...MediaQuery.down({
                overflowX: 'hidden',
                maxHeight: '100%',
            }).sm,
            '& > ul': {
                margin: 0,
                height: '100%',
            }
        },
        '& ul': {
            padding: '0',
            ...MediaQuery.down({
                '&:not(.sub-list_menu)': {
                    position: 'relative',
                    transition: '.4s',
                    left: '0',
                    '&.slide-to-left': {
                        left: '-100%',
                        '& > li': {
                            '& .arrow_icon_list-item': {
                                opacity: '0'
                            }
                        }
                    }
                }
            }).sm,
            '& li': {
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                '&.active-mobile-item': {
                    '& .sub-list_menu': {
                        opacity: 1,
                        visibility: 'visible',
                    }
                },
                ...MediaQuery.up({
                    position: 'relative',
                }).sm,
                '& > a': {
                    fontFamily: '"Exo 2", sans-serif',
                    flex: '1',
                    display: 'block',
                    padding: '13px 10px',
                    color: '#fff',
                    transition: '.1s ease-in-out',
                    fontWeight: '100',
                    '&:hover': {
                        color: '#fff',
                        textShadow: '.5px 0px 0px #fff, 0px 0px 0px #fff, 0px 0px 0px #fff',
                        letterSpacing: '0.2px',
                    }
                },
                '&.back-to-parent_category': {
                    color: '#fff',
                    display: 'block',
                    padding: '13px 10px',
                    fontWeight: '900',
                    marginLeft: '-20px',
                    fontSize: '14px',
                    cursor: 'text',
                },
                '&:hover > .arrow_icon_list-item': {
                    fontWeight: '900',
                    color: '#fff',
                },
                '&:not(.back-to-parent_category):hover': {
                    backgroundColor: variables.$darkOpacity50,
                    ...MediaQuery.up({
                        '& .sub-list_menu': {
                            opacity: '1',
                            visibility: 'visible',
                            zIndex: '222',
                        }
                    }).sm,
                },
                '& .arrow_icon_list-item': {
                    color: '#fff',
                    position: 'absolute',
                    right: '10px',
                    transform: 'rotate(90deg)',
                    fontSize: '20px',
                },
                '& .sub-list_menu': {
                    position: 'absolute',
                    left: '100%',
                    width: '400px',
                    boxShadow: '0 2px 8px 0 rgb(0 0 0 / 50%)',
                    opacity: '0',
                    visibility: 'hidden',
                    zIndex: '-1',
                    display: 'flex',
                    top: '0',
                    ...MediaQuery.up({
                        backgroundColor: variables.$darkOpacity50,
                        flexWrap: 'wrap',
                        '& > li': {
                            width: '50%',
                        },
                    }).sm,
                    ...MediaQuery.down({
                        paddingLeft: '20px',
                        flexDirection: 'column',
                        overflowX: 'hidden',
                        maxHeight: '100%',
                        width: '100%',
                        boxShadow: 'none',
                        zIndex: '222',
                        scrollbarColor: '#C7C7C7 #07224D',
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': {
                            width: '6px',
                            backgroundColor:'#07224D',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '10px',
                            background: '#C7C7C7',
                        },
                    }).sm,
                    '& > li:first-child': {
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            left: '-10px',
                            top: '0',
                            height: '100%',
                            width: '10px',
                            zIndex: '2223',
                            background: variables.$darkOpacity50,
                        },
                    }
                },
            }
        },
        '& .login-creat-account_wrapper': {
            borderTop: '1px solid #3378D1',
            display: 'none',
            ...MediaQuery.down({
                display: 'block',
            }).sm,
            '& > a': {
                display: 'flex',
                alignItems: 'center',
                padding: '13px 10px',
                color: '#fff',
                fontSize: '13px',
                '& > span': {
                    fontSize: '22px',
                    marginRight: '14px',
                }
            }
        }
    }
})