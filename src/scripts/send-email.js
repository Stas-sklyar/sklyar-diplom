import { send } from 'emailjs-com'

export default function sendEmail(userResult) {
    const toSend = {
        userName: userResult.studentName,
        userGroup: userResult.studentGroup,
        userPoint: userResult.userGrade.totalResult + '',

        userResultStep1NotFoundPares: userResult.step1.notFoundPares.join(' | '),
        userResultStep1MismatchedPairs: userResult.step1.mismatchedPairs.join(' | '),
        step1Grade: userResult.userGrade.userGradeForStep1,

        userResultStep2NotFoundImplicants: userResult.step2.notFoundImplicants.join(' | '),
        userResultStep2MismatchedImplicants: userResult.step2.mismatchedImplicants.join(' | '),
        step2Grade: userResult.userGrade.userGradeForStep2,

        userResultStep3NotFoundImplicants: userResult.step3.notFoundImplicants.join(' | '),
        userResultStep3MismatchedImplicants: userResult.step3.mismatchedImplicants.join(' | '),
        step3Grade: userResult.userGrade.userGradeForStep3,

        userResultStep4NotFoundItemsOfMDNF: userResult.step4.notFoundItemsOfMDNF.join(' | '),
        userResultStep4MismatchedItemsOfMDNF: userResult.step4.mismatchedItemsOfMDNF.join(' | '),
        step4Grade: userResult.userGrade.userGradeForStep4,
    }

    const serviceID = 'default_service'
    const templateID = 'template_46r38eo'
    const publicKey = 'eA6bsZM6VKoGI5h2z'

    send(
        serviceID,
        templateID,
        toSend,
        publicKey
    )
}
