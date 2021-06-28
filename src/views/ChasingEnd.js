import React from 'react';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StyledPaper from '../components/StyledPaper';
import { useRound } from '../store/hooks'
import { useEndingTimestamp } from '../store/hooks'
import Timer from '../components/Timer';
import { utcformat } from '../utils/number';
import { useLastRoundInfo } from '../hooks';
import LastChaserPanel from '../components/LastChaserPanel'
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:8,
        padding: 24,
        position: 'relative',
        textAlign: 'center',
        zIndex: 1
      },
    paper: {
        padding: 24,
        minWidth:"220px",
        position: 'relative',
        paddingRight: '5%',
        paddingLeft: '5%'
    },
    badgeBox: {
        position: 'relative',
        height:22,
        width: 146,
        top: -35,
        background: '#E32858 0% 0% no-repeat padding-box',
        borderRadius: '4px',
        margin: '0 auto',
        textAlign: 'center',
        font: '14px/17px Rubik Medium',
        letterSpacing: '0.7px',
        color: '#F5F5F5',
        lineHeight: 1.7   
    },
    timerC:{
        marginTop: -20,
    },
    startTime:{
        textAlign: 'center',
        font: '14px/20px Rubik Regular',
        color: '#B1B6C3',
        marginTop: 8
    },
    divider:{
        marginTop: 24,
        backgroundColor: '#211d2f',
        marginLeft: '-5%',
        marginRight: '-5%'
    },
    greeting:{
        font: '20px/30px Rubik Medium',
        color: '#F2F3F5',
        marginTop: 24
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
        marginTop: 24,
        height: 18,
        textAlign: 'left',
        font: '14px/26px Rubik Regular',
        letterSpacing: '0px',
        color: '#B1B6C3',
        display: 'flex',
        paddingLeft: '5%',
        paddingRight: '5%',
        lineHeight: 1.5,
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

export default function ChasingEnd(){

    const classes = useStyles();
    const round = useRound();
    const endtimestamp = useEndingTimestamp();

    const infos = useLastRoundInfo();

    return(
        <div className={classes.root}>
            <StyledPaper className={classes.paper}>
                <div className={classes.badgeBox}>Round {round+1} starts in:</div>
                <div className = {classes.timerC}>
                    <Timer endTimestamp = {endtimestamp+3600}/>
                </div>
                <div className={classes.startTime}>
                    {utcformat((endtimestamp+3600) * 1000)}
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.greeting}>
                    Congratulations to round {round} winners:
                </div>
                <div className={classes.header} >
                    <span className={classes.col1}>#</span>
                    <span className={classes.col2}>Chaser</span>
                    <span className={classes.col3}>Won</span>
                </div>
                {
                    infos!==null && infos.map((info)=>{
                        return (<LastChaserPanel key={info['id']} chaserInfo={info}/>)
                    })
                }
            </StyledPaper>
        </div>
    
    )
}