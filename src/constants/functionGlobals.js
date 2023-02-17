export const currencyFloat = (number) => {
    let num = parseFloat(number)
    if(!isNaN(num)){
        if(num.toString().indexOf('.') != -1){
            return 'Rp ' + num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        } else {
            var rupiah = '';
            var numrev = num.toString().split('').reverse().join('');
            for (var i = 0; i < numrev.length; i++) if (i % 3 == 0) rupiah += numrev.substr(i, 3) + '.';

            let ret = rupiah.split('', rupiah.length - 1).reverse().join('')

            if(ret < 0){
                return ret.replace('-', '')
            } else {
                return ret
            }
        }
    } else {
        return 0
    }
}

export const getMultiples = (n, lim) => {
    const arr = Array(~~(lim/n))
    for(let x of arr.keys()) 
        arr[x] = (x+1)*n
    return arr    
}  
