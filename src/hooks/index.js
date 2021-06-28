import { useState, useMemo, useEffect } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { isMobile } from 'react-device-detect'

import { injected } from '../connectors'
import { NetworkContextName } from '../constants'
import { getContract } from '../utils/web3'
import { LOTTERY_ADDRESS } from '../constants';
import LOTTERY_ABI from '../constants/abis/Lottery.json';
import { BigNumber } from '@ethersproject/bignumber';
import { formatBalance } from '../utils/web3';
import { toSignificant} from '../utils/number';

export function useWeb3React() {
  const context = useWeb3ReactCore()
  const contextNetwork = useWeb3ReactCore(NetworkContextName)

  return context.active ? context : contextNetwork
}

export function useEagerConnect() {
  const { activate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          setTried(true)
        }
      }
    })
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const { ethereum } = window

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch(() => {})
      }

      const handleAccountsChanged = accounts => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch(() => {})
        }
      }

      const handleNetworkChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch(() => {})
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('networkChanged', handleNetworkChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }

    return () => {}
  }, [active, error, suppress, activate])
}

// returns null on errors
export function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useWeb3React()

  return useMemo(() => {
    try {
      return getContract(address, ABI, library, withSignerIfPossible ? account : undefined)
    } catch {
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useLastRoundInfo(){
  const [infos, setInfos] = useState(null);
  const { chainId } = useWeb3React();
  const contract = useContract(LOTTERY_ADDRESS[chainId], LOTTERY_ABI, false);
  useEffect(()=>{
      try{
          contract.getLastLotteryInfo().then((res)=>{
              var timestamps = [];
              var wons = [];
              var winners = res[0];
              var _infos = [];
              res[2].forEach(val => {
                  timestamps.push(BigNumber.from(val).toNumber())
              });
              res[3].forEach(val => {
                  wons.push(formatBalance(val))
              });
              if(winners && winners.length>0){
                  for(var i = 0; i < (winners).length; i++){
                      var date = new Date(timestamps[i] * 1000);
                      // Hours part from the timestamp
                      var hours = date.getHours();
                      // Minutes part from the timestamp
                      var minutes = "0" + date.getMinutes();
                      // Seconds part from the timestamp
                      var seconds = "0" + date.getSeconds();
                      // Will display time in 10:30:23 format
                      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                  
                      _infos.push({id:i+1, address:winners[i], time:formattedTime, won:toSignificant(wons[i],2)});
                  }
              }
              setInfos(_infos) ;
          })
      }
      catch(e){
        
      }
  })
  return infos
}


