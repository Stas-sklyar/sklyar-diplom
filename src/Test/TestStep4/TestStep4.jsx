import s from '../Test.module.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

function TestStep4({ selectedLastImplicants, setSelectedLastImplicants }) {
    const [lastImplicants, setLastImplicants] = useState('')
    const [selectedIndexOfLastImplicantItem, setSelectedIndexOfLastImplicantItem] = useState(-1)

    const openLastImplicantItemActionsMenu = (index) => {
        setSelectedIndexOfLastImplicantItem(index)
    }

    const hideLastImplicantItemActionsMenu = () => {
        setSelectedIndexOfLastImplicantItem(-1)
    }

    const deleteLastImplicantItem = (index) => {
        let newArr = selectedLastImplicants
        newArr.splice(index, 1)
        setSelectedLastImplicants([...newArr])
    }

    const handleLastImplicant = (value) => {
        if (
            !(value.length > 4) &&
            (
                value[value.length - 1] === '1' ||
                value[value.length - 1] === '0' ||
                value[value.length - 1] === 'x'
            )
        ) {
            setLastImplicants(value)
        }
    }

    const handleAddLastImplicant = (lastImplicants) => {
        if (lastImplicants.length !== 4) {
            return
        }
        let newArr = selectedLastImplicants
        newArr.push([lastImplicants])
        setSelectedLastImplicants([...newArr])
        setLastImplicants('')
    }

    return (
        <section className={s["Test-Section"]}>
            <h3>2. Другий Крок</h3>
            <p>Результат склейки + імпліканти які не склеялись ні з чим</p>

            <div>
                <div className={s["Test-AddItemForm"]}>
                    <TextField
                        value={lastImplicants}
                        onChange={e => handleLastImplicant(e.target.value)}
                        className={s["Test-ThirdStepTextField"]}
                        label="Введіть імпліканту"
                        variant="outlined"
                        size='small'
                        type="text"
                    />
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handleAddLastImplicant(lastImplicants)}
                        size='small'
                    >
                        Додати імпліканту
                    </Button>
                </div>

                <div>
                    {selectedLastImplicants.map((item, index) => (
                        <div key={index}
                            className={s["Test-LastImplicantItem"]}
                            onMouseEnter={() => openLastImplicantItemActionsMenu(index)}
                            onMouseLeave={() => hideLastImplicantItemActionsMenu()}
                        >
                            <div>
                                [{item.join(' - ')}]
                                {index !== selectedLastImplicants.length - 1 ? ',' : ' '}
                            </div>

                            <div
                                className={s["ActionsMenu"] + " " + ((index === selectedIndexOfLastImplicantItem) ? s["ActionsMenu--Active"] : '')}
                                onClick={() => deleteLastImplicantItem(index)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestStep4