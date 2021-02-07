import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Popover from "@material-ui/core/Popover";
import {useDropDownPopoverStyles} from '../../../../UI/makeStylesUI';
import Link from 'next/link';
import {
    Button,
} from '../../../../../Shared/UI';

const Notifications = (props) => {
    const _count = props.data.length > 9 ? '9+' : props.data.length;
    const classesDropDown = useDropDownPopoverStyles({
        margin: '20px 0 0 62px',
        triangle: 'block',
        overflow: 'initial',
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <div className={`notifications-wrapper ${open ? 'notification-wrap-open' : ''}`} >
            <span className="icon-bell" onClick={(event) => setAnchorEl(event.currentTarget)}></span>
            { _count ? <span className="notifications-count">{_count}</span> : ''}
            <Popover
                classes={classesDropDown}
                id={id}
                open={open}
                anchorEl={anchorEl}
                PaperProps={{
                    style: {
                        width: '300px'
                    }
                }}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <ul className="notification-dropdown_popover">
                    <li className="not-reed">
                        <div className="img-wrapper img_thumbnail">
                            <img src="/images/avatar.png" alt="avatar" />
                        </div>
                        <div className="right-side_description">
                            <p>
                                Katinka invited you to participate in her advertisement
                                <Link href={'/'} prefetch={false}>
                                    <a>Potverdikkie lekker hoor dat neuken.</a>
                                </Link>
                                <span className="date-notification">
                                    <i className="icon-clock"></i>
                                    1d
                                </span>
                            </p>
                            <div className="btns-wrapper">
                                <Button
                                    icon={{className: 'icon-blocked', direction: 'left'}}
                                    margin={[0, 10, 0, 0]}
                                    width={100}
                                    size={'xs'}
                                    text="CTA"
                                    typeButton="white-bg"
                                />
                                <Button
                                    icon={{className: 'icon-checkmark', direction: 'left'}}
                                    // margin={10}
                                    width={100}
                                    size={'xs'}
                                    text="Accept"
                                    typeButton="primary"
                                />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="img-wrapper img_icon">
                            <span>K</span> {/*todo need to generate first latter from name*/}
                        </div>
                        <div className="right-side_description">
                            <p>
                                Epicurus in bonis sit voluptatem ipsam per se ipsam causam ista, quae dices. voluptatem
                                <span className="date-notification">
                                    <i className="icon-clock"></i>
                                    1d
                                </span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="img-wrapper img_icon">
                            <span>K</span> {/*todo need to generate first latter from name*/}
                        </div>
                        <div className="right-side_description">
                            <p>
                                Epicurus in bonis sit voluptatem ipsam per se ipsam causam ista, quae dices. voluptatem
                                <Link href={'/'} prefetch={false}>
                                    <a>'Advertisement title'.</a>
                                </Link>
                                <span className="date-notification">
                                    <i className="icon-clock"></i>
                                    1d
                                </span>
                            </p>
                            <div className="btns-wrapper">
                                <Button
                                    width={50}
                                    size={'xs'}
                                    text="CTA"
                                    typeButton="white-bg"
                                />
                            </div>
                        </div>
                    </li>
                </ul>
                <Link href={'/'} prefetch={false}>
                    <a className="see-all-notifications_popover">Alle notificaties bekijken</a>
                </Link>
            </Popover>
        </div>
    )
}

Notifications.defaultProps = {
    data: [],
}
Notifications.propTypes = {
    data: PropTypes.array,
}
export default React.memo(Notifications);