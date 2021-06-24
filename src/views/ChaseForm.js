import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Button, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import NumberFormat from 'react-number-format';

import { LOTTERY_ADDRESS } from '../constants';
import LOTTERY_ABI from '../constants/abis/Lottery.json';
import { useContract } from '../hooks';
import { changeAppStaus, sestLastTx } from '../store/actions';
import { useAppStatus } from '../store/hooks';
import { formatBalance }  from '../utils/web3';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '92px',
        background: '#151929 0% 0% no-repeat padding-box',
        border: '1px solid #262B3E',
        borderRadius: '8px',
        marginTop: '32px',
        zIndex: 1
    },
    wrapper : {
        marginTop:12,
        marginBottom:12,
        height: 68,
        alignContent: 'center'
    },
    label:{
        textAlign: 'center',
        font: '14px/30px Rubik Regular',
        letterSpacing: '0px',
        color: '#B1B6C3',
        height: 17,
        lineHeight: 1.5,
    },
    input:{
        float: "left",
        font: '36px/43px Rubik Medium',
        letterSpacing: '0px',
        color: '#F2F3F5',
        backgroundColor: 'transparent',
        border: 'none',
        width: '49.5%',
        height: 43,
        padding: '0 !important',
        outline: 'none !important',
        textAlign: 'right',
    },
    inputLabel:{
        textAlign: 'center',
        font: '36px/43px Rubik Regular',
        letterSpacing: '0px',
        color: '#F2F3F5',
        width: 74,
        height: 34,
        marginLeft: 8,
        float: "left"
    },
    inputWrapper:{
        marginTop: 8,
    },
    chaseButton:{
        background: '#E32858 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 6px #E328584D',
        borderRadius: '8px',
        textAlign: 'center',
        font: '16px/19px Rubik Regular',
        letterSpacing: '0px',
        color: '#F2F3F5',
        width:'100%',
        height: 48,
        marginTop: 24,
    },
    disabledchaseButton:{
        background: '#E32858 0% 0% no-repeat padding-box',
        boxShadow: '0px 3px 6px #E328584D',
        borderRadius: '8px',
        textAlign: 'center',
        font: '16px/19px Rubik Regular',
        letterSpacing: '0px',
        color: '#F2F3F5',
        width:'100%',
        height: 48,
        marginTop: 24,
        opacity:0.2,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    }
  }));

export default function ChaseForm(){

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };
    const { library, account, chainId } = useWeb3React();
    const status = useAppStatus();
    const [amount, setAmout] = useState('')
    const [balance, setBalance] = useState();   
    useEffect(()=>{
        try{
            library.getBalance(account).then((bal)=>{
                setBalance(formatBalance(bal, 18, 2));
            })
        }
        catch(e){
           
        }
    }, [amount, account, library])
    
    const contract = useContract(LOTTERY_ADDRESS[chainId], LOTTERY_ABI, true)

    const handleInputChange = (event)=>{
        setAmout(event.target.value)
    }

    const dispatch = useDispatch()

    const handleEnterChase = async ()=>{
        try{
            const overrides = {
                value: ethers.utils.parseEther(amount)
            }
            const tx = await contract.enter(overrides);
            console.log(tx)
            console.log(tx.hash)
            dispatch(sestLastTx(tx.hash))
            dispatch(changeAppStaus(3))
        }
        catch(err){
            setOpen(true);
            dispatch(changeAppStaus(1))
        } 
    }

    return(
        <>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.label}>
                        Amount to put in. Min. 0.01 BNB
                    </div>
                    <div className={classes.inputWrapper}>
                        {
                            <NumberFormat value={amount} placeholder="0.00" className={classes.input}  decimalScale={2} onChange={handleInputChange} />
                        }
                        <span className={classes.inputLabel}>BNB</span>
                    </div>               
                </div>
            </div>
            {
                parseFloat(balance)<=parseFloat(amount)?
                <div style={{textTransform: 'none'}} className={  classes.disabledchaseButton } >Insufficient BNB balance</div>
                :
                amount!=='' && parseFloat(amount)!==0 && status!==2?
                <Button style={{textTransform: 'none'}} className={  classes.chaseButton }  variant="contained" color="secondary" onClick={handleEnterChase}>Enter the chase</Button>
                :
                <div style={{textTransform: 'none'}} className={  classes.disabledchaseButton } >Enter the chase</div>
            }
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Lottery game has ended!
                </Alert>
            </Snackbar>
        </>
    )
}