import s from './TestMode.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import DemoMod from '../scripts/demo-mode'
import TextField from '@mui/material/TextField'


function TestMode() {
    const [sourceTable, setSourceTable] = useState([])
    const [task, setTask] = useState([])
    const [tableOnlyTrue, setTableOnlyTrue] = useState([])
    const [tableAfterFindPares, setTableAfterFindPares] = useState([])
    const [tableAfterFindPares2, setTableAfterFindPares2] = useState([])
    const [MDNF, setMDNF] = useState('')

    const [generatedTask, setGeneratedTask] = useState('0110011000110011')
    const [userAnswer, setUserAnswer] = useState('')
    const [resultIsReady, setResultIsReady] = useState(false)
    const [showSolution, setShowSolution] = useState(false)
    const [answerIsCorrect, setAnswerIsCorrect] = useState(false)

    const sendForCheck = () => {
        let task = generatedTask.split('')
        task = task.map(item => parseInt(item))
        let result = DemoMod(task)

        setSourceTable(result[0])
        setTask(result[1])
        setTableOnlyTrue(result[2])
        setTableAfterFindPares(result[3])
        setTableAfterFindPares2(result[4])
        setMDNF(result[5])

        setResultIsReady(true)
        setShowSolution(false)
        alert("Решение отправлено напроверку преподавателю!")
    }

    useEffect(() => {
        setAnswerIsCorrect(userAnswer === MDNF)
    }, [resultIsReady])

    if (!showSolution) {
        return (
            <div className={s["TestMode"]}>
                <h1>Режим Теста</h1>

                <div className={s["TestMode-Form"]}>
                    <h3>Ваша задача: {generatedTask}</h3>
                    <h3>Введите ответ: </h3>
                    <TextField
                        label="Введите ответ"
                        variant="outlined"
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={resultIsReady}
                    />
                    <Button className={s["TestMode-Btn"]}
                        variant="contained"
                        onClick={() => sendForCheck()}
                    >
                        Отправить решение
                    </Button>
                    {answerIsCorrect && resultIsReady &&
                        <div>Правильно! <strong>{MDNF + ' | ' + userAnswer}</strong></div>
                    }
                    {!answerIsCorrect && resultIsReady &&
                        <div>Неправильно! <strong>{MDNF + ' | ' + userAnswer}</strong></div>
                    }
                    {resultIsReady &&
                        <Button className={s["TestMode-Btn"]} variant="contained" onClick={() => setShowSolution(true)}>Смотреть ответ</Button>
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={s["TestMode"]}>
                <h1>Режим Теста</h1>

                <div className={s["TestMode-Form"]}>
                    <h3>Ваша задача: {generatedTask}</h3>
                    <h3>Введите ответ: </h3>
                    <TextField
                        label="Введите ответ"
                        variant="outlined"
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={resultIsReady}
                    />
                    <Button className={s["TestMode-Btn"]}
                        variant="contained"
                        onClick={() => sendForCheck()}
                    >
                        Отправить решение
                    </Button>
                    {MDNF == userAnswer && resultIsReady &&
                        <div>Правильно! {MDNF + ' ' + userAnswer}</div>
                    }
                    {MDNF != userAnswer && resultIsReady &&
                        <div>Неправильно! {MDNF + ' ' + userAnswer}</div>
                    }
                    {resultIsReady &&
                        <Button className={s["TestMode-Btn"]} variant="contained" onClick={() => setShowSolution(true)}>Смотреть ответ</Button>
                    }
                </div>

                <h3>Задача: {task}</h3>


                <section>
                    <h3>Исходная таблица</h3>
                    <Table className={s["TestMode-SourceTable"]}>
                        <TableHead>
                            <TableRow className={s["TestMode-TableRow"]}>
                                <TableCell className={s["TestMode-TableCell"]} align="center">a</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">b</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">c</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">d</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">F</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sourceTable.map((row, index) => (
                                <TableRow className={s["TestMode-TableRow"]} key={index}>
                                    <TableCell className={s["TestMode-TableCell"]} component="th" scope="row" align="center">{row[0]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[1]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[2]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[3]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{task[index]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>

                <section>
                    <h3>Ищем строки там где F = 1</h3>
                    <Table className={s["TestMode-SourceTable"]}>
                        <TableHead>
                            <TableRow className={s["TestMode-TableRow"]}>
                                <TableCell className={s["TestMode-TableCell"]} align="center">a</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">b</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">c</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">d</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableOnlyTrue.map((row, index) => (
                                <TableRow className={s["TestMode-TableRow"]} key={index}>
                                    <TableCell className={s["TestMode-TableCell"]} component="th" scope="row" align="center">{row[0]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[1]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[2]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[3]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>

                <section>
                    <h3>Склеиваем 1</h3>
                    <Table className={s["TestMode-SourceTable"]}>
                        <TableHead>
                            <TableRow className={s["TestMode-TableRow"]}>
                                <TableCell className={s["TestMode-TableCell"]} align="center">a</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">b</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">c</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">d</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableAfterFindPares.map((row, index) => (
                                <TableRow className={s["TestMode-TableRow"]} key={index}>
                                    <TableCell className={s["TestMode-TableCell"]} component="th" scope="row" align="center">{row[0]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[1]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[2]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[3]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>

                <section>
                    <h3>Склеиваем 2</h3>
                    <Table className={s["TestMode-SourceTable"]}>
                        <TableHead>
                            <TableRow className={s["TestMode-TableRow"]}>
                                <TableCell className={s["TestMode-TableCell"]} align="center">a</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">b</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">c</TableCell>
                                <TableCell className={s["TestMode-TableCell"]} align="center">d</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableAfterFindPares2.map((row, index) => (
                                <TableRow className={s["TestMode-TableRow"]} key={index}>
                                    <TableCell className={s["TestMode-TableCell"]} component="th" scope="row" align="center">{row[0]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[1]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[2]}</TableCell>
                                    <TableCell className={s["TestMode-TableCell"]} align="center">{row[3]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>

                <section>
                    <h3>МДНФ</h3>
                    <h4>{MDNF}</h4>
                </section>
            </div>
        )
    }
}

export default TestMode;
