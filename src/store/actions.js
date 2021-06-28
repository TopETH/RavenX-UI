const Types = {
  CHANGE_STATUS: 'CHANGE_STATUS',
  UPDATE: 'UPDATE',
  SET_LEFTTIMESTAMP: 'SET_LEFTTIMESTAMP',
  SET_LAST_TX:'SET_LAST_TX'
}
const sestLastTx = (hash) =>({
  type: Types.SET_LAST_TX,
  payload: hash
})

const changeAppStaus = (status) => ({
  type: Types.CHANGE_STATUS,
  payload: status
})

const setLeftTimestamp = (left) =>({
  type: Types.SET_LEFTTIMESTAMP,
  payload: left
})

const update = ({lotteryId, lotteryStatus, candsOfWins, putins, timestamps, willWins, endingTimestamp, jackpot}) => ({
  type: Types.UPDATE,
  payload: {lotteryId, lotteryStatus, candsOfWins, putins, timestamps, willWins, endingTimestamp, jackpot}
}) 


export {
  changeAppStaus,
  update,
  setLeftTimestamp,
  sestLastTx,
  Types
}