import s from '../Calc.module.scss'
import Slide from '@mui/material/Slide'

function CalcStep8({ result, currentStep }) {

    return (
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
    )
}

export default CalcStep8