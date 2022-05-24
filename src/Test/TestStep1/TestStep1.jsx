import s from '../Test.module.scss'
import sharedStyles from '../../shared/shared.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

function TestStep1({ result, currentStep, task }) {

    return (
        <section className={s["Test-Section"]}>
            <h3>Ваше завдання: {task}</h3>
            <h4>Формуємо таблицю істиності</h4>
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
    )
}

export default TestStep1