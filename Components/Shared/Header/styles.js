import {createUseStyles} from 'react-jss'
import variables from '../../../static/styles/jss/variables';
import {MediaQuery} from '../../../static/styles/jss/mixins';

export default createUseStyles({
    '@global': {
        'header': {
            ...MediaQuery.down({
                overflow: 'hidden',
            }).xs,
            ...MediaQuery.up({
                position: 'fixed',
            }).sm,
            top: '0',
            position: 'absolute',
            transition: 'top 0.3s',
            zIndex: '999',
            left: '0',
            width: '100%',
            padding: '17px 0',
            background: 'linear-gradient(180deg, #0558A8 0%, #003F8F 100%)',
            borderBottom: `2px solid ${variables.$baseRed}`,
            '& .row': {
                alignItems: 'center',
            }
        }
    },
    'mobile-toggle_search-bar': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '& > span': {
            fontSize: '20px',
            color: '#fff',
            marginRight: '15px',
            cursor: 'pointer',
            '&.opened-search-icon': {
                position: 'relative',
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
        },
        ...MediaQuery.down({
            '& > span': {
                marginRight: '10px',
            }
        }).xss,
    },
    'logo-wrapper': {
        display: 'flex',
        alignItems: 'center',
        '& .toggle-categories_menu': {
            display: 'none',
        },
        ...MediaQuery.down({
            '& .toggle-categories_menu': {
                marginRight: '15px',
            }
        }).xs,
        ...MediaQuery.down({
            '& .toggle-categories_menu': {
                display: 'block',
                fontSize: '20px',
                color: '#fff',
                cursor: 'pointer',
                marginRight: '10px',
            }
        }).sm,
        '& > a': {
            display: 'block',
            '& img': {
                width: '180px',
                height: '47px',
                ...MediaQuery.between({
                    width: '133px',
                    height: '38px',
                }).xss_xs,
                ...MediaQuery.down({
                    width: '101px',
                    height: '27px',
                }).xss,
            }
        }
    },
})