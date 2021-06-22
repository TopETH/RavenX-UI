import { InjectedConnector } from '@web3-react/injected-connector'

export const injected = new InjectedConnector({
    supportedChainIds: process.env.REACT_APP_SUPPORTED_CHAINS.split(',').map((id) => {
      return parseInt(id, 10);
  })
  })

