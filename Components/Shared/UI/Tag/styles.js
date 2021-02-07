import {createUseStyles} from 'react-jss'
// import variables from 'static/styles/jss/variables';

export default createUseStyles( {
    'tag-wrapper': {
        border: '2px solid #3378D1',
        borderRadius: '3px',
        minWidth: '60px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        '&.md-wrapper-tag': {
            padding: '11px 10px',
        },
        '&.sm-wrapper-tag': {
            padding: '8px 10px',
        },
        '&.with-actions': {
            justifyContent: 'space-between',
            '& p': {
                textAlign: 'left',
                marginRight: '10px',
            },
        },
        '&.selected-tag': {
            backgroundColor: '#3378D1',
            '& p, & .count-ads, & .with-x': {
                color: '#fff',
            },
        },
        '&[data-disabled=\"true\"]': {
            opacity: .5,
            pointerEvents: 'none',
            userSelect: 'none',
        },
        '& p': {
            textAlign: 'center',
            color: '#C3CBD5',
            fontFamily: 'Arial',
            fontSize: '12px',
            marginBottom: '0',
            letterSpacing: '0',
            flex: 1,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        '& div': {
            display: 'flex',
            alignItems: 'center',
            '& .count-ads': {
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#C3CBD5',
            },
            '& .with-x': {
                marginLeft: '10px',
                fontSize: '13px',
                color: '#C7C7C7',
            }
        },
    },
})