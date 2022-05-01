export default function findOnlyUnique(srcArr) {
    let uniqueArr = []

    for (let i = 0; i < srcArr.length; i++) {
        for (let j = i + 1; j < srcArr.length; j++) {
            let amounMatches = 0;

            for (let k = 0; k < srcArr[i].length; k++) {
                if (srcArr[i][k] === srcArr[j][k]) {
                    amounMatches += 1;
                }
            }
            if (amounMatches === srcArr[i].length) {
                uniqueArr.push([...srcArr[i]])
            }
            amounMatches = 0;
        }
    }

    return uniqueArr
}