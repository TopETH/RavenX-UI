import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from './Network'

export const injected = new InjectedConnector({
    supportedChainIds: process.env.REACT_APP_SUPPORTED_CHAINS.split(',').map((id) => {
      return parseInt(id, 10);
  })
})

const POLLING_INTERVAL = 12000

const RPC_URLS = {
      3: "https://ropsten.infura.io/v3/38c9fb1c90154d9c822c10724073fc46",
      56: "https://bsc-dataseed1.binance.org",
      97: "https://data-seed-prebsc-1-s1.binance.org:8545"
    };
export const network = new NetworkConnector({
  urls: { 3: RPC_URLS[3], 56: RPC_URLS[56], 97: RPC_URLS[97]},
  defaultChainId: 3,
  pollingInterval: POLLING_INTERVAL
})

