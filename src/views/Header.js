import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useWeb3React } from '@web3-react/core';

import logo from '../assets/img/logo.png';
import signOutIcon from '../assets/img/sign-out.png';
import {injected} from '../connectors'
import '../raven.css';
import { displayAddress } from '../utils/web3';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '23px',
    paddingLeft: '24px',
    paddingRight: '24px',
    margin: '0 auto',
    height: '32px',
    display: 'flex',
    opacity: 1,
    zIndex: 1
  },
  exitIcon: {
    width: 16,
    height: 16,
    fontSize: 16,
    letterSpacing: '0px',
    color: '#B1B6C3'    
  },
  address:{
    fontFamily: 'Rubik Medium',
    letterSpacing: '0px',
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 2.3,
    marginRight:  7
  },
  connectBtn:{
    background: '#E32858 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 6px #E328584D',
    borderRadius: '8px',
    height: 40,
    width: 70,
    [theme.breakpoints.up('md')]: {
            width: 150,
        },
    font: '16px/19px Rubik Regular',
    letterSpacing: '0px',
    color: '#FFFFFF'
  },
  logo:{
    cursor: 'pointer'
  }
}));

export default function Header() {

  const classes = useStyles();
  const { deactivate, account, activate, active } = useWeb3React();

  const handleConnectClick = () =>{
    activate(injected);
  }

  const handleDisconnectClick = ()=>{
    deactivate();
  }

  const handleGotoHomepage = ()=>{
    document.location = "https://ravenxapi.xyz/"
  }

  return (
    <div className={classes.root}>
      <img className={classes.logo} src={logo} edge="start" alt="logo" onClick={handleGotoHomepage}/>
      <div style={{flexGrow:1}}>
      </div>
      {
        !active?
        <Button style={{textTransform: 'none'}} className={classes.connectBtn} variant="contained"  color="secondary" onClick={handleConnectClick}>Connect wallet</Button>
        :
        <><div className={classes.address}>
        {displayAddress(account)}
        </div>
        <IconButton color="inherit" style={{width:16}} edge="end" onClick={handleDisconnectClick}>
          <img className={classes.exitIcon} src={signOutIcon} alt=" "/>
        </IconButton></>
      }
    </div>
  );
}
