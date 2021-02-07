import React from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";

const ShoppingCart = React.memo((props) => {
    const _count = props.count > 9 ? '9+' : props.count;

    return (
        <Link href="/cart" prefetch={false}>
            <a className="cart-wrapper">
                <span className="icon-cart"></span>
                <span className="cart-count">{_count}</span>
            </a>
        </Link>
    )
}, ((prevProps, nextProps) => nextProps.count === prevProps.count))

ShoppingCart.defaultProps = {
 count: 0,
}
ShoppingCart.propTypes = {
    count: PropTypes.number,
}
export default ShoppingCart;