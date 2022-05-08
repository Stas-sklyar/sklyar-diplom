export const fromNumToLetterForFourImplicant = (arr) => {
    let result = ''
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] !== 'x') {
                if (arr[i][j] === 0) {
                    if (j === 0) result += '!a'
                    if (j === 1) result += '!b'
                    if (j === 2) result += '!c'
                    if (j === 3) result += '!d'
                }
                if (arr[i][j] === 1) {
                    if (j === 0) result += 'a'
                    if (j === 1) result += 'b'
                    if (j === 2) result += 'c'
                    if (j === 3) result += 'd'
                }
            }
        }
        result += ' v '
    }

    return result
}