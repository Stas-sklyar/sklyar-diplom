import s from './Calc.module.scss'
import sharedStyles from '../shared/shared.module.scss'
import calc from '../scripts/calc'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import rotateRight90 from '../scripts/rotate-matrix'
import CalcStep1 from './CalcStep1/CalcStep1'
import CalcStep2 from './CalcStep2/CalcStep2'
import CalcStep3 from './CalcStep3/CalcStep3'
import CalcStep4 from './CalcStep4/CalcStep4'
import CalcStep5 from './CalcStep5/CalcStep5'
import CalcStep6 from './CalcStep6/CalcStep6'
import CalcStep7 from './CalcStep7/CalcStep7'
import CalcStep8 from './CalcStep8/CalcStep8'

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
        <Button variant="contained" onClick={() => onCalc()}>Мінімізувати</Button>
      </section>

      {currentStep >= 1 &&
        <CalcStep1 currentStep={currentStep} result={result} />
      }

      {currentStep >= 2 &&
        <CalcStep2 currentStep={currentStep} result={result} />
      }

      {currentStep >= 3 &&
        <CalcStep3 currentStep={currentStep} result={result} />
      }

      {currentStep >= 4 &&
        <CalcStep4
          currentStep={currentStep}
          result={result}
          helperArrForTablePokritiya={helperArrForTablePokritiya}
        />
      }

      {currentStep >= 5 &&
        <CalcStep5
          currentStep={currentStep}
          result={result}
          helperArrForTablePokritiya={helperArrForTablePokritiya}
        />
      }

      {currentStep >= 6 &&
        <CalcStep6
          currentStep={currentStep}
          result={result}
          helperArrForTablePokritiya={helperArrForTablePokritiya}
        />
      }

      {currentStep >= 7 &&
        <CalcStep7
          currentStep={currentStep}
          result={result}
          helperArrForTablePokritiya={helperArrForTablePokritiya}
        />
      }

      {
        currentStep < 8 && currentStep >= 1 &&
        <Button
          className={sharedStyles["NextStepBtn"]}
          variant="contained"
          onClick={() => setCurrentStep(currentStep + 1)}
        >
          Наступний крок
        </Button>
      }

      {currentStep >= 8 &&
        <CalcStep8 currentStep={currentStep} result={result} />
      }

    </div >
  )
}

export default Calc
