export function toSignificant(value, decimals) {
  var x = parseFloat(value).toPrecision(decimals), e
  if (Math.abs(x) < 1.0) {
    e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x = (x.toString().split('e-')[0]).replace('.', '');
      x = '0.' + (new Array(e)).join('0') + x;
    }
  } else {
    x = parseFloat(x)
  }
  return x;
}
export function formatValue(value) {
  let inputValue = value ? value.toString() : ''
  if(inputValue.includes('.')) {
    const nums = inputValue.split('.')
    inputValue = nums[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + nums[1]
  } else {
    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  return inputValue
}
export function formatDecimal(val, decimal){
  let temp = val.toString().split('.');
  if(temp.length > 1){
    return temp[0] + '.' + temp[1].slice(0, decimal)
  }
  else{
    return val
  }
}
export function utcformat(d){
  d= new Date(d);
  var tail= ' UTC', T= [d.getUTCHours(), d.getUTCMinutes()];
  var D = d.toUTCString().split(" ");
  var i= 2;
  while(i){
      --i;
      if(T[i]<10) T[i]= '0'+T[i];
  }
  return D[0]+ ' ' + D[1] +' '+ D[2] + ' ' +T.join(':')+ tail;
}