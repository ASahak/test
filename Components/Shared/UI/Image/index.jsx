import React, {useState, useEffect} from 'react';
import useImage from "../../../../Hooks/use-image";
import PropTypes from 'prop-types';

const Image = ({ src, alt = "", defaultSrc }) => {
    const { loaded, error } = useImage({ src: src || defaultSrc });
    const [srcAvatar, setSrcAvatar] = useState(null);
    const [srcDefault, setSrcDefault] = useState(false);
    useEffect(() => {
        if (loaded) {
            if (!src) setSrcDefault(true);
            setSrcAvatar(src || defaultSrc);
        }
        if (error) {
            setSrcAvatar('/images/notFound.png')
        }
    }, [loaded, src, error]);

    return (
        <img
            className={`${(!loaded && !error) ? 'till-loading' : ''} ${error ? 'not-found': ''} ${srcDefault ? 'default-avatar' : ''}`}
            src={srcAvatar || '/images/loading.gif'} alt={alt || 'dynamic-image-hok'} />
    )
};
Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    defaultSrc: PropTypes.string,
};
export default React.memo(Image);
