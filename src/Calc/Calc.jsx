import s from './Calc.module.scss'
import calc from '../scripts/calc'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useState } from 'react'
import Divider from '@mui/material/Divider'
import { rotateRight90 } from '../scripts/rotate-matrix'
import Slide from '@mui/material/Slide'

function Calc() {
  const [currentStep, setCurrentStep] = useState(0)
  const [task, setTask] = useState('0000100011111011')
  const [result, setResult] = useState()
  const [helperArrForTablePokritiya, setHelperArrForTablePokritiya] = useState()

  const onCalc = () => {
    const parsedTask = task.split('').map((item) => { return parseInt(item) })
    const resultObj = calc(4, parsedTask)
    let helperArrForTablePokritiya = []
    for (let i = 0; i < resultObj.tablePokritiya.length; i++) {
      for (let key in resultObj.tablePokritiya[i]) {
        helperArrForTablePokritiya.push(resultObj.tablePokritiya[i][key])
      }
    }
    setHelperArrForTablePokritiya(rotateRight90(helperArrForTablePokritiya))

    setResult(resultObj)
    setCurrentStep(currentStep + 1)
    console.log(resultObj)
  }

  return (
    <div className={s["Calc"]}>

      <section className={s["Calc-Task"]}>
        <h2>Введіть задачу: </h2>
        <TextField
          value={task}
          onChange={(e) => {
            !(e.target.value.length > 16) &&
              setTask(e.target.value)
          }}
          className={s["Calc-TextField"]}
          label="Введіть задачу"
          variant="outlined"
          type="number"
        />
        <Button variant="contained" onClick={() => onCalc()}>Минимизировать</Button>
      </section>

      {currentStep >= 1 &&
        <Slide direction="down" in={currentStep >= 1}>
          <section className={s["Calc-Section"]}>
            <h2>1. Формуємо таблицю істиності</h2>
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
                    className={(currentStep >= 2 && result.task[index] === 1) ? s["Calc-HightlightRow"] : ''}
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

            <Divider />
          </section>
        </Slide>
      }

      {currentStep >= 2 &&
        <Slide direction="down" in={currentStep >= 2}>
          <section className={s["Calc-Section"]}>
            <h2>2. Шукаємо рядки там де F = 1</h2>
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

            <Divider />
          </section>
        </Slide>
      }

      {
        currentStep >= 3 &&
        <Slide direction="down" in={currentStep >= 3}>
          <section className={s["Calc-Section"]}>
            <h2>3. Поки є моливість склеюємо рядки</h2>
            {result.foundPares.map((item, index) => {
              return (
                <Table className={s["Calc-Table"]} key={index}>
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

            <Divider />
          </section>
        </Slide>
      }

      {
        currentStep >= 4 &&
        <Slide direction="down" in={currentStep >= 4}>
          <section className={s["Calc-Section"]}>
            <h2>4. Таблиця покриття</h2>
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
                    {row.reverse().map((col, index) => (
                      <TableCell key={index}>{col}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Divider />
          </section>
        </Slide>
      }

      {
        currentStep >= 5 &&
        <Slide direction="down" in={currentStep >= 5}>
          <section className={s["Calc-Section"]}>
            <h2>5. Знаходимо Ядро</h2>
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
                    <TableCell
                      className={
                        currentStep >= 5 &&
                          result.core.find(item => item.join('') === result.foundPares[result.foundPares.length - 1][index].join(''))
                          ? s["Calc-HightlightCell"]
                          : ''
                      }
                    >
                      {result.foundPares[result.foundPares.length - 1][index]}
                    </TableCell>
                    {row.map((col, index) => (
                      <TableCell
                        key={index}
                      >
                        {col}
                      </TableCell>
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
      }

      {
        currentStep >= 6 &&
        <Slide direction="down" in={currentStep >= 6}>
          <section className={s["Calc-Section"]}>
            <h2>6. ?З'єднуємо?</h2>
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
                    <TableCell
                      className={
                        currentStep >= 6 &&
                          result.core.find(item => item.join('') === result.foundPares[result.foundPares.length - 1][index].join(''))
                          ? s["Calc-HightlightCell"]
                          : ''
                      }
                    >
                      {result.foundPares[result.foundPares.length - 1][index]}
                    </TableCell>
                    {row.map((col, index, row) => (
                      <TableCell key={index}
                        className={
                          currentStep >= 6
                            && (result.coreArrIndexes.find(item => item === helperArrForTablePokritiya.findIndex(item => item === row)) >= 0)
                            && col === '+'
                            ? s["Calc-HightlightCell"]
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
      }

      {
        currentStep >= 7 &&
        <Slide direction="down" in={currentStep >= 7}>
          <section className={s["Calc-Section"]}>
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
                    {row.map((col, index) => (
                      <TableCell key={index}>{col}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div>
              <span>?Останні імпліканти?: </span>
              {result.dopImplicants.map((item, index) => (
                <b key={index}>{item.join('')} {index !== (result.dopImplicants.length - 1) ? ' v ' : ''} </b>
              ))}
            </div>
            <Divider />
          </section>
        </Slide>
      }

      {
        currentStep < 8 && currentStep >= 1 &&
        <Button
          className={s["Calc-NextStepBtn"]}
          variant="contained"
          onClick={() => setCurrentStep(currentStep + 1)}
        >Наступний крок
        </Button>
      }

      {
        currentStep >= 8 &&
        <Slide direction="down" in={currentStep >= 8}>
          <section className={s["Calc-Section"]}>
            <h3>МДНФ в формате 1/0/x</h3>
            {result.resultArr.map((item, index) => (
              <b key={index}>{item.join('')} {index !== (result.resultArr.length - 1) ? ' v ' : ''} </b>
            ))}
            <h3>МДНФ в формате a/b/c/d</h3>
            <b>F = {result.mdnf}</b>
          </section>
        </Slide>
      }

    </div >
  )
}

export default Calc
