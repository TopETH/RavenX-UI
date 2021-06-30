import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '200px',
        margin: 'auto',
        zIndex: 1
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

export default function Timer(props){
    const classes = useStyles();

    const endtimestamp = props.endTimestamp;
    const [lefttime, setLefttime] = useState("00:00:00")
    
    useEffect(()=>{
        const timer = setInterval(()=>{
            var sec = '00';
            var min = '00';
            var hour = '00';
            const nowtimestamp = parseInt(new Date().getTime()/1000)
            if(endtimestamp-nowtimestamp>=0){
                sec = ('00' + ((endtimestamp-nowtimestamp) % 3600) % 60).slice(-2);
                min = ('00' + ((((endtimestamp-nowtimestamp)-sec) / 60)) % 60).slice(-2);
                hour = ('00' +   ((endtimestamp-nowtimestamp)-sec-min*60)/3600).slice(-2);
                setLefttime(hour+":"+min+":"+sec)
            }
            else{
                setLefttime("00:00:00")
            }
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [endtimestamp, setLefttime]);

    return(
        <div className={classes.container}>
            
            <div className={classes.timerTiles}>
                <div className={classes.timeTile}>{(lefttime.split(':'))[0].slice(0,1)}</div>
                <div className={classes.timeTile}>{(lefttime.split(':'))[0].slice(1,2)}</div>
                :
                <div className={classes.timeTile}>{(lefttime.split(':'))[1].slice(0,1)}</div>
                <div className={classes.timeTile}>{(lefttime.split(':'))[1].slice(1,2)}</div>
                :
                <div className={classes.timeTile}>{(lefttime.split(':'))[2].slice(0,1)}</div>
                <div className={classes.timeTile}>{(lefttime.split(':'))[2].slice(1,2)}</div>
            </div>
        </div>
    )
}