import s from './Test.module.scss'
import sharedStyles from '../shared/shared.module.scss'
import calc from '../scripts/calc'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import handleTest from '../scripts/test'
import sendEmail from '../scripts/send-email'
import sendEmailAfterFailedTest from '../scripts/send-email-after-failed-test'
import FinishTestDialog from './FinishTestDialog/FinishTestDialog'
import TestFailedAfterStep1 from './TestFailedAfterStep1/TestFailedAfterStep1'
import TestForm from './TestForm/TestForm'
import UserResult from './UserResult/UserResult'
import TestStep1 from './TestStep1/TestStep1'
import TestStep2 from './TestStep2/TestStep2'
import TestStep3 from './TestStep3/TestStep3'
import TestStep4 from './TestStep4/TestStep4'
import TestStep5 from './TestStep5/TestStep5'
import TestStep6 from './TestStep6/TestStep6'

function Test() {
    const [testFinished, setTestFinished] = useState(false)
    const [studentName, setStudentName] = useState("")
    const [studentGroup, setStudentGroup] = useState("")
    const [userResult, setUserResult] = useState()

    const [seconds, setSeconds] = useState(600)
    const [timerActive, setTimerActive] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    const [task, setTask] = useState('0000100011111011')
    const [selectedPairsOfImplicants, setSelectedPairsOfImplicants] = useState([])
    const [selectedLastImplicants, setSelectedLastImplicants] = useState([])
    const [selectedImplicantsOfUserCore, setSelectedImplicantsOfUserCore] = useState([])
    const [userMDNF, setUserMDNF] = useState('')

    const [result, setResult] = useState()

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const startTest = () => {
        // if (studentName.length < 3) {
        //     alert("Введіть своє ім'я!")
        //     return
        // }
        // if (studentGroup.length < 3) {
        //     alert("Введіть свою групу!")
        //     return
        // }
        setTimerActive(!timerActive)
        setCurrentStep(currentStep + 1)

        const parsedTask = task.split('').map((item) => { return parseInt(item) })
        const resultObj = calc(4, parsedTask)
        setResult(resultObj)
    }

    useEffect(() => {
        if (seconds === 0) {
            alert("Час вийшов!")
            setTimerActive(false)
        }
        if (seconds > 0 && timerActive) {
            setTimeout(setSeconds, 1000, seconds - 1)
        } else {
            setTimerActive(false)
        }
    }, [seconds, timerActive])

    // CLOSE TEST ------------------
    const handleCloseDialog = (next) => {
        if (next) {
            sendTest()
        }
        setDialogIsOpen(false)
    }

    // SEND TEST AND CALC RESULT
    const sendTest = () => {
        let userAnswers = {
            selectedPairsOfImplicants,
            selectedLastImplicants,
            userCore: selectedImplicantsOfUserCore,
            userMDNF,
            studentName,
            studentGroup,
        }
        let userResult = handleTest(userAnswers, result)
        setUserResult(userResult)

        sendEmail(userResult)
        alert("Тест відправленно!")
        setTestFinished(true)
        setCurrentStep(0)
    }

    // ADDITION CHECK FOR STEP 1
    const checkStep1 = () => {
        let indexesOfFoundPares = result.foundParesIndexes.slice(0, result.foundPares[0].length)
        let amountOfMismatches = 0
        for (let i = 0; i < selectedPairsOfImplicants.length; i++) {
            let pairFound = indexesOfFoundPares.find(item => item.join('') === selectedPairsOfImplicants[i].join(''))
            if (!pairFound) amountOfMismatches++
        }

        if (amountOfMismatches > 3) {
            setTestFinished(true)
            setCurrentStep(-1)

            let userData = {
                studentName,
                studentGroup,
                selectedPairsOfImplicants
            }
            sendEmailAfterFailedTest(userData)
        }
    }

    useEffect(() => {
        if (currentStep === 4) {
            checkStep1()
        }
    }, [currentStep])

    // EMAIL FLOW

    return (
        <div className={s["Test"]}>
            {timerActive && currentStep !== 0 && !testFinished &&
                <h4>
                    {
                        (seconds / 60).toFixed(0) - 1 === 0
                            ? 'Остання хвилина!'
                            : 'Залишилось: ' + ((seconds / 60).toFixed(0) - 1) + ' хвилин'
                    }
                </h4>
            }

            {currentStep === 0 && !testFinished &&
                <TestForm
                    studentName={studentName}
                    studentGroup={studentGroup}
                    setStudentName={setStudentName}
                    setStudentGroup={setStudentGroup}
                    startTest={startTest}
                />
            }

            {currentStep >= 1 &&
                <TestStep1
                    result={result}
                    currentStep={currentStep}
                    task={task}
                />
            }

            {currentStep >= 2 &&
                <TestStep2 result={result} currentStep={currentStep} />
            }

            {currentStep >= 3 &&
                <TestStep3
                    selectedPairsOfImplicants={selectedPairsOfImplicants}
                    setSelectedPairsOfImplicants={setSelectedPairsOfImplicants}
                />
            }

            {currentStep >= 4 &&
                <TestStep4
                    selectedLastImplicants={selectedLastImplicants}
                    setSelectedLastImplicants={setSelectedLastImplicants}
                />
            }

            {currentStep >= 5 &&
                <TestStep5
                    selectedImplicantsOfUserCore={selectedImplicantsOfUserCore}
                    setSelectedImplicantsOfUserCore={setSelectedImplicantsOfUserCore}
                />
            }

            {currentStep >= 6 &&
                <TestStep6 userMDNF={userMDNF} setUserMDNF={setUserMDNF} />
            }


            {
                currentStep < 6 && currentStep >= 1 &&
                <Button
                    className={sharedStyles["NextStepBtn"]}
                    variant="contained"
                    onClick={() => setCurrentStep(currentStep + 1)}
                >
                    Наступний крок
                </Button>
            }
            {
                currentStep === 6 &&
                <Button
                    className={sharedStyles["NextStepBtn"]}
                    variant="contained"
                    onClick={() => setDialogIsOpen(true)}
                >
                    Завершити тест
                </Button>
            }

            {testFinished && currentStep !== -1 &&
                <UserResult userResult={userResult} />
            }

            {currentStep === -1 &&
                <TestFailedAfterStep1 />
            }

            <FinishTestDialog
                handleCloseDialog={handleCloseDialog}
                dialogIsOpen={dialogIsOpen}
            />

        </div>
    )
}

export default Test
