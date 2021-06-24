import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { DialogContent, Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme)=>({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialog: {
        padding: 24,
    },

    title:{
        textAlign: 'center',
        paddingBottom: 0,        
    },
    rubicfont:{
        font: '20px/30px Rubik Medium!important',
        color: '#F2F3F5',
    },
    typo:{
        textAlign: 'left',
        font: '16px/19px Rubik Regular',
        letterSpacing: '0px',
        color: '#FFFFFF'
    },
    panel:{
        width: '100%',
        display: 'flex',
        height: 62,
        background: '#1E2335 0% 0% no-repeat padding-box',
        borderRadius: 5,
        alignItems: 'center'
    },
    item:{
        width: '33%',
        textAlign: 'center'
    },
    percent:{
        font: '14px/17px Rubik Medium',
        color: '#FFFFFF',
        lineHeight: 1.7
    },
    label:{
        font: '14px/20px Rubik Regular',
        color: '#B1B6C3',
        lineHeight: 1.5
    },
    btn:{
        background: '#E32858 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 6px #E328584D',
        borderRadius: '8px',
        height: 40,
        textAlign: 'center',
        font: '16px/19px Rubik Regular',
        letterSpacing: '0px',
        color: '#F2F3F5',
        marginTop: 24,
    }
}));

export function RuleDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog id={'rule'} className={classes.dialog} onClose={handleClose} aria-labelledby="dialog-title" open={open} maxWidth="md">
            <DialogTitle className={classes.title}>
                <div className={classes.rubicfont}>Chase the Raven rules</div>
                <IconButton size="small" aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent style={{padding:24, paddingTop:20}}>
                <Typography className={classes.typo} gutterBottom>
                    1. Each round starts with 2 hours countdown
                </Typography>
                <Typography className={classes.typo} gutterBottom>
                    2. Each bid adds 5 seconds to the clock
                </Typography>
                <Typography className={classes.typo} gutterBottom>
                    3. The last 4 chasers are sharing the jackpot when countdown is over
                </Typography>
                <Typography className={classes.typo} gutterBottom>
                    4. Jackpot is divided proportionally to bidded amount
                </Typography>
                <Typography className={classes.typo} gutterBottom>
                    5. First place winner gets additional winning bonus
                </Typography>
                <Typography className={classes.typo} style={{textAlign: 'center', paddingTop:10, marginBottom:6}} paragraph>
                    Each transaction is split:
                </Typography>

                <div className={classes.panel} >
                    <div className={classes.item}>
                        <div className={classes.percent}>40%</div>
                        <div className={classes.label}>current round</div>
                    </div>
                    <div className={classes.item}>
                        <div className={classes.percent}>40%</div>
                        <div className={classes.label}>next round</div>
                    </div>
                    <div className={classes.item}>
                        <div className={classes.percent}>20%</div>
                        <div className={classes.label}>marketing funds</div>
                    </div>
                </div>
                <div style={{textAlign:'center'}}>
                    <Button style={{textTransform: 'none'}} className={classes.btn} variant="contained"  color="secondary" onClick={handleClose}>I understand the rules</Button>
                </div>
            </DialogContent>
            
        </Dialog>
    );
}

RuleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};