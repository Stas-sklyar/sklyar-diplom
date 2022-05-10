import s from './Calc.module.scss'
import calc from '../scripts/calc'

function Calc() {

  const result = calc(4, [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1])
  console.log(result)

  return (
    <div className={s["Calc"]}>
      <pre>{JSON.stringify(result.test)}</pre>
    </div>
  )
}

export default Calc
