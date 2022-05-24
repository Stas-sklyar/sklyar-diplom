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
                <h2>3. Поки є моливість склеюємо рядки</h2>
                {result.foundPares.map((item, index) => {
                    return (
                        <div key={index}>
                            {index === 1 && <h3>И так далі <br></br>(+ видаляємо однакові імпліканти)</h3>}
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