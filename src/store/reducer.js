import { Types } from './actions'

const initialState = {
  status: 1, //1:ToEnter, 2:InEnter, 3:SuccessEnter
  lotteryId: 0,
  candsOfWins: [],
  putins:[],
  timestamps:[],
  willWins:[],
  endingTimestamp: 0,
  jackpot: 0,
  lastTx:''
}

const reducer = (state = initialState, action) => {
  let newState = { ...state }
  if(!action.payload)
    return newState
  switch(action.type) {
    case Types.CHANGE_STATUS:
      newState.status = action.payload
      break
    case Types.SET_LEFTTIMESTAMP:
      newState.endingTimestamp = action.payload
      break
    case Types.UPDATE:
      const {lotteryId, candsOfWins, putins, timestamps, willWins, endingTimestamp, jackpot} = action.payload;
      newState.lotteryId = lotteryId
      newState.candsOfWins = candsOfWins
      newState.putins = putins
      newState.timestamps = timestamps
      newState.willWins = willWins
      newState.endingTimestamp = endingTimestamp
      newState.jackpot = jackpot
      break
    case Types.SET_LAST_TX:
      newState.lastTx = action.payload
      break
    default:
      break
  }
  return newState
}

export default reducer