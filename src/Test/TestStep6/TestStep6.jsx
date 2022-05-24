import s from '../Test.module.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function TestStep6({ userMDNF, setUserMDNF }) {

    return (
        <section className={s["Test-Section"]}>
            <h3>4. Четвертий крок</h3>
            <p>Введіть МДНФ в форматі - ab!c v b!c</p>

            <TextField
                value={userMDNF}
                className={s["Test-ThirdStepTextField"]}
                label="Введіть МДНФ"
                variant="outlined"
                size='small'
                type="text"
            />
            <div>
                {['a', 'b', 'c', 'd', '!', ' v '].map((item, index) => (
                    <Button
                        key={index}
                        className={s["Test-SymbolBtn"]}
                        variant="outlined"
                        color="primary"
                        onClick={() => setUserMDNF(userMDNF + item)}
                        size="small"
                    >
                        {item}
                    </Button>
                ))}
                <Button
                    className={s["Test-SymbolBtn"]}
                    variant="outlined"
                    color="primary"
                    onClick={() => setUserMDNF(userMDNF.slice(0, -1))}
                    size="small"
                >
                    ←
                </Button>
            </div>
        </section>
    )
}

export default TestStep6