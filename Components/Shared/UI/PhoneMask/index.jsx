import React, {useState} from 'react';
import PropTypes from 'prop-types';
import UseStyles from './styles';
import InputMask from 'react-input-mask';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const Phone = (props) => {
    const styles = UseStyles();
    const [value, setValue] = useState();

    return (
        <InputMask
            value={value}
            mask={'(+9'}
            // onChange={inputMaskChange}
            disabled={false}
            maskChar=""
        />
    )
}
        // {/*    {() => <TextField*/}
        // {/*        InputProps={{*/}
        // {/*            // disabled:props.disabled,*/}
        // {/*            // startAdornment: (*/}
        // {/*            //     <InputAdornment position="start">*/}
        // {/*            //         <span className="icon-clock"></span>*/}
        // {/*            //     </InputAdornment>*/}
        // {/*            // ),*/}
        // {/*            // endAdornment: (props.slideByArrows ? <InputAdornment position="end">*/}
        // {/*            //     {arrows}*/}
        // {/*            // </InputAdornment> : null),*/}
        // {/*        }} variant="filled" focused={false} placeholder={props.placeholder}/>}*/}
        // {/*</InputMask>*/}

Phone.defaultProps = {
};
Phone.propTypes = {
}
export default React.memo(Phone);
