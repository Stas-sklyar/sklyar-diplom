import s from '../Calc.module.scss'
import sharedStyles from '../../shared/shared.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide'

function CalcStep7({ result, currentStep, helperArrForTablePokritiya }) {

    return (
        <Slide direction="down" in={currentStep >= 7}>
            <section className={s["Calc-Section"] + " " + s["Calc-Section--Scrollable"]}>
                <h2>7. Пошук бракуючих імплікант, для покриття <br></br>всіх стовпців таблиці покриття</h2>
                <p>Для стовпців які не мають перетину з ядром є можливість вибрати довільну імпліканту,<br></br> але потрібно щоб ця імпліканта входила в мінтерм цього стовпця. </p>
                <p>Якщо ядро покриває всі стовпці, то відповідно ніякі імпліканти вибирати <b>не потрібно</b>.</p>
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

                {result.dopImplicants.length > 0 &&
                    <div>
                        <span>?Останні імпліканти?: </span>
                        {result.dopImplicants.map((item, index) => (
                            <b key={index}>{item.join('')} {index !== (result.dopImplicants.length - 1) ? ' v ' : ''} </b>
                        ))}
                    </div>
                }
                {result.dopImplicants.length === 0 &&
                    <div>Ядро покриває всі стовпці</div>
                }
                <Divider />
            </section>
        </Slide>
    )
}

export default CalcStep7