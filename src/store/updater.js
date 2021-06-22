import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { update } from './actions'
import LOTTERY_ABI from '../constants/abis/Lottery.json'
import { LOTTERY_ADDRESS } from '../constants'
import { useContract } from '../hooks/useContract'
import { BigNumber } from '@ethersproject/bignumber'
import { formatBalance } from '../utils/web3'
import { useWeb3React } from '@web3-react/core';

export default function Updater() {
    const { chainId } = useWeb3React();
    const dispatch = useDispatch();
    const contract = useContract(LOTTERY_ADDRESS[chainId], LOTTERY_ABI, false)

    useEffect(()=>{
        const dispatchResults = (res) =>{
            var putins = []; 
            var timestamps = [];
            var willWins = [];
            res[4].forEach(val => {
                putins.push(formatBalance(val))
            }); 
            res[5].forEach(val => {
                timestamps.push(BigNumber.from(val).toNumber())
            });
            res[6].forEach(val => {
                willWins.push(formatBalance(val))
            });
            var lotteryId = BigNumber.from(res[0]).toNumber()
            var currentState = BigNumber.from(res[2]).toNumber()
            var endingTimestamp = BigNumber.from(res[1]).toNumber()
            console.log({lotteryId, currentState,  cands: res[3], putins, timestamps, willWins, endingTimestamp})
    
            dispatch(update({ lotteryId:lotteryId,
                currentState:currentState, 
                candsOfWins:res[3], 
                putins:putins, 
                timestamps:timestamps, 
                willWins:willWins, 
                endingTimestamp:endingTimestamp}))
        }

        try{
            contract.getLotteryStatus().then((results)=>dispatchResults(results))
            console.log("updated")
            contract.on("NewEntry", (ef)=>{
                console.log("NewEvent")
                contract.getLotteryStatus().then((results)=>dispatchResults(results))
            })
        }
        catch(e){
            console.log(e)
        }
        return () => {
            try{
                contract.removeListener('NewEntry')
            }
            catch(e){

            }
        }
    }, [dispatch, contract])

    return null
}
