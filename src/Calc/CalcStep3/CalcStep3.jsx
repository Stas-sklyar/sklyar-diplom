import s from '../Calc.module.scss'
import sharedStyles from '../../shared/shared.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide'

function CalcStep3({ result, currentStep }) {

    return (
        <Slide direction="down" in={currentStep >= 3}>
            <section className={s["Calc-Section"]}>
                <h2>3. Пошук пар між сусідніми групами в відсортованій таблиці</h2>
                <p>Далі потрібно <b>комбінувати</b> між собою мінтерми (іншими словами проводити операцію склеювання). </p>
                <p>Якщо два мінтерми відрізняються лише на один символом, що стоїть в той же самій позиції в обох мінтермах,<br></br> <b>заміняємо</b> цей символ на «х», це означає, що даний символ в подальшому для нас не має значення. </p>
                {result.foundPares.map((item, index) => {
                    return (
                        <div key={index}>
                            {index === 1 &&
                                <p>При переході до імплікант другого рангу, трактуємо «х» як третє значення.<br></br> Наприклад: x111 і x110 або x011x можуть бути комбіновані, а x110 і 011x не можуть.</p>
                            }
                            <Table className={sharedStyles["Table"]} key={index}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>№</TableCell>
                                        <TableCell>a</TableCell>
                                        <TableCell>b</TableCell>
                                        <TableCell>c</TableCell>
                                        <TableCell>d</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index}</TableCell>
                                            {<TableCell>{result.foundParesIndexes[index + result.foundPares.findIndex(p => p === item)].join(' - ')}</TableCell>}
                                            <TableCell>{row[0]}</TableCell>
                                            <TableCell>{row[1]}</TableCell>
                                            <TableCell>{row[2]}</TableCell>
                                            <TableCell>{row[3]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )
                })}

                <Divider />
            </section>
        </Slide>
    )
}

export default CalcStep3