import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ShoppingCart from './shopping-cart';
import Notifications from './notifications';
import UserAvatar from './user-avatar';

const Logged = (props) => {
    const [user, setUser] = useState({ // todo need to get from API via redux
        cartCount: 10,
        notifications: [
            {},
            {},
            {},
        ],
        avatarSrc: '',
    });

    return (
        <>
            {user.cartCount > 0 ? <ShoppingCart count={user.cartCount}/> : ''}
            <Notifications data={user.notifications}/>
            <UserAvatar src={user.avatarSrc} />
        </>
    )
}
Logged.propTypes = {};
export default Logged;