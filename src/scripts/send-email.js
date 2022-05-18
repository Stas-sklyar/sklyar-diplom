import { send } from 'emailjs-com'

export default function sendEmail() {
    const toSend = {
        userName: '',
        userGroup: '',
        userPoint: '????',

        userResultStep3NotFoundPares: '',
        userResultStep3NotFoundParesPoint: '',

        userResultStep3MismatchedPairs: '',
        userResultStep3MismatchedPairsPoint: '',

        userResultStep4NotFoundImplicants: '',
        userResultStep4NotFoundImplicantsPoint: '',

        userResultStep4MismatchedImplicants: '',
        userResultStep4MismatchedImplicantsPoint: '',

        userResultStep5NotFoundImplicants: '',
        userResultStep5NotFoundImplicantsPoint: '',

        userResultStep5MismatchedImplicants: '',
        userResultStep5MismatchedImplicantsPoint: '',

        userResultStep6NotFoundImplicants: '',
        userResultStep6NotFoundImplicantsPoint: '',

        userResultStep6MismatchedImplicants: '',
        userResultStep6MismatchedImplicantsPoint: '',
    }

    const serviceID = 'default_service'
    const templateID = 'template_46r38eo'
    const publicKey = 'eA6bsZM6VKoGI5h2z'

    // send(
    //     serviceID,
    //     templateID,
    //     toSend,
    //     publicKey
    // )
}
