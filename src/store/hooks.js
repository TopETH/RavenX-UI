import { useSelector } from 'react-redux'

import { toSignificant } from '../utils/number'


export function useAppStatus() {
  return useSelector(state => state.status)
}
export function useEndingTimestamp() {
  return useSelector(state => state.endingTimestamp)
}
export function useRound() {
  return useSelector(state => state.lotteryId)
}
export function useLastTx(){
  return useSelector(state => state.lastTx)
}
export function useJackPot() {
  const willWins = useSelector(state => state.willWins);
  var res = 0;
  willWins.forEach(val => {
     res = res + parseFloat(val);
  });
  
  return toSignificant(res,2)
}
export function useCombinedCands(){
  const candsOfWins = useSelector(state => state.candsOfWins);
  const putins = useSelector(state => state.putins);
  const timestamps = useSelector(state => state.timestamps);
  const willWins = useSelector(state => state.willWins);

  var res = [];
  for(var i = 0; i < candsOfWins.length; i++){
    var date = new Date(timestamps[i] * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    res.push({id:i+1, address:candsOfWins[i], putin:putins[i], time:formattedTime, willwin:toSignificant(willWins[i],2)});
  }
  return res;
}

