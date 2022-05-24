import s from '../Calc.module.scss'
import sharedStyles from '../../shared/shared.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide'

function CalcStep4({ result, currentStep, helperArrForTablePokritiya }) {

    return (
        <Slide direction="down" in={currentStep >= 4}>
            <section className={s["Calc-Section"] + " " + s["Calc-Section--Scrollable"]}>
                <h2>4. Таблиця покриття</h2>
                <Table className={sharedStyles["Table"]}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {result.tableOnlyTrue.map((row, index) => (
                                <TableCell key={index}>{row}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {helperArrForTablePokritiya.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{result.leftSideTablePokritiya[index]}</TableCell>
                                {row.reverse().map((col, index) => (
                                    <TableCell key={index}>{col}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Divider />
            </section>
        </Slide>
    )
}

export default CalcStep4