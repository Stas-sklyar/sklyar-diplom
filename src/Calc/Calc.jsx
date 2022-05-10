import s from './Calc.module.scss'
import calc from '../scripts/calc'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

function Calc() {

  const result = calc(4, [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1])
  for (let i = 0; i < result.tablePokritiya.length; i++) {
    for (let key in result.tablePokritiya[i]) {
      result.tablePokritiya[i][key].unshift('???')
    }
  }

  console.log(result)

  return (
    <div className={s["Calc"]}>

      <section className={s["Calc-Task"]}>
        <h2>Введіть задачу: </h2>
        <TextField className={s["Calc-TextField"]} label="Введіть задачу" variant="outlined" type="number" />
        <Button variant="contained">Минимизировать</Button>
      </section>

      <section className={s["Calc-SourceTable"]}>
        <h2>Формуємо таблицю істиності</h2>
        <Table className={s["Calc-Table"]}>
          <TableHead>
            <TableRow>
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
              >
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

      <section className={s["Calc-TableOnlyTrue"]}>
        <h2>Шукаємо рядки там де F = 1</h2>
        <Table className={s["Calc-Table"]}>
          <TableHead>
            <TableRow>
              <TableCell>a</TableCell>
              <TableCell>b</TableCell>
              <TableCell>c</TableCell>
              <TableCell>d</TableCell>
              <TableCell>F</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.tableOnlyTrue.map((row, index) => (
              <TableRow
                key={index}
              >
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

      <section className={s["Calc-SimplifiedTables"]}>
        <h2>Поки є моливість склеюємо рядки</h2>
        {result.foundPares.map((item) => {
          return (
            <Table className={s["Calc-Table"]}>
              <TableHead>
                <TableRow>
                  <TableCell>a</TableCell>
                  <TableCell>b</TableCell>
                  <TableCell>c</TableCell>
                  <TableCell>d</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item.map((row, index) => (
                  <TableRow key={index} >
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[2]}</TableCell>
                    <TableCell>{row[3]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        })}

      </section>

      <section className={s["Calc-TableOnlyTrue"]}>
        <h2>Таблиця покриття</h2>
        <Table className={s["Calc-Table"]}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {result.lastTableWhereNotFoundPares.map((row, index) => (
                <TableCell key={index}>{row}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {result.tablePokritiya.map((row, index) => (
              <TableRow>
                {row.map((row2, index) => (
                  <TableCell>{row2[index] + ""}</TableCell>
                ))}
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </section>

    </div>
  )
}

export default Calc
