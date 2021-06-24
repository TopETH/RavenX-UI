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
        background: '#1E2335 0% 0% no-repeat padding-box',
        borderRadius: '5px',
        height: 62,
        minWidth:"180px",
        zIndex: 2,
        display: 'flex'
      },
    col1:{
        width: "15%",
        textAlign: "left",
        color: '#E32858',
        alignSelf: 'center',
        font: '14px/30px Rubik Regular',
        [theme.breakpoints.up('md')]: {
            font: '16px/30px Rubik Regular',            
        },
    },
    col2:{
        width: "45%",
        textAlign: "left",
        alignSelf: 'center',
    },

    col3:{
        width: "40%",
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
export default function LastChaserPanel(props){
    const classes = useStyles();
    const { account } = useWeb3React();
    const id = props.chaserInfo['id'];
    const address = props.chaserInfo['address'];
    const time = props.chaserInfo['time'];
    const willIn = props.chaserInfo['won'];
    return(
        <div className={classes.root} style={account===address?{border: "1px solid #E32858"}:address===AddressZero?{display:'none'}:{}}>
            <span className={classes.col1}>{id===1?'1st': id===2?'2nd': id===3?'3rd':'4th'}</span>
            <span className={classes.col2}>
                <div className={classes.addr}>
                    {account===address? "You" : displayAddress(address)}
                </div>
                <div className={classes.clock}>
                    <AiOutlineClockCircle/>
                    <div style={{marginLeft:8, lineHeight:1.2}}>{time}</div>
                </div>
                
            </span>
            <span className={classes.col3}>{willIn} BNB</span>
        </div>
    )
}