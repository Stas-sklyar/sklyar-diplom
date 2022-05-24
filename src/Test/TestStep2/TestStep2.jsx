import s from '../Test.module.scss'
import sharedStyles from '../../shared/shared.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Slide from '@mui/material/Slide'

function TestStep2({ result, currentStep }) {

    return (
        <Slide direction="down" in={currentStep >= 2}>
            <section className={s["Test-Section"]}>
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
    )
}

export default TestStep2