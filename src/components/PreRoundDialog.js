import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LastChaserPanel from './LastChaserPanel';
import { toSignificant} from '../utils/number';
import { DialogContent } from '@material-ui/core';
import { LOTTERY_ADDRESS } from '../constants';
import LOTTERY_ABI from '../constants/abis/Lottery.json';
import { useContract, useWeb3React } from '../hooks';
import { BigNumber } from '@ethersproject/bignumber';
import { formatBalance } from '../utils/web3';

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
    const { onClose, round, open } = props;

    const [infos, setInfos] = useState([]);
    const { chainId } = useWeb3React();
    const contract = useContract(LOTTERY_ADDRESS[chainId], LOTTERY_ABI, false);
    useEffect(()=>{
        try{
            if(round>0)
            contract.getLastLotteryInfo().then((res)=>{
                var timestamps = [];
                var wons = [];
                var winners = res[0];
                var _infos = [];
                res[2].forEach(val => {
                    timestamps.push(BigNumber.from(val).toNumber())
                });
                res[3].forEach(val => {
                    wons.push(formatBalance(val))
                });
                if(winners && winners.length>0){
                    for(var i = 0; i < (winners).length; i++){
                        var date = new Date(timestamps[i] * 1000);
                        // Hours part from the timestamp
                        var hours = date.getHours();
                        // Minutes part from the timestamp
                        var minutes = "0" + date.getMinutes();
                        // Seconds part from the timestamp
                        var seconds = "0" + date.getSeconds();
                        // Will display time in 10:30:23 format
                        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                    
                        _infos.push({id:i+1, address:winners[i], time:formattedTime, won:toSignificant(wons[i],2)});
                    }
                }
                setInfos(_infos)
            })
        }
        catch(e){
            console.log(e)
        }
    },[contract, round])
    
    
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog id={'pre'} className={classes.dialog} onClose={handleClose} aria-labelledby="pre-dialog-title" open={open} maxWidth="md">
            <DialogTitle className={classes.title}>
                <div className={classes.rubicfont}>Round {round} winners</div>
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
    round: PropTypes.number.isRequired,
};