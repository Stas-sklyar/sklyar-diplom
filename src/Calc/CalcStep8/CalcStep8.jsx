import s from '../Calc.module.scss'
import Slide from '@mui/material/Slide'

function CalcStep8({ result, currentStep }) {

    return (
        <Slide direction="down" in={currentStep >= 8}>
            <section className={s["Calc-Section"]}>
                <h2>8. Знаходження МДНФ</h2>
                <p>Далі за допомогою логічної операції дизюнкції, ми поєднаємо ядро й вибрані нами,<br></br> на попередньому етапі, імпліканти (в наведеному прикладі МДНФ є ядром).</p>
                <p>МДНФ в форматі 1x01: 
                    {result.resultArr.map((item, index) => (
                        <b key={index}> {item.join('')} {index !== (result.resultArr.length - 1) ? ' v ' : ''} </b>
                    ))}
                </p>
                <p>МДНФ в форматі abcd: 
                    <b> F = {result.mdnf}</b>
                </p>
            </section>
        </Slide>
    )
}

export default CalcStep8