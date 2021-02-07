import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import UseStyles from './styles';
import {
    Button,
    Input,
    Select,
} from '../../../UI';

const Search = (props) => {
    const [formHeight, setFormHeight] = useState(0);
    const styles = UseStyles({
        formHeight: formHeight,
    });
    const formRef = useRef();
    const [category, setCategory] = useState('*');

    const categories = [
        {title: 'Alle categorieën', value: '*'},
        {title: 'Events', value: 'events'},
        {title: 'Dames van plazier', value: 'plaizer'},
        {title: 'Message', value: 'message'},
        {title: 'SM', value: 'sm'},
    ];

    useEffect(() => {
        if (formRef.current) setFormHeight(formRef.current.getBoundingClientRect().height)
    }, [formRef.current, props.openMobile])

    return (
        <div className={`${styles['search-wrapper']} ${props.openMobile ? 'opened_mobile' : ''}`}>
            <form ref={formRef} className="main-search-form">
                <Input
                    className="search-input"
                    name="location"
                    type="text"
                    // value={88}
                    fullWidth={true}
                    placeholder="Waar ben je naar op zoek?"
                    size="md"/>
                <Select
                    className="search-select"
                    disabled={false}
                    disableScrollLock={false}
                    width={'225'}
                    placeholder="Alle categorieën"
                    value={category}
                    paperMarginTop={4}
                    // margin={[0, 10]}
                    theme={'light'}
                    handleChange={(e) => setCategory(e.target.value)}
                    options={categories}
                    size={'md'}
                />
                <Button
                    className="search-button"
                    icon={{className: 'icon-search', direction: 'left'}}
                    // margin={10}
                    size={'md'}
                    text="Zoek"
                    typeButton="cta"
                />
            </form>
        </div>
    )
}
Search.propTypes = {
    openMobile: PropTypes.bool,
}
export default Search;