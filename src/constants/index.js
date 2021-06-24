
export const LOTTERY_ADDRESS = {
  3: process.env.REACT_APP_ROPSTEN_ADDRESS,
  56: process.env.REACT_APP_BSC_MAIN_ADDRESS,
  97: process.env.REACT_APP_BSC_TEST_ADDRESS
}

export const NetScanUrlPrefix = {
  3: "https://ropsten.etherscan.io/tx/",
  56: "https://bscscan.com/tx/",
  97: "https://testnet.bscscan.com/tx/"
}

export const NetworkContextName = 'NETWORK'