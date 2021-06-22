import React, { useEffect } from 'react';
import {useEndingTimestamp, useJackPot} from '../store/hooks'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import {setLeftTimestamp} from '../store/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '200px',
        margin: 'auto'
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
    timeTile:{
        width: '28px',
        height: '35px',
        background: '#262B3E 0% 0% no-repeat padding-box',
        borderRadius: '4px',
        marginLeft: '2px',
        marginRight: '2px',
        textAlign: 'center',
        font: '28px/33px Rubik Medium',
        letterSpacing: '0px',
        color: '#F2F3F5',
        lineHeight: 1.34
    },
    timerTiles: {
        width: '100%',
        height: 35,
        display: 'flex',
        font: '16px/30px Rubik Regular',
        letterSpacing: '0px',
        color: '#B1B6C3',
        lineHeight: 2.1
    }
  }));

export default function Timer(){
    const classes = useStyles();
    const jackpot = useJackPot();
    const endtimestamp = useEndingTimestamp();
    const dispatch = useDispatch();
    var sec = '00';
    var min = '00';
    var hour = '00';

    if(endtimestamp>0){
        sec = ('00' + (endtimestamp % 3600) % 60).slice(-2);
        min = ('00' + (((endtimestamp-sec) / 60)) % 60).slice(-2);
        hour = ('00' +   (endtimestamp-sec-min*60)/3600).slice(-2);
    }

    useEffect(()=>{
        const timer = setInterval(()=>{
            dispatch(setLeftTimestamp(endtimestamp-1))
                
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
        
    });

    return(
        <div className={classes.root}>
            <div className={classes.jackpot}>{jackpot} BNB Jackpot</div>
            <div className={classes.timerTiles}>
                <div className={classes.timeTile}>{hour.slice(0,1)}</div>
                <div className={classes.timeTile}>{hour.slice(1,2)}</div>
                :
                <div className={classes.timeTile}>{min.slice(0,1)}</div>
                <div className={classes.timeTile}>{min.slice(1,2)}</div>
                :
                <div className={classes.timeTile}>{sec.slice(0,1)}</div>
                <div className={classes.timeTile}>{sec.slice(1,2)}</div>
            </div>
        </div>
    )
}