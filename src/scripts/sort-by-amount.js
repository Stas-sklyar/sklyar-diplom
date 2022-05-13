export default function sortByAmount(arr) {
    if(arr.length === 0) {
        return []
    }
    const symbol = 1
    let resultArr = []

    for (let amountSymbol = 0; amountSymbol <= 4; amountSymbol++) {
        let tempArr = []
        for (let i = 0; i < arr.length; i++) {
            let amountMatches = 0;
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] === symbol) amountMatches++
            }
            if (amountMatches === amountSymbol) tempArr.push(arr[i]);
        }
        if (tempArr.length > 0) resultArr.push(tempArr)
    }

    return resultArr
}