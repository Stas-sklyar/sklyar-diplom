export default function handleTest(userAnswers, result) {
    let userResult = {
        step3: {
            notFoundPares: [],
            mismatchedPairs: []
        }
    }

    // PARSED USER ANSWERS ---------------
    for (let i = 0; i < userAnswers.selectedLastImplicants.length; i++) {
        let parsedItem = userAnswers.selectedLastImplicants[i][0].split('')
        for (let j = 0; j < parsedItem.length; j++) {
            if (parsedItem[j] === '1' || parsedItem[j] === '0') {
                parsedItem[j] = parseInt(parsedItem[j])
            }
        }
        userAnswers.selectedLastImplicants[i] = [...parsedItem]
    }

    for (let i = 0; i < userAnswers.selectedPairsOfImplicants.length; i++) {
        for (let j = 0; j < userAnswers.selectedPairsOfImplicants[i].length; j++) {
            userAnswers.selectedPairsOfImplicants[i][j] = parseInt(userAnswers.selectedPairsOfImplicants[i][j])
        }
    }

    // STEP 4


}