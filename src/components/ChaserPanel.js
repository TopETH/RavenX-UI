import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { displayAddress } from '../utils/web3';
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { useWeb3React } from '../hooks';
import { AddressZero } from '@ethersproject/constants';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:8,
        paddingLeft: '5%',
        paddingRight: '5%',
        background: '#151929 0% 0% no-repeat padding-box',
        borderRadius: '5px',
        height: 62,
        minWidth:"220px",
        zIndex: 2,
        display: 'flex'
      },
    col1:{
        width: "12%",
        textAlign: "left",
        color: '#E32858',
        alignSelf: 'center',
        font: '14px/30px Rubik Regular',
        [theme.breakpoints.up('md')]: {
            font: '16px/30px Rubik Regular',            
        },
    },
    col2:{
        width: "35%",
        textAlign: "left",
        alignSelf: 'center',
    },
    col3:{
        width: "26%",
        textAlign: "right",
        font: '14px/30px Rubik Regular',
        letterSpacing: '0px',
        color: '#F2F3F5',
        alignSelf: 'center',
        paddingLeft: 5,
        [theme.breakpoints.up('md')]: {
            font: '16px/30px Rubik Regular',
        },
    },
    col4:{
        width: "27%",
        paddingLeft: 5,
        textAlign: "right",
        font: '14px/30px Rubik Regular',
        letterSpacing: '0px',
        color: '#F2F3F5',
        alignSelf: 'center',
        [theme.breakpoints.up('md')]: {
            font: '16px/30px Rubik Regular',            
        },
    },
    addr:{
        font: '12px/30px Rubik Regular',
        lineHeight: 1,
        letterSpacing: '0px',
        color: '#FFFFFF',
        height: 17,
        [theme.breakpoints.up('md')]: {
            font: '14px/17px Rubik Medium',
        },
    },
    clock:{
        font: '12px/30px Rubik Regular',
        letterSpacing: '0px',
        color: '#B1B6C3',
        height: 17,
        marginTop: 4,
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            font: '14px/26px Rubik Regular',
        },
    }


}));
export default function ChaserPanel(props){
    const classes = useStyles();
    const { account } = useWeb3React();
    const id = props.chaserInfo['id'];
    const address = props.chaserInfo['address'];
    const time = props.chaserInfo['time'];
    const putIn = props.chaserInfo['putin'];
    const willIn = props.chaserInfo['willwin'];
    return(
        <div className={classes.root} style={account===address?{border: "1px solid #E32858"}:address===AddressZero?{display:'none'}:{}}>
            <span className={classes.col1}>{id===1?'1st': id===2?'2nd': id===3?'3rd':'4th'}</span>
            <span className={classes.col2}>
                <div className={classes.addr}>
                    {account===address? "You" : displayAddress(address)}
                </div>
                <div className={classes.clock}>
                    <AiOutlineClockCircle/>
                    <div style={{marginLeft:8, lineHeight:1.0}}>{time}</div>
                </div>
                
            </span>
            <span className={classes.col3}>{putIn} BNB</span>
            <span className={classes.col4}>{willIn} BNB</span>
        </div>
    )
}