export default function findPares(srcArr) {
    let resultTable = []

    for (let i = 0; i < srcArr.length; i++) {
        for (let j = i + 1; j < srcArr.length; j++) {
            let amountOfMismatches = 0;
            let mismatchIndex = -1
            for (let k = 0; k < srcArr[i].length; k++) {
                if (srcArr[i][k] !== srcArr[j][k]) {
                    amountOfMismatches += 1;
                    mismatchIndex = k;
                }
            }
            if (amountOfMismatches === 1) {
                let reformedRow = [...srcArr[i]]
                reformedRow[mismatchIndex] = 'x'
                resultTable.push([...reformedRow])
            }
            amountOfMismatches = 0;
            mismatchIndex = -1
        }
    }

    return resultTable
}