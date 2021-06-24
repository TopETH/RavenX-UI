import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { FaRegSmile } from '@react-icons/all-files/fa/FaRegSmile';
import { useWeb3React } from '@web3-react/core';

import { NetScanUrlPrefix } from '../constants'
import { changeAppStaus } from '../store/actions';
import { useLastTx } from '../store/hooks'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 196,
        background: '#1E2335 0% 0% no-repeat padding-box',
        border: '1px solid #262B3E',
        borderRadius: '8px',
        marginTop: '32px',
        textAlign: 'center',
        marginBottom: 18,
        zIndex: 1
    },
    smile: {
        color: '#0DAB76',
        width: 40,
        height: 40,
        marginTop: 12
    },
    message: {
        font: '16px/30px Rubik Regular',
        letterSpacing: '0px',
        color: '#F2F3F5',
        marginTop: 12,
        height: 19,
        lineHeight: 1.4
    },
    greeting:{
        font: '14px/30px Rubik Regular',
        letterSpacing: '0px',
        color: '#B1B6C3',
        height:17,
        marginTop: 8,
        lineHeight: 1.4
    },
    bscScan: {
        marginTop: 24,
        height: 17,
        lineHeight: 1.4,
        font: '14px/17px Rubik Regular',
        letterSpacing: '0px',
        color: '#E32858',
        cursor: 'pointer'
    },
    moreButton: {
        background: '#E32858 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 6px #E328584D',
        borderRadius: '8px',
        height: 40,
        textAlign: 'center',
        
    },
    buttonWrapper: {
        textAlign: 'center',
        position: 'relative',
        top: '-40px',
        marginBottom: '-40px'
    }

  }));

export default function ChaseResult(){
    const {chainId} = useWeb3React();
    const classes = useStyles();
    const dispatch = useDispatch();
    const txHash = useLastTx();
    const handleReEnter = ()=>{
        dispatch(changeAppStaus(1));
    }
    const handleView = ()=>{
        window.open(NetScanUrlPrefix[chainId]+txHash); window.focus();
    }
    return(
        <>
            <div className={classes.root}>
                <FaRegSmile className={classes.smile}/>
                <div className={classes.message}>Transaction successful</div>
                <div className={classes.greeting}>Thank you for entering the chase!</div>
                <div className={classes.bscScan} onClick={handleView}>View on BSCSCAN</div>
            </div>
            <div className={classes.buttonWrapper}>
                <Button style={{textTransform: 'none'}} className={classes.moreButton} variant="contained" color="secondary" onClick={handleReEnter}>Put in More</Button>
            </div>
        </>
    )
}