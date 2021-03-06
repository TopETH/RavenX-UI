import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { network } from '../connectors'
import { useInactiveListener, useEagerConnect } from '../hooks'
import { NetworkContextName } from '../constants'
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Web3ReactManager({ children }) {
  const { active } = useWeb3React()
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName)

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  // TODO think about not doing this at all
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network)
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active])

  // 'pause' the network connector if we're ever connected to an account and it's active
  useEffect(() => {
    if (active && networkActive) {
      network.pause()
    }
  }, [active, networkActive])

  // 'resume' the network connector if we're ever not connected to an account and it's active
  useEffect(() => {
    if (!active && networkActive) {
      network.resume()
    }
  }, [active, networkActive])

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true)
    }, 600)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null
  }


  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active && networkError) {
    return (
      <Snackbar open={true} autoHideDuration={6000} >
        <Alert  severity="error">
          Unknown error!
        </Alert>
      </Snackbar>
    )
  }

  // if neither context is active, spin
  if (!active && !networkActive) {
    return showLoader ? (
      
      <CircularProgress size={90} color="secondary" />
    ) : null
  }

  return children
}
