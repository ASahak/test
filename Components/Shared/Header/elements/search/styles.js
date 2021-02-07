import {createUseStyles} from 'react-jss';
import variables from '../../../../../static/styles/jss/variables';
import {MediaQuery} from '../../../../../static/styles/jss/mixins';

export default createUseStyles({
    'search-wrapper': {
        '-webkit-perspective': 1000,
        '-webkit-backface-visibility': 'hidden',
        ...MediaQuery.down({
            marginTop: '20px',
        }).md,
        ...MediaQuery.down({
            height: '0',
            transition: '.2s ease-in-out',
            overflow: 'hidden',
            marginTop: '0',
            zIndex: '-1',
            visibility: 'hidden',
            opacity: '0',
            '&.opened_mobile': {
                opacity: '1',
                zIndex: '1',
                visibility: 'visible',
                marginTop: '20px',
                height: props => props.formHeight,
            },
        }).xs,
        '& .main-search-form': {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            ...MediaQuery.down({
                flexDirection: 'column',
            }).xs,
            '& .search-input': {
                width: 'calc(100% - 225px) !important',
                '& input': {
                    ...MediaQuery.up({
                        borderTopRightRadius: '0px',
                        borderBottomRightRadius: '0px',
                    }).xs,
                }
            },
            '& .search-select': {
                ...MediaQuery.down({
                    width: '100%',
                    marginTop: '8px !important',
                }).xs,
                '& > div': {
                    borderLeft: '1px solid #D8D8D8',
                    ...MediaQuery.up({
                        borderRadius: `0 ${variables.$input.$radius} ${variables.$input.$radius} 0`,
                    }).xs,
                    '& .MuiSvgIcon-root': {
                        top: 'calc(50% - 12px)',
                        right: '4px',
                        fontSize: '24px',
                        ...MediaQuery.up({
                            right: '90px',
                        }).xs,
                    }
                },
                '& .MuiSelect-root': {
                    '& > div': {
                        overflow: 'hidden',
                    },
                    ...MediaQuery.up({
                        paddingRight: '110px !important',
                    }).xs,
                    '&:hover': {
                        boxShadow: 'none'
                    }
                },
                '&.select-opened': {
                    '& > div.Mui-focused': {
                        boxShadow: 'none !important',
                        '& .MuiSelect-root': {
                            boxShadow: 'none !important',
                        }
                    }
                },
            },
            '& .search-button': {
                zIndex: '222',
                right: '0',
                ...MediaQuery.down({
                    width: '100%',
                    marginTop: '8px !important',
                    marginRight: 'auto !important',
                }).xs,
                ...MediaQuery.up({
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    position: 'absolute',
                }).xs
            },
        }
    },
})