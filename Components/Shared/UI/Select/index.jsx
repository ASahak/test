import React, {useMemo, useState, useCallback, useRef, useEffect} from "react";
import Select from '@material-ui/core/Select';
import variables from '../../../../static/styles/jss/variables';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from "prop-types";
import UseStyles from './styles';
import {UiGenerateMargin, UIGetMarginLeftRight} from '../../../../utils/handlers';
import ListItem from './elements/ListItem';
import {MenuItem} from "@material-ui/core";
import {
    useFormControlStyles,
    usePopoverStyles,
    useSelectStyles,
    useLabelStyles,
    useAutoCompleteStyles,
    useItemStyles,
} from '../makeStylesUI';

const BrandSelect = (props) => {
    const [selectOpen, setSelectOpen] = useState(false);
    const [marginBottom, setMarginBottom] = useState('0px');
    const errorRef = useRef();
    const bottomWrapRef = useRef();
    const styles = UseStyles();
    const {
        options,
        label,
        value,
        placeholder,
        id,
        handleChange,
        helperText,
        required,
        errors,
        size,
        disabled,
        autocomplete,
        multiple,
        withIcon,
        withAvatar,
    } = props;

    const sharedPropsOfClasses = useMemo(() => {
        const backgroundColor = props.theme === 'dark' ? variables.$input.$theme.$dark : variables.$input.$theme.$light;
        const boxShadow = props.theme === 'dark' ? variables.$select.$dark.$borderColor + ' 0px 0px 0px 1px' : 'none';
        return {
            backgroundColor,
            boxShadow,
            marginBottom: marginBottom,
            isOpened: selectOpen,
            isDark: props.theme === 'dark',
            listItemColor: props.theme === 'dark' ? variables.$select.$dark.$textColor : variables.$select.$textColor,
            selectedItemColor: props.theme === 'dark' ? variables.$select.$dark.$selected.$color : variables.$select.$selected.$color,
            selectedItemBG: props.theme === 'dark' ? variables.$select.$dark.$selected.$bgColor : variables.$select.$selected.$bgColor,
            placeholderColor: props.theme === 'dark' ? variables.$select.$dark.$emptyTextColor : variables.$select.$emptyTextColor,
            paperMarginTop: props.paperMarginTop,
            size: props.size,
        }
    }, [props.size, props.theme, selectOpen, marginBottom, props.paperMarginTop]);

    const convertNaturalSize = useCallback((prop, what) => {
        if (isNaN(+prop)) return prop;
        else return prop + what;
    }, [props.width]);

    const togglePopover = (val) => {
        if (props.onOpen || props.onClose) {
            props[val ? 'onOpen' : 'onClose'](val);
        }
        setSelectOpen(val)
    }
    const classesLabel = useLabelStyles({
        color: (label && label.color) || '#fff',
    });

    const classesMenuItem = useItemStyles({
        avatarBG: sharedPropsOfClasses.isDark ? '#fff' : '#0B0E2A',
        avatarColor: sharedPropsOfClasses.isDark ? variables.$input.$theme.$dark : '#fff',
        size: props.size,
        iconColor: variables.$select.$dropdown.$listItem.$iconColor,
    });

    const classesFormControl = useFormControlStyles({
        ...sharedPropsOfClasses,
        width: props.fullWidth ? `calc(100% - ${UIGetMarginLeftRight(props.margin)}px)` : convertNaturalSize(props.width, 'px'),
        size: props.size,
    });

    const classesPopover = usePopoverStyles({
        ...sharedPropsOfClasses,
        marginLeft: sharedPropsOfClasses.isDark ? '0px' : '0px',
    });

    const classesAutoComplete = useAutoCompleteStyles({
        ...sharedPropsOfClasses,
        textColor: sharedPropsOfClasses.isDark ? variables.$select.$dark.$textColor : variables.$select.$textColor,
        iconColor: sharedPropsOfClasses.isDark ? variables.$input.$theme.$darkColor : '#000',
    });

    const classesSelect = useSelectStyles({
        ...sharedPropsOfClasses,
        iconColor: sharedPropsOfClasses.isDark ? variables.$input.$theme.$darkColor : '#000',
        textColor: sharedPropsOfClasses.isDark ? variables.$select.$dark.$textColor : variables.$select.$textColor,
    });

    useEffect(() => { // Calculate Margin Bottom
        const bottomElementHeight = errorRef.current ? errorRef.current.offsetHeight + 2 :
            bottomWrapRef.current ? bottomWrapRef.current.offsetHeight + 2 : 0;
        setMarginBottom(bottomElementHeight /*marginTopBottom*/ + 'px');
    }, [required, errors, errorRef.current, helperText, bottomWrapRef.current]);


    // Get position of main Wrapper
    const generateMarginDiv = useCallback(() => UiGenerateMargin(props.margin, props.direction), [props.direction, props.margin]);

    const LabelProps = useMemo(() => ({
        disableAnimation: true,
        variant: 'filled',
        focused: false,
        shrink: false,
        ...(errors && {error: errors})
    }), [props]);

    const SelectProps = useMemo(() => ({
        disabled,
        value: value || '',
        displayEmpty: !!(!value && placeholder),
        renderValue: (e) => {
            if ((placeholder && !value)) {
                return <div className="default-value-empty">{placeholder}</div>
            }
            const currentValue = options.find(_e => _e.value === e);
            if (currentValue) {
                return <div>{currentValue.title}</div>
            }
        },
        ...(id && {id}),
    }), [props, options]);

    const SelectOptions = useMemo(() => {
        return options.map(item => <MenuItem value={item.value} key={item.value} classes={classesMenuItem}>
            <ListItem
                itemField={item}
                withAvatar={withAvatar}
                withIcon={withIcon}
            /></MenuItem>)
    }, [options, size, withAvatar, withIcon])

    const bottomWrap = useMemo(() => {
        if ((helperText || required) && !errors) {
            const text = helperText || (required ? 'Required *' : '');
            return (
                <div className={styles['bottom-wrap']} ref={bottomWrapRef}>
                    {text && <p className="helper-text">{text}</p>}
                </div>
            )
        } else if (errors) return (
            <span ref={errorRef} className={styles['error-line']}>{errors}</span>
        )
    }, [helperText, errors, errorRef, required]);

    const generateClassNameParent = useMemo(() => {
        return `${disabled ? 'disable-select-wrapper' : ''} ${props.className} ${selectOpen ? 'select-opened' : ''}`
    }, [disabled, props.className, selectOpen]);

    return (
        <FormControl classes={{root: classesFormControl.root}} disabled={disabled} className={generateClassNameParent} style={{...generateMarginDiv()}}>
            {label && <InputLabel
                classes={classesLabel}
                {...LabelProps}
            >{label.title + (props.required ? ' *' : '')}</InputLabel>}
            {autocomplete ? <Autocomplete
                disabled={disabled}
                multiple={multiple}
                className={multiple ? 'MuiMultiple_Autocomplete_field' : ''}
                disableCloseOnSelect={true}
                disableListWrap={false}
                classes={classesAutoComplete}
                options={options}
                getOptionSelected={(option, value) => option.title === value.title}
                renderOption={(option) => <div>{option.title}</div>}
                getOptionLabel={(option) => option.title}
                onOpen={() => togglePopover(true)}
                onClose={() => togglePopover(false)}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} variant="filled" focused={false} placeholder={placeholder}/>}
            /> : <Select
                MenuProps={{
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    getContentAnchorEl: null,
                    classes: {
                        paper: classesPopover.paper,
                    }
                }}
                onOpen={() => togglePopover(true)}
                onClose={() => togglePopover(false)}
                {...SelectProps}
                className={classesSelect.select}
                inputProps={{
                    classes: {
                        root: classesSelect.root,
                        icon: classesSelect.icon,
                    },
                }}
                onChange={handleChange}
            >
                {SelectOptions}
            </Select>}
            {bottomWrap}
        </FormControl>
    );
};
BrandSelect.defaultProps = {
    options: [],
    theme: 'light',
    size: 'md',
    margin: 0,
    multiple: false,
    withAvatar: false,
    withIcon: false,
    className: '',
    paperMarginTop: 0,
};

BrandSelect.propTypes = {
    className: PropTypes.string,
    withAvatar: PropTypes.bool,
    withIcon: PropTypes.bool,
    multiple: PropTypes.bool,
    autocomplete: PropTypes.bool,
    theme: PropTypes.string,
    readonly: PropTypes.bool,
    helperText: PropTypes.string,
    direction: PropTypes.string,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    size: PropTypes.string,
    refBind: PropTypes.any,
    name: PropTypes.string,
    label: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    errors: PropTypes.string,
    disabled: PropTypes.bool,
    margin: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    handleChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    paperMarginTop: PropTypes.number,
}
export default React.memo(BrandSelect);