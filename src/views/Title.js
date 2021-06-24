import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: 32,
        textAlign: 'center',
        font: '48px/57px Rubik Medium',
        letterSpacing: '0px',
        color: '#FFFFFF',
        opacity: 1,
        zIndex: 1
    },
    subtitle: {
        marginTop: 4,
        textAlign: 'center',
        font: '14px Rubik Regular',
        letterSpacing: '0px',
        color: '#B1B6C3',
        opacity: 1
    }
  }));

export default function Title(){
    const classes = useStyles();
    return(
        <div>
            <div className={classes.title}>Chase the Raven</div>
            <div className={classes.subtitle}>
            Last four players who enter the chase will share the jackpot
            </div>
        </div>
    )
}
