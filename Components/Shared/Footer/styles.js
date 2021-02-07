import {createUseStyles} from 'react-jss'
import variables from '../../../static/styles/jss/variables';
import {MediaQuery} from '../../../static/styles/jss/mixins';

export default createUseStyles({
    '@global': {
        'footer': {
            backgroundColor: variables.$baseDark,
            borderTop: `2px solid ${variables.$baseRed}`,
            padding: '30px 0 50px 0',
        }
    },
    'main-container_footer': {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        ...MediaQuery.between({
            justifyContent: 'flex-start',
        }).sm_md,
        '& > div': {
            width: '20%',
            ...MediaQuery.between({
                width: '33.33%',
                '&:nth-child(5)': {
                    order: 2,
                },
                '&:nth-child(3)': {
                    order: 3,
                    marginTop: '20px',
                },
                '&:nth-child(4)': {
                    order: 4,
                    marginTop: '20px',
                }
            }).sm_md,
            ...MediaQuery.between({
                width: '50%',
                '&:nth-child(3)': {
                    marginTop: '20px',
                },
                '&:nth-child(4)': {
                    marginTop: '20px',
                },
                '&:nth-child(5)': {
                    width: '100%',
                    marginTop: '20px',
                },
            }).xs_sm,
            ...MediaQuery.down({
                marginTop: '20px',
                width: '100%',
            }).xs,
            '& form': {
                marginBottom: '16px',
            },
            '& h4': {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '10px',
            },
            '& > a, & > p': {
                display: 'block',
                marginBottom: '10px',
                fontSize: '13px',
                color: '#fff',
            }
        }
    },
})