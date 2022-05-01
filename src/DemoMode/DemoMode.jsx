import s from './DemoMode.module.scss'
import DemoMod from '../scripts/demo-mode'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import { useState } from 'react'

function DemoMode() {
    const [sourceTable, task, tableOnlyTrue, tableAfterFindPares, tableAfterFindPares2, MDNF] = DemoMod()
    const [currentStep, setCurrentStep] = useState(1)

    console.log(tableAfterFindPares)


    return (
        <div className={s["DemoMode"]}>
            <h1>Демонстрационный режим</h1>

            {currentStep >= 1 &&
                <h3>Задача: {task}</h3>
            }


            {currentStep >= 2 &&
                <section>
                    <h3>Исходная таблица</h3>
                    <Table className={s["DemoMode-SourceTable"]}>
                        <TableHead>
                            <TableRow className={s["DemoMode-TableRow"]}>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">a</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">b</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">c</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">d</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">F</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sourceTable.map((row, index) => (
                                <TableRow className={s["DemoMode-TableRow"]} key={row}>
                                    <TableCell className={s["DemoMode-TableCell"]} component="th" scope="row" align="center">{row[0]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[1]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[2]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[3]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{task[index]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            }

            {currentStep >= 3 &&
                <section>
                    <h3>Ищем строки там где F = 1</h3>
                    <Table className={s["DemoMode-SourceTable"]}>
                        <TableHead>
                            <TableRow className={s["DemoMode-TableRow"]}>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">a</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">b</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">c</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">d</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableOnlyTrue.map((row) => (
                                <TableRow className={s["DemoMode-TableRow"]} key={row}>
                                    <TableCell className={s["DemoMode-TableCell"]} component="th" scope="row" align="center">{row[0]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[1]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[2]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[3]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            }

            {currentStep >= 4 &&
                <section>
                    <h3>Склеиваем 1</h3>
                    <Table className={s["DemoMode-SourceTable"]}>
                        <TableHead>
                            <TableRow className={s["DemoMode-TableRow"]}>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">a</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">b</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">c</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">d</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableAfterFindPares.map((row) => (
                                <TableRow className={s["DemoMode-TableRow"]} key={row}>
                                    <TableCell className={s["DemoMode-TableCell"]} component="th" scope="row" align="center">{row[0]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[1]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[2]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[3]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            }

            {currentStep >= 5 &&
                <section>
                    <h3>Склеиваем 2</h3>
                    <Table className={s["DemoMode-SourceTable"]}>
                        <TableHead>
                            <TableRow className={s["DemoMode-TableRow"]}>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">a</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">b</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">c</TableCell>
                                <TableCell className={s["DemoMode-TableCell"]} align="center">d</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableAfterFindPares2.map((row) => (
                                <TableRow className={s["DemoMode-TableRow"]} key={row}>
                                    <TableCell className={s["DemoMode-TableCell"]} component="th" scope="row" align="center">{row[0]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[1]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[2]}</TableCell>
                                    <TableCell className={s["DemoMode-TableCell"]} align="center">{row[3]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            }

            {currentStep >= 6 &&
                <section>
                    <h3>МДНФ</h3>
                    <h4>{MDNF}</h4>
                </section>
            }

            {currentStep < 6 &&
                <Button className={s["DemoMode-Btn"]} variant="contained" onClick={() => setCurrentStep(currentStep + 1)}>Следующий шаг</Button>
            }
        </div>
    );
}

export default DemoMode;
