export const fromNumToLetterForFourImplicant = (arr) => {
    let result = ''
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] !== 'x') {
                if (arr[i][j] === 0) {
                    if (j === 0) result += '!x'
                    if (j === 1) result += '!y'
                    if (j === 2) result += '!z'
                    if (j === 3) result += '!t'
                }
                if (arr[i][j] === 1) {
                    if (j === 0) result += 'x'
                    if (j === 1) result += 'y'
                    if (j === 2) result += 'z'
                    if (j === 3) result += 't'
                }
            }
        }
        result += ' v '
    }

    return result
}