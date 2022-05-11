import s from './Calc.module.scss'
import calc from '../scripts/calc'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Divider from '@mui/material/Divider'

function rotateRight90(matrix) {
  let result = [];
  for (let i = matrix.length - 1; i >= 0; i--) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!result[j]) {
        result[j] = [];
      }
      result[j].push(matrix[i][j]);
    }
  }
  return result;
}

function Calc() {

  const result = calc(4, [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1])
  let helperArrForTablePokritiya = []
  for (let i = 0; i < result.tablePokritiya.length; i++) {
    for (let key in result.tablePokritiya[i]) {
      helperArrForTablePokritiya.push(result.tablePokritiya[i][key])
    }
  }
  helperArrForTablePokritiya = rotateRight90(helperArrForTablePokritiya)

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
      <Divider />

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
      <Divider />

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
      <Divider />

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
            {helperArrForTablePokritiya.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{result.foundPares[result.foundPares.length - 1][index]}</TableCell>
                {row.reverse().map((col) => (
                  <TableCell>{col}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <Divider />

      <section className={s["Calc-TableOnlyTrue"]}>
        <h2>Знаходимо Ядро</h2>
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
            {helperArrForTablePokritiya.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{result.foundPares[result.foundPares.length - 1][index]}</TableCell>
                {row.map((col) => (
                  <TableCell>{col}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <span>Ядро: </span>
        {result.core.map((item, index) => (
          <b>{item.join('')} {index != (result.core.length - 1) ? ' v ' : ''} </b>
        ))}
      </section>
      <Divider />

      <section className={s["Calc-TableOnlyTrue"]}>
        <h2>?З'єднуємо?</h2>
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
            {helperArrForTablePokritiya.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{result.foundPares[result.foundPares.length - 1][index]}</TableCell>
                {row.map((col) => (
                  <TableCell>{col}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <Divider />

      <section className={s["Calc-TableOnlyTrue"]}>
        <h2>?Знаходимо останні /імпліканти/?</h2>
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
            {helperArrForTablePokritiya.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{result.foundPares[result.foundPares.length - 1][index]}</TableCell>
                {row.map((col) => (
                  <TableCell>{col}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <span>?Останні імпліканти?: </span>
        {result.dopImplicants.map((item, index) => (
          <b>{item.join('')} {index != (result.dopImplicants.length - 1) ? ' v ' : ''} </b>
        ))}
      </section>
      <Divider />

      <section className={s["Calc-TableOnlyTrue"]}>
        <h3>МДНФ в формате 1/0/x</h3>
        {result.resultArr.map((item, index) => (
          <b>{item.join('')} {index != (result.resultArr.length - 1) ? ' v ' : ''} </b>
        ))}
        <h3>МДНФ в формате a/b/c/d</h3>
        <b>F = {result.mdnf}</b>
      </section>

    </div >
  )
}

export default Calc
