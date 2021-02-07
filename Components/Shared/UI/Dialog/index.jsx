import React from 'react';
import PropTypes from 'prop-types';
import UseStyles from './styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    useDialogStyles
} from '../makeStylesUI';

const SimpleDialog = (props) => {
    const styles = UseStyles();
    const classesDialog = useDialogStyles();

    return (
        <Dialog
            classes={classesDialog}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={props.fullWidth}
            maxWidth={props.maxWidth}
        >
            {props.title ? <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle> : null}
            <DialogContent>
                {props.children}
            </DialogContent>
            {props.actions ? <DialogActions data-vertical={props.actionsVertical}>
                {props.actions.cancel ? <button onClick={props.onClose}>
                    {props.actions.cancel}
                </button> : null}
                {props.actions.ok ? <button onClick={props.onOk} disabled={props.disableOkBtn}>
                    {props.actions.ok}
                </button> : null}
            </DialogActions> : null}
        </Dialog>
    )
}

SimpleDialog.defaultProps = {
    open: false,
    fullWidth: false,
    maxWidth: 'xs',
    actionsVertical: false,
    disableOkBtn: false,
};
SimpleDialog.propTypes = {
    actionsVertical: PropTypes.bool,
    open: PropTypes.bool,
    disableOkBtn: PropTypes.bool,
    maxWidth: PropTypes.string,
    fullWidth: PropTypes.bool,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    title: PropTypes.string,
    actions: PropTypes.shape({
        cancel: PropTypes.string,
        ok: PropTypes.string,
    }),
}
export default React.memo(SimpleDialog);
