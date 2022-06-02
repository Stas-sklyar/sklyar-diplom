import s from '../Calc.module.scss'
import sharedStyles from '../../shared/shared.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide'

function CalcStep6({ result, currentStep, helperArrForTablePokritiya }) {

    return (
        <Slide direction="down" in={currentStep >= 6}>
            <section className={s["Calc-Section"] + " " + s["Calc-Section--Scrollable"]}>
                <h2>6. ?викреслювання стовпців?</h2>
                 <p>Після того як було визначено ядро, починається етап “викреслювання стовпців”.<br></br> Спочатку викреслюємо стовпці які мають перетини з ядром, яке ми знайшли на минулому етапі.</p>
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
                                }>
                                    {result.leftSideTablePokritiya[index]}
                                </TableCell>
                                {row.map((col, index, row) => (
                                    <TableCell key={index}
                                        className={
                                            currentStep >= 6
                                                && (result.coreArrIndexes.find(item => item === helperArrForTablePokritiya.findIndex(item => item === row)) >= 0)
                                                && col === '+'
                                                ? sharedStyles["HightlightCell"]
                                                : ''
                                        }
                                    >
                                        {col}
                                    </TableCell>
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

export default CalcStep6