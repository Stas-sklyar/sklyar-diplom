import s from '../Calc.module.scss'
import sharedStyles from '../../shared/shared.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide'

function CalcStep2({ result, currentStep }) {

    return (
        <Slide direction="down" in={currentStep >= 2}>
          <section className={s["Calc-Section"]}>
            <h2>2. Формування таблиці в якій f(a,b,c,d) = 1</h2>
            <p>Далі потрібно сформувати нову таблицю з мінтермами для яких f(a,b,c,d) = 1,<br></br> а також потрібно <b>згрупувати</b> мінтерми по кількості одиниць в них. </p>
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

            <Divider />
          </section>
        </Slide>
    )
}

export default CalcStep2