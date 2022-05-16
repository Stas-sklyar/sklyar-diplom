import s from './Test.module.scss'
import stylesCalc from '../Calc/Calc.module.scss'
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

function Test() {
    const [studentName, setStudentName] = useState("")
    const [studentGroup, setStudentGroup] = useState("")

    const [seconds, setSeconds] = useState(600)
    const [timerActive, setTimerActive] = useState(false)

    const [currentStep, setCurrentStep] = useState(0)

    const [task, setTask] = useState('0000100011111011')

    const [implicantPair, setImplicantPair] = useState('')
    const [selectedPairsOfImplicants, setSelectedPairsOfImplicants] = useState([])

    const [lastImplicants, setLastImplicants] = useState('')
    const [selectedLastImplicants, setSelectedLastImplicants] = useState([])

    const [userCore, setUserCore] = useState('')
    const [userMDNF, setUserMDNF] = useState('')

    const [result, setResult] = useState()

    const [closeDialogIsOpen, setCloseDialogIsOpen] = useState(false);

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

    // CLOSE TEST ------------------
    const handleCloseDialog = (next) => {
        if (next) {
            sendTest()
        }
        setCloseDialogIsOpen(false)
    }

    // SEND TEST AND CALC RESULT
    const sendTest = () => {
        let userAnswers = {
            selectedPairsOfImplicants,
            selectedLastImplicants,
            userCore,
            userMDNF
        }
        handleTest(userAnswers, result)

        alert("Тест відправленно!")
        // setCurrentStep(0)
    }

    return (
        <div className={s["Test"]}>
            {timerActive && currentStep !== 0 &&
                <h4>
                    {
                        (seconds / 60).toFixed(0) - 1 === 0
                            ? 'Остання хвилина!'
                            : 'Залишилось: ' + ((seconds / 60).toFixed(0) - 1) + ' хвилин'
                    }
                </h4>
            }

            {currentStep === 0 &&
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
                    <Table className={stylesCalc["Calc-Table"]}>
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
                                    className={(currentStep >= 2 && result.task[index] === 1) ? stylesCalc["Calc-HightlightRow"] : ''}
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
                        <Table className={stylesCalc["Calc-Table"]}>
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

                        <p>
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
                        </p>
                    </div>
                </section>
            }

            {
                currentStep >= 5 &&
                <section className={s["Test-Section"]}>
                    <h3>5. П'ятий крок</h3>
                    <p>Введіть ядро в форматі - ab!cvb!c</p>
                    <TextField
                        value={userCore}
                        className={s["Test-ThirdStepTextField"]}
                        label="Введіть ядро"
                        variant="outlined"
                        size='small'
                        type="text"
                    />
                    <div>
                        {['a', 'b', 'c', 'd', '!', 'v'].map(item => (
                            <Button
                                className={s["Test-SymbolBtn"]}
                                variant="outlined"
                                color="primary"
                                onClick={() => setUserCore(userCore + item)}
                                size="small"
                            >
                                {item}
                            </Button>
                        ))}
                        <Button
                            className={s["Test-SymbolBtn"]}
                            variant="outlined"
                            color="primary"
                            onClick={() => setUserCore(userCore.slice(0, -1))}
                            size="small"
                        >
                            ←
                        </Button>
                    </div>
                </section>
            }

            {
                currentStep >= 6 &&
                <section className={s["Test-Section"]}>
                    <h3>6. Шостий крок</h3>
                    <p>Введіть МДНФ в форматі - ab!cvb!c</p>
                    <TextField
                        value={userMDNF}
                        className={s["Test-ThirdStepTextField"]}
                        label="Введіть МДНФ"
                        variant="outlined"
                        size='small'
                        type="text"
                    />
                    <div>
                        {['a', 'b', 'c', 'd', '!', 'v'].map(item => (
                            <Button
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
                    className={stylesCalc["Calc-NextStepBtn"]}
                    variant="contained"
                    onClick={() => setCurrentStep(currentStep + 1)}
                >
                    Наступний крок
                </Button>
            }
            {
                currentStep === 6 &&
                <Button
                    className={stylesCalc["Calc-NextStepBtn"]}
                    variant="contained"
                    onClick={() => setCloseDialogIsOpen(true)}
                >
                    Завершити тест
                </Button>
            }


            <Dialog
                open={closeDialogIsOpen}
                onClose={handleCloseDialog}
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
