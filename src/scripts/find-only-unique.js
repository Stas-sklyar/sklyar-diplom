export default function findOnlyUnique(srcArr) {
    let uniqueArr = []

    for (let i = 0; i < srcArr.length; i++) {
        let amountMatches = 0
        for (let j = i + 1; j < srcArr.length; j++) {
            if(srcArr[i].join('') ===  srcArr[j].join('')) {
                amountMatches++
            }
        }
        if(amountMatches === 0) uniqueArr.push(srcArr[i]) 
    }

    return uniqueArr
}