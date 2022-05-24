import s from '../Calc.module.scss'
import sharedStyles from '../../shared/shared.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide'

function CalcStep5({ result, currentStep, helperArrForTablePokritiya }) {

    return (
        <Slide direction="down" in={currentStep >= 5}>
            <section className={s["Calc-Section"] + " " + s["Calc-Section--Scrollable"]}>
                <h2>5. Знаходимо Ядро</h2>
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
                                <TableCell className={
                                    currentStep >= 5 &&
                                        result.core.find(item => item.join('') === result.leftSideTablePokritiya[index].join(''))
                                        ? sharedStyles["HightlightCell"]
                                        : ''
                                }>{result.leftSideTablePokritiya[index]}</TableCell>
                                {row.reverse().map((col, index) => (
                                    <TableCell key={index}>{col}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div>
                    <span>Ядро: </span>
                    {result.core.map((item, index) => (
                        <b key={index}>{item.join('')} {index !== (result.core.length - 1) ? ' v ' : ''} </b>
                    ))}
                </div>

                <Divider />
            </section>
        </Slide>
    )
}

export default CalcStep5