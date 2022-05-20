import { send } from 'emailjs-com'
import { SERVICE_ID, FAILED_TEST_TEMPLATE_ID, PUBLIC_KEY } from '../config'

export default function sendEmailAfterFailedTest(userData) {
    let toSend = {
        studentName: userData.studentName,
        studentGroup: userData.studentGroup,
        studentAnswers: userData.selectedPairsOfImplicants.join(' | ')
    }

    // send(
    //     SERVICE_ID,
    //     FAILED_TEST_TEMPLATE_ID,
    //     toSend,
    //     PUBLIC_KEY
    // )
}