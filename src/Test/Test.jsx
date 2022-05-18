import s from './Test.module.scss'
import sharedStyles from '../shared/shared.module.scss'
import calc from '../scripts/calc'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useState, useEffect } from 'react'
import Slide from '@mui/material/Slide'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import handleTest from '../scripts/test'
import Divider from '@mui/material/Divider'

function Test() {
    const [testFinished, setTestFinished] = useState(false)
    const [studentName, setStudentName] = useState("")
    const [studentGroup, setStudentGroup] = useState("")
    const [userResult, setUserResult] = useState()

    const [seconds, setSeconds] = useState(600)
    const [timerActive, setTimerActive] = useState(false)

    const [currentStep, setCurrentStep] = useState(0)

    const [task, setTask] = useState('0000100011111011')

    const [implicantPair, setImplicantPair] = useState('')
    const [selectedPairsOfImplicants, setSelectedPairsOfImplicants] = useState([])

    const [lastImplicants, setLastImplicants] = useState('')
    const [selectedLastImplicants, setSelectedLastImplicants] = useState([])

    const [implicantOfUserCore, setImplicantOfUserCore] = useState('')
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

    // STEP 3 ------------------
    const [selectedIndexOfPairItem, setSelectedIndexOfPairItem] = useState(-1)

    const openPairItemActionsMenu = (index) => {
        setSelectedIndexOfPairItem(index)
    }

    const hidePairItemActionsMenu = () => {
        setSelectedIndexOfPairItem(-1)
    }

    const deletePairOfImplicant = (index) => {
        let newArr = selectedPairsOfImplicants
        newArr.splice(index, 1)
        setSelectedPairsOfImplicants([...newArr])
    }

    const handleImplicantPair = (value) => {
        if (!(value.length > 2)) {
            setImplicantPair(value)
        }
    }

    const handleAddImplicantPair = (implicantPair) => {
        if (implicantPair.length !== 2) {
            return
        }
        let newArr = selectedPairsOfImplicants
        newArr.push([implicantPair[0], implicantPair[1]])
        setSelectedPairsOfImplicants([...newArr])
        setImplicantPair('')
    }


    // STEP 4 ------------------
    const [selectedIndexOfLastImplicantItem, setSelectedIndexOfLastImplicantItem] = useState(-1)

    const openLastImplicantItemActionsMenu = (index) => {
        setSelectedIndexOfLastImplicantItem(index)
    }

    const hideLastImplicantItemActionsMenu = () => {
        setSelectedIndexOfLastImplicantItem(-1)
    }

    const deleteLastImplicantItem = (index) => {
        let newArr = selectedLastImplicants
        newArr.splice(index, 1)
        setSelectedLastImplicants([...newArr])
    }

    const handleLastImplicant = (value) => {
        if (
            !(value.length > 4) &&
            (
                value[value.length - 1] === '1' ||
                value[value.length - 1] === '0' ||
                value[value.length - 1] === 'x'
            )
        ) {
            setLastImplicants(value)
        }
    }

    const handleAddLastImplicant = (lastImplicants) => {
        if (lastImplicants.length !== 4) {
            return
        }
        let newArr = selectedLastImplicants
        newArr.push([lastImplicants])
        setSelectedLastImplicants([...newArr])
        setLastImplicants('')
    }

    // STEP 5 ------------------
    const [selectedIndexOfImplicantsForUserCore, setSelectedIndexOfImplicantsForUserCore] = useState(-1)

    const openImplicantOfUsrCoreItemActionsMenu = (index) => {
        setSelectedIndexOfImplicantsForUserCore(index)
    }

    const hideImplicantOfUserCoreItemActionsMenu = () => {
        setSelectedIndexOfImplicantsForUserCore(-1)
    }

    const deleteImplicantOfUserCoreItem = (index) => {
        let newArr = selectedImplicantsOfUserCore
        newArr.splice(index, 1)
        setSelectedImplicantsOfUserCore([...newArr])
    }

    const handleUserCore = (value) => {
        if (
            !(value.length > 4) &&
            (
                value[value.length - 1] === '1' ||
                value[value.length - 1] === '0' ||
                value[value.length - 1] === 'x'
            )
        ) {
            setImplicantOfUserCore(value)
        }
    }

    const handleAddImplicantOfCore = (implicantOfUserCore) => {
        if (implicantOfUserCore.length !== 4) {
            return
        }
        let newArr = selectedImplicantsOfUserCore
        newArr.push([implicantOfUserCore])
        setSelectedImplicantsOfUserCore([...newArr])
        setImplicantOfUserCore('')
    }

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
            userMDNF
        }
        setUserResult(handleTest(userAnswers, result))

        alert("Тест відправленно!")
        setTestFinished(true)
        setCurrentStep(0)
    }

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
                <form className={s["Test-Form"]}>
                    <TextField
                        value={studentName}
                        onChange={e => setStudentName(e.target.value)}
                        className={s["Test-TextField"]}
                        label="Введіть ПІБ"
                        variant="outlined"
                    />
                    <TextField
                        value={studentGroup}
                        onChange={e => setStudentGroup(e.target.value)}
                        className={s["Test-TextField"]}
                        label="Введіть группу"
                        variant="outlined"
                    />
                    <Button
                        className={s["Test-StartBtn"]}
                        variant="contained"
                        onClick={() => startTest()}
                    >
                        Почати тест
                    </Button>
                </form>
            }

            {currentStep >= 1 &&
                <section className={s["Test-Section"]}>
                    <h3>Ваше завдання: {task}</h3>
                    <h4>1. Перший крок: Формуємо таблицю істиності</h4>
                    <Table className={sharedStyles["Table"]}>
                        <TableHead>
                            <TableRow>
                                <TableCell>№</TableCell>
                                <TableCell>a</TableCell>
                                <TableCell>b</TableCell>
                                <TableCell>c</TableCell>
                                <TableCell>d</TableCell>
                                <TableCell>F</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {result.sourceTable.map((row, index) => (
                                <TableRow
                                    key={index}
                                    className={(currentStep >= 2 && result.task[index] === 1) ? sharedStyles["HightlightRow"] : ''}
                                >
                                    <TableCell>{index}</TableCell>
                                    <TableCell>{row[0]}</TableCell>
                                    <TableCell>{row[1]}</TableCell>
                                    <TableCell>{row[2]}</TableCell>
                                    <TableCell>{row[3]}</TableCell>
                                    <TableCell>{result.task[index]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            }

            {currentStep >= 2 &&
                <Slide direction="down" in={currentStep >= 2}>
                    <section className={s["Test-Section"]}>
                        <h3>2. Другий крок</h3>
                        <p>?Шукаємо рядки там де F = 1? і сортуємо таблицю по кількості одиниць</p>
                        <Table className={sharedStyles["Table"]}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell>a</TableCell>
                                    <TableCell>b</TableCell>
                                    <TableCell>c</TableCell>
                                    <TableCell>d</TableCell>
                                    <TableCell>F</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result.tableOnlyTrue.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index}</TableCell>
                                        <TableCell>{row[0]}</TableCell>
                                        <TableCell>{row[1]}</TableCell>
                                        <TableCell>{row[2]}</TableCell>
                                        <TableCell>{row[3]}</TableCell>
                                        <TableCell>1</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </section>
                </Slide>
            }

            {currentStep >= 3 &&
                <section className={s["Test-Section"]}>
                    <h3>3. Третій крок</h3>

                    <div>
                        <p>Введіть в поле номера імплікант які ми повинні склеяти</p>
                        <div className={s["Test-AddItemForm"]}>
                            <TextField
                                value={implicantPair}
                                onChange={e => handleImplicantPair(e.target.value)}
                                className={s["Test-ThirdStepTextField"]}
                                label="Введіть індекси пар імплікант"
                                variant="outlined"
                                size="small"
                                type="number"
                            />
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={() => handleAddImplicantPair(implicantPair)}
                                size="small"
                            >
                                Додати пару
                            </Button>
                        </div>

                        <div>
                            {selectedPairsOfImplicants.map((item, index) => (
                                <div
                                    key={index}
                                    className={s["Test-PairItem"]}
                                    onMouseEnter={() => openPairItemActionsMenu(index)}
                                    onMouseLeave={() => hidePairItemActionsMenu()}
                                >
                                    <div>
                                        [{item.join(' - ')}]
                                        {index !== selectedPairsOfImplicants.length - 1 ? ',' : ' '}
                                    </div>
                                    <div
                                        className={s["ActionsMenu"] + " " + ((index === selectedIndexOfPairItem) ? s["ActionsMenu--Active"] : '')}
                                        onClick={() => deletePairOfImplicant(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section >
            }

            {
                currentStep >= 4 &&
                <section className={s["Test-Section"]}>
                    <h3>4. Четвертий крок</h3>

                    <div>
                        <p>Результат склейки + імпліканти які не склеялись ні з чим</p>
                        <div className={s["Test-AddItemForm"]}>
                            <TextField
                                value={lastImplicants}
                                onChange={e => handleLastImplicant(e.target.value)}
                                className={s["Test-ThirdStepTextField"]}
                                label="Введіть імпліканту"
                                variant="outlined"
                                size='small'
                                type="text"
                            />
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={() => handleAddLastImplicant(lastImplicants)}
                                size='small'
                            >
                                Додати імпліканту
                            </Button>
                        </div>

                        <div>
                            {selectedLastImplicants.map((item, index) => (
                                <div key={index}
                                    className={s["Test-LastImplicantItem"]}
                                    onMouseEnter={() => openLastImplicantItemActionsMenu(index)}
                                    onMouseLeave={() => hideLastImplicantItemActionsMenu()}
                                >
                                    <div>
                                        [{item.join(' - ')}]
                                        {index !== selectedLastImplicants.length - 1 ? ',' : ' '}
                                    </div>

                                    <div
                                        className={s["ActionsMenu"] + " " + ((index === selectedIndexOfLastImplicantItem) ? s["ActionsMenu--Active"] : '')}
                                        onClick={() => deleteLastImplicantItem(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            }

            {
                currentStep >= 5 &&
                <section className={s["Test-Section"]}>
                    <h3>5. П'ятий крок</h3>
                    <p>Введіть ядро в форматі - [[1,0,x,1], [0,1,x,0]]</p>

                    <div className={s["Test-AddItemForm"]}>
                        <TextField
                            value={implicantOfUserCore}
                            onChange={e => handleUserCore(e.target.value)}
                            className={s["Test-ThirdStepTextField"]}
                            label="Введіть імпліканту"
                            variant="outlined"
                            size='small'
                            type="text"
                        />
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={() => handleAddImplicantOfCore(implicantOfUserCore)}
                            size='small'
                        >
                            Додати імпліканту
                        </Button>
                    </div>

                    <div>
                        {selectedImplicantsOfUserCore.map((item, index) => (
                            <div key={index}
                                className={s["Test-LastImplicantItem"]}
                                onMouseEnter={() => openImplicantOfUsrCoreItemActionsMenu(index)}
                                onMouseLeave={() => hideImplicantOfUserCoreItemActionsMenu()}
                            >
                                <div>
                                    [{item.join(' - ')}]
                                    {index !== selectedImplicantsOfUserCore.length - 1 ? ',' : ' '}
                                </div>

                                <div
                                    className={s["ActionsMenu"] + " " + ((index === selectedIndexOfImplicantsForUserCore) ? s["ActionsMenu--Active"] : '')}
                                    onClick={() => deleteImplicantOfUserCoreItem(index)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            }

            {
                currentStep >= 6 &&
                <section className={s["Test-Section"]}>
                    <h3>6. Шостий крок</h3>
                    <p>Введіть МДНФ в форматі - ab!c v b!c</p>
                    <TextField
                        value={userMDNF}
                        className={s["Test-ThirdStepTextField"]}
                        label="Введіть МДНФ"
                        variant="outlined"
                        size='small'
                        type="text"
                    />
                    <div>
                        {['a', 'b', 'c', 'd', '!', ' v '].map((item, index) => (
                            <Button
                                key={index}
                                className={s["Test-SymbolBtn"]}
                                variant="outlined"
                                color="primary"
                                onClick={() => setUserMDNF(userMDNF + item)}
                                size="small"
                            >
                                {item}
                            </Button>
                        ))}
                        <Button
                            className={s["Test-SymbolBtn"]}
                            variant="outlined"
                            color="primary"
                            onClick={() => setUserMDNF(userMDNF.slice(0, -1))}
                            size="small"
                        >
                            ←
                        </Button>
                    </div>
                </section>
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

            {testFinished &&
                <section>
                    <h3>Ваш бал: x</h3>
                    {userResult.step3.notFoundPares.length > 0 &&
                        <p>
                            На третьому кроці ви не знайшли такі пари:<br></br>
                            {userResult.step3.notFoundPares.map((item, index) => (
                                <span>[{item[0] + ' - ' + item[1]}]
                                    {userResult.step3.notFoundPares.length - 1 === index ? ' ' : ', '}
                                </span>
                            ))}
                            <br></br>
                            Через це ви одержуєте: -x баллів
                        </p>
                    }

                    {userResult.step3.mismatchedPairs.length > 0 &&
                        <p>Також пари, які ви знайшли неправильно:
                            <pre>{userResult.step3.mismatchedPairs.map((item, index) => (
                                <span>[{item[0] + ' - ' + item[1]}]
                                    {userResult.step3.mismatchedPairs.length - 1 === index ? ' ' : ', '}
                                </span>
                            ))}</pre>
                            Через це ви одержуєте: -x баллів
                        </p>
                    }
                    <Divider />
                    {userResult.step4.notFoundImplicants.length > 0 &&
                        <p>На четвертому кроці ви не знайшли такі імпліканти:
                            <br></br>
                            {userResult.step4.notFoundImplicants.map((item, index) => (
                                <span>[{item}]
                                    {userResult.step4.notFoundImplicants.length - 1 === index ? ' ' : ', '}
                                </span>
                            ))}
                            <br></br>
                            Через це ви одержуєте: -x баллів
                        </p>
                    }
                    {userResult.step4.mismatchedImplicants.length > 0 &&
                        <p>Також імпліканти, які ви знайшли неправильно:
                            <br></br>
                            {userResult.step4.mismatchedImplicants.map((item, index) => (
                                <span>[{item}]
                                    {userResult.step4.notFoundImplicants.length - 1 === index ? ' ' : ', '}
                                </span>
                            ))}
                            <br></br>
                            Через це ви одержуєте: -x баллів
                        </p>
                    }
                    <Divider />
                    {userResult.step5.notFoundImplicants.length > 0 &&
                        <p>На п'ятому кроці ви не знайшли такі імпліканти, які належать до ядра:
                            <br></br>
                            {userResult.step5.notFoundImplicants.map((item, index) => (
                                <span>[{item}]
                                    {userResult.step5.notFoundImplicants.length - 1 === index ? ' ' : ', '}
                                </span>
                            ))}
                            <br></br>
                            Через це ви одержуєте: -x баллів
                        </p>
                    }
                    {userResult.step5.mismatchedImplicants.length > 0 &&
                        <p>Також імпліканти, які ви знайшли неправильно:
                            <br></br>
                            {userResult.step5.mismatchedImplicants.map((item, index) => (
                                <span>[{item}]
                                    {userResult.step5.notFoundImplicants.length - 1 === index ? ' ' : ', '}
                                </span>
                            ))}
                            <br></br>
                            Через це ви одержуєте: -x баллів
                        </p>
                    }

                    <Divider />
                    {userResult.step6.amountOfMismatches > 0 &&
                        <p>На шостому кроці кількість помилок, які ви зробили в МДНФ:
                            {`${userResult.step6.amountOfMismatches} шт.`}
                            <p> Через це ви одержуєте: -x баллів</p>
                        </p>
                    }

                </section>
            }


            <Dialog
                open={dialogIsOpen}
                onClose={() => handleCloseDialog(false)}
            >
                <DialogTitle>
                    {"Закінчити тест"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ви дійсно бажаєте закінчити тест? Після відправки результату у вас буде можливість
                        дізнатися свій балл та подивитись правильне рішення.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog(false)} type="error">Назад</Button>
                    <Button onClick={() => handleCloseDialog(true)} type="success">Відправити</Button>
                </DialogActions>
            </Dialog>

        </div >
    )
}

export default Test
