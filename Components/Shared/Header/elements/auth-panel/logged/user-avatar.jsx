import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../../../UI/Image';
import Link from 'next/link';

const UserAvatar = (props) => {
    return (
        <Link href="/user-account" prefetch={false}>
            <a className="avatar-wrapper">
                <Image src={props.src} defaultSrc="/images/avatar.png"/>
            </a>
        </Link>
    )
}
UserAvatar.propTypes = {
    src: PropTypes.string,
}
export default React.memo(UserAvatar);