import s from '../Calc.module.scss'
import sharedStyles from '../../shared/shared.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide'

function CalcStep1({ result, currentStep }) {

    return (
        <Slide direction="down" in={currentStep >= 1}>
            <section className={s["Calc-Section"]}>
                <h2>1. Формуємо таблицю істиності</h2>
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

                <Divider />
            </section>
        </Slide>
    )
}

export default CalcStep1