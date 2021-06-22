import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { ethers } from 'ethers'
// import { SUPPORTED_CHAINIDS } from '../constants'
// import BEP20_ABI from '../assets/contracts/bep20_abi.json'

// export const isRightNetwork = (chainId) => {
//   return SUPPORTED_CHAINIDS.includes(chainId)
// }

export function isAddress(value) {
  try {
      return getAddress(value)
  } catch {
      return false
  }
}
export function isAddressString(value) {
  try {
      return getAddress(value)
  } catch {
      return ''
  }
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library
}

export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account))
}

// export async function getBalance(address, token, library) {
//   try {
//     if(!isAddress(token) || token === AddressZero) {
//       return await library.getBalance(address)
//     }
//     const contract = getContract(token, BEP20_ABI, library)
//     return await contract.balanceOf(address)
//   } catch(e) {
//     console.log(e)
//   }
//   return 0
// }

// export async function getAllowance(address, spender, token, library) {
//   try {
//     if(!isAddress(token) || token === AddressZero) {
//       throw Error(`Invalid 'token' parameter '${token}'.`)
//     }
//     const contract = getContract(token, BEP20_ABI, library)
//     return await contract.allowance(address, spender)
//   } catch(e) {
//     console.log(e)
//   }
//   return 0
// }

export const formatBalance = (value, decimals = 18, maxFraction = 0) => {
  try {
    const formatted = ethers.utils.formatUnits(value, decimals)
    if (maxFraction > 0) {
        const split = formatted.split('.')
        if (split.length > 1) {
            return split[0] + '.' + split[1].substr(0, maxFraction)
        }
    }
    return formatted
  } catch(e) {
    console.log(e)
  }
  return 0
}

export const displayAddress = (address)=>{
  return address.slice(0,2)+address.slice(2).toUpperCase().slice(0,3) + "..." + address.toUpperCase().slice(-4)
}