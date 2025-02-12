import { formatCurrency } from "../utils/money.js";
console.log('convert money into dollers')
if(formatCurrency(2055)==='20.55'){
    console.log('passed');
}
else{
    console.log('Failed')
}
console.log('Works with Zero')
if(formatCurrency(0)==='0.00'){
    console.log('passed');
}
else{
    console.log('Failed')
}
console.log('Rounding to the nearest Cent')
if(formatCurrency(2000.5)==='20.01'){
    console.log('passed');
}
else{
    console.log('Failed')
}
