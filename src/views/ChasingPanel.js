import React from 'react';
import StyledPaper from '../components/StyledPaper';
import { makeStyles } from '@material-ui/core/styles';
import Timer from './Timer';
import ChaseForm from './ChaseForm';
import ChaseResult from './ChaseResult';
import {Button} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core'
import {useAppStatus, useRound} from '../store/hooks'
import {injected} from '../connectors'
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:8,
        padding: 24,
        position: 'relative',
        textAlign: 'center'
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
    // const [newChase, setNewChase] = useState(true);
    const status = useAppStatus();

    const handleConnect = ()=>{
        activate(injected)
    }

    return(
        <div className={classes.root}>
            <div className={classes.badgeBox}>Round {round}</div>
            <StyledPaper className={classes.paper}>
                <Timer/>
                {(
                   !active?
                   <Button style={{textTransform: 'none'}} className={classes.connectBtn} variant="contained"  color="secondary" onClick={handleConnect}>Connect wallet to enter the chase</Button>:
                   status===3?<ChaseResult/>:<ChaseForm/>
                   

                )}
                
            </StyledPaper>
        </div>
    
    )
}