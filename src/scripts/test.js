export default function handleTest(userAnswers, result) {
    let userResult = {
        step1: {
            notFoundPares: [],
            mismatchedPairs: []
        },
        step2: {
            notFoundImplicants: [],
            mismatchedImplicants: []
        },
        step3: {
            notFoundImplicants: [],
            mismatchedImplicants: []
        },
        step4: {
            notFoundItemsOfMDNF: [],
            mismatchedItemsOfMDNF: []
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

    for (let i = 0; i < userAnswers.userCore.length; i++) {
        let parsedItem = userAnswers.userCore[i][0].split('')
        for (let j = 0; j < parsedItem.length; j++) {
            if (parsedItem[j] === '1' || parsedItem[j] === '0') {
                parsedItem[j] = parseInt(parsedItem[j])
            }
        }
        userAnswers.userCore[i] = [...parsedItem]
    }

    let indexesForStep3 = result.foundParesIndexes.slice(0, result.foundPares[0].length)

    result.mdnf = result.mdnf.split(' v ')
    userAnswers.userMDNF = userAnswers.userMDNF.split(' v ')

    // STEP 3 -----------------
    let notFoundPares = []
    for (let i = 0; i < indexesForStep3.length; i++) {
        let pairFound = userAnswers.selectedPairsOfImplicants
            .find(item => item.join('') === indexesForStep3[i].join(''))
        if (!pairFound) {
            notFoundPares.push(indexesForStep3[i])
        }
    }

    let mismatchedPairs = []
    for (let i = 0; i < userAnswers.selectedPairsOfImplicants.length; i++) {
        let pairFound = indexesForStep3
            .find(item => item.join('') === userAnswers.selectedPairsOfImplicants[i].join(''))
        if (!pairFound) {
            mismatchedPairs.push(userAnswers.selectedPairsOfImplicants[i])
        }
    }
    userResult.step1.notFoundPares = notFoundPares
    userResult.step1.mismatchedPairs = mismatchedPairs

    // STEP 4 ----------------
    let notFoundImplicants = []
    for (let i = 0; i < result.leftSideTablePokritiya.length; i++) {
        let implicantFound = userAnswers.selectedLastImplicants
            .find(item => item.join('') === result.leftSideTablePokritiya[i].join(''))
        if (!implicantFound) {
            notFoundImplicants.push(result.leftSideTablePokritiya[i])
        }
    }

    let mismatchedImplicants = []
    for (let i = 0; i < userAnswers.selectedLastImplicants.length; i++) {
        let implicantFound = result.leftSideTablePokritiya
            .find(item => item.join('') === userAnswers.selectedLastImplicants[i].join(''))
        if (!implicantFound) {
            mismatchedImplicants.push(userAnswers.selectedLastImplicants[i])
        }
    }

    userResult.step2.notFoundImplicants = notFoundImplicants
    userResult.step2.mismatchedImplicants = mismatchedImplicants


    // STEP 5 ---------------
    let notFoundImplicantsOfCore = []
    for (let i = 0; i < result.core.length; i++) {
        let implicantOfCoreFound = userAnswers.userCore
            .find(item => item.join('') === result.core[i].join(''))
        if (!implicantOfCoreFound) {
            notFoundImplicantsOfCore.push(result.core[i])
        }
    }

    let mismatchedImplicantsOfCore = []
    for (let i = 0; i < userAnswers.userCore.length; i++) {
        let implicantOfCoreFound = result.core
            .find(item => item.join('') === userAnswers.userCore[i].join(''))
        if (!implicantOfCoreFound) {
            mismatchedImplicantsOfCore.push(userAnswers.userCore[i])
        }
    }

    userResult.step3.notFoundImplicants = notFoundImplicantsOfCore
    userResult.step3.mismatchedImplicants = mismatchedImplicantsOfCore

    // STEP 6 ----------------
    let notFoundItemsOfMDNF = []
    for (let i = 0; i < result.mdnf.length; i++) {
        let foundItemsOfMDNF = userAnswers.userMDNF
            .find(item => item === result.mdnf[i])
        if (!foundItemsOfMDNF) {
            notFoundItemsOfMDNF.push(result.mdnf[i])
        }
    }

    let mismatchedItemsOfMDNF = []
    for (let i = 0; i < userAnswers.userMDNF.length; i++) {
        let foundItemsOfMDNF = result.mdnf
            .find(item => item === userAnswers.userMDNF[i])
        if (!foundItemsOfMDNF) {
            mismatchedItemsOfMDNF.push(userAnswers.userMDNF[i])
        }
    }

    userResult.step4.notFoundItemsOfMDNF = notFoundItemsOfMDNF
    userResult.step4.mismatchedItemsOfMDNF = mismatchedItemsOfMDNF

    console.log(userResult)

    return userResult
}