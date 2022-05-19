export default function calcUserGrade(userResult, result) {
    const totalGradeForStep1 = 30
    const totalGradeForStep2 = 25
    const totalGradeForStep3 = 25
    const totalGradeForStep4 = 20

    let resultOfGrade = {
        userGradeForStep1: totalGradeForStep1,
        userGradeForStep2: totalGradeForStep2,
        userGradeForStep3: totalGradeForStep3,
        userGradeForStep4: totalGradeForStep4,
    }

    let amounOfCorrectAnswerForStep1 = result.foundPares[0].length
    let amounOfCorrectAnswerForStep2 = result.leftSideTablePokritiya.length
    let amounOfCorrectAnswerForStep3 = result.core.length
    let amounOfCorrectAnswerForStep4 = result.mdnf.length

    let priceOfAnswerForStep1 = totalGradeForStep1 / amounOfCorrectAnswerForStep1
    let priceOfAnswerForStep2 = totalGradeForStep2 / amounOfCorrectAnswerForStep2
    let priceOfAnswerForStep3 = totalGradeForStep3 / amounOfCorrectAnswerForStep3
    let priceOfAnswerForStep4 = totalGradeForStep4 / amounOfCorrectAnswerForStep4

    // CALC
    resultOfGrade.userGradeForStep1 =
        resultOfGrade.userGradeForStep1 - (userResult.step1.notFoundPares.length * priceOfAnswerForStep1)
    resultOfGrade.userGradeForStep1 =
        resultOfGrade.userGradeForStep1 - (userResult.step1.mismatchedPairs.length * (priceOfAnswerForStep1 / 2))

    resultOfGrade.userGradeForStep2 =
        resultOfGrade.userGradeForStep2 - (userResult.step2.notFoundImplicants.length * priceOfAnswerForStep2)
    resultOfGrade.userGradeForStep2 =
        resultOfGrade.userGradeForStep2 - (userResult.step2.mismatchedImplicants.length * (priceOfAnswerForStep2 / 2))

    resultOfGrade.userGradeForStep3 =
        resultOfGrade.userGradeForStep3 - (userResult.step3.notFoundImplicants.length * priceOfAnswerForStep3)
    resultOfGrade.userGradeForStep3 =
        resultOfGrade.userGradeForStep3 - (userResult.step3.mismatchedImplicants.length * (priceOfAnswerForStep3 / 2))

    resultOfGrade.userGradeForStep4 =
        resultOfGrade.userGradeForStep4 - (userResult.step4.notFoundItemsOfMDNF.length * priceOfAnswerForStep4)
    resultOfGrade.userGradeForStep4 =
        resultOfGrade.userGradeForStep4 - (userResult.step4.mismatchedItemsOfMDNF.length * (priceOfAnswerForStep4 / 2))


    for (let key in resultOfGrade) {
        resultOfGrade[key] = Math.round(resultOfGrade[key])
        if (resultOfGrade[key] < 0) {
            resultOfGrade[key] = 0
        }
    }

    return resultOfGrade
}