import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useWeb3React } from '@web3-react/core'

import StyledPaper from '../components/StyledPaper';
import { injected } from '../connectors'
import { useAppStatus, useRound, useJackPot } from '../store/hooks'
import { useEndingTimestamp } from '../store/hooks'
import ChaseForm from './ChaseForm';
import ChaseResult from './ChaseResult';
import Timer from '../components/Timer';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:8,
        padding: 24,
        position: 'relative',
        textAlign: 'center',
        zIndex: 1
      },
    jackpot: {
        font: '16px/30px Rubik Regular',
        letterSpacing: '0px',
        color: '#F2F3F5',
        textAlign: 'center',
        height: '19px',
        lineHeight: 1.3,
        marginBottom: '8px'
    },
    paper: {
        padding: 24,
        minWidth:"220px",
        paddingRight: '5%',
        paddingLeft: '5%'
    },
    badgeBox: {
        position: 'absolute',
        width: 76,
        height:22,
        top: 12,
        left: 'calc(50% - 38px)',
        background: '#E32858 0% 0% no-repeat padding-box',
        borderRadius: '4px',
        opacity: 1,
        textAlign: 'center',
        font: '14px/17px Rubik Medium',
        letterSpacing: '0.7px',
        color: '#F5F5F5',
        lineHeight: 1.7   
    },
    connectBtn: {
        background: '#E32858 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 6px #E328584D',
        borderRadius: '8px',
        height: 48,
        textAlign: 'center',
        font: '16px/19px Rubik Regular',
        letterSpacing: '0px',
        color: '#F2F3F5',
        marginTop: 24
    }

  }));

export default function ChasingPanel(){

    const classes = useStyles();
    const { activate, active } = useWeb3React()
    const round = useRound();
    const status = useAppStatus();
    const jackpot = useJackPot();
    const endtimestamp = useEndingTimestamp();

    const handleConnect = ()=>{
        activate(injected)
    }

    return(
        <div className={classes.root}>
            <div className={classes.badgeBox}>Round {round}</div>
            <StyledPaper className={classes.paper}>
                <div className={classes.jackpot}>{jackpot} BNB Jackpot</div>
                <Timer endTimestamp = {endtimestamp}/>
                {(
                   !active?
                   <Button style={{textTransform: 'none'}} className={classes.connectBtn} variant="contained"  color="secondary" onClick={handleConnect}>Connect wallet to enter the chase</Button>:
                   status===1?<ChaseForm/>:<ChaseResult/>
                )}
            </StyledPaper>
        </div>
    
    )
}