export default function findPares(srcArr, tableForIndexes) {
    let resultTable = []
    let hasPares = []
    let resultTableIndexes = []

    for (let i = 0; i < srcArr.length; i++) {
        for (let j = i + 1; j < srcArr.length; j++) {
            let amountOfMismatches = 0
            let mismatchIndex = -1
            for (let k = 0; k < srcArr[i].length; k++) {
                if (srcArr[i][k] !== srcArr[j][k] && (srcArr[i][k] !== 'x' || srcArr[j][k] !== 'x')) {
                    amountOfMismatches += 1
                    mismatchIndex = k
                }
            }
            if (amountOfMismatches === 1) {
                let reformedRow = [...srcArr[i]]
                reformedRow[mismatchIndex] = 'x'
                resultTable.push([...reformedRow])
                hasPares.push(srcArr[i])
                hasPares.push(srcArr[j])

                if (tableForIndexes) {
                    let currentIndexI = tableForIndexes.findIndex((item) => {
                        return item.join('') === srcArr[i].join('')
                    })
                    let currentIndexJ = tableForIndexes.findIndex((item) => {
                        return item.join('') === srcArr[j].join('')
                    })
                    resultTableIndexes.push([currentIndexI, currentIndexJ])
                }
            }
        }
    }

    return [resultTable, hasPares, resultTableIndexes]
}