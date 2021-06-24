import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LastChaserPanel from './LastChaserPanel';
import { toSignificant} from '../utils/number';
import { DialogContent } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialog: {
        backgroundColor: "red",
        padding: 24,
    },
    col1:{
        width: "15%",
        textAlign: "left"
    },
    col2:{
        width: "45%",
        textAlign: "left"
    },
    col3:{
        width: "40%",
        textAlign: "right"
    },
    header:{
        marginTop: 16,
        height: 18,
        textAlign: 'left',
        font: '14px/26px Rubik Regular',
        letterSpacing: '0px',
        color: '#B1B6C3',
        display: 'flex',
        paddingLeft: '5%',
        paddingRight: '5%',
        lineHeight: 1.5,
        minWidth:"180px"
    },
    title:{
        textAlign: 'center',
        paddingBottom: 0,        
    },
    rubicfont:{
        font: '20px/30px Rubik Medium!important',
        color: '#F2F3F5',
    }
}));

export function PreRoundDialog(props) {
    const classes = useStyles();
    const { onClose, data, open } = props;
    console.log(data)
    var infos = [];
    if(data.winners && data.winners.length>0){
        for(var i = 0; i < (data.winners).length; i++){
            var date = new Date(data.timestamps[i] * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();
            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        
            infos.push({id:i+1, address:data.winners[i], time:formattedTime, won:toSignificant(data.wons[i],2)});
        }
    }
    
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog classes={classes.dialog} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="md">
            <DialogTitle className={classes.title}>
                <div className={classes.rubicfont}>Round {data.round} winners</div>
                <IconButton size="small" aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent style={{padding:24, paddingTop:5}}>
                <div className={classes.header} >
                    <span className={classes.col1}>#</span>
                    <span className={classes.col2}>Chaser</span>
                    <span className={classes.col3}>Won</span>
                </div>
                {
                    infos.map((info)=>{
                        return (<LastChaserPanel key={info['id']} chaserInfo={info}/>)
                    })
                }
            </DialogContent>
            
        </Dialog>
    );
}

PreRoundDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
};