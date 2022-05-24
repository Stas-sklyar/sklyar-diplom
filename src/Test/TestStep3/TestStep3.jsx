import s from '../Test.module.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

function TestStep3({ selectedPairsOfImplicants, setSelectedPairsOfImplicants }) {
    const [implicantPair, setImplicantPair] = useState('')
    const [selectedIndexOfPairItem, setSelectedIndexOfPairItem] = useState(-1)

    const openPairItemActionsMenu = (index) => {
        setSelectedIndexOfPairItem(index)
    }

    const hidePairItemActionsMenu = () => {
        setSelectedIndexOfPairItem(-1)
    }

    const deletePairOfImplicant = (index) => {
        let newArr = selectedPairsOfImplicants
        newArr.splice(index, 1)
        setSelectedPairsOfImplicants([...newArr])
    }

    const handleImplicantPair = (value) => {
        if (!(value.length > 2)) {
            setImplicantPair(value)
        }
    }

    const handleAddImplicantPair = (implicantPair) => {
        if (implicantPair.length !== 2) {
            return
        }
        let newArr = selectedPairsOfImplicants
        newArr.push([implicantPair[0], implicantPair[1]])
        setSelectedPairsOfImplicants([...newArr])
        setImplicantPair('')
    }

    return (
        <section className={s["Test-Section"]}>
            <h3>1. Крок</h3>

            <div>
                <p>Введіть в поле номера імплікант які ми повинні склеяти</p>
                <div className={s["Test-AddItemForm"]}>
                    <TextField
                        value={implicantPair}
                        onChange={e => handleImplicantPair(e.target.value)}
                        className={s["Test-AddItemTextField"]}
                        label="Введіть індекси пар імплікант"
                        variant="outlined"
                        size="small"
                        type="number"
                    />
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handleAddImplicantPair(implicantPair)}
                        size="small"
                    >
                        Додати пару
                    </Button>
                </div>

                <div>
                    {selectedPairsOfImplicants.map((item, index) => (
                        <div
                            key={index}
                            className={s["Test-AddedItem"]}
                            onMouseEnter={() => openPairItemActionsMenu(index)}
                            onMouseLeave={() => hidePairItemActionsMenu()}
                        >
                            <div>
                                [{item.join(' - ')}]
                                {index !== selectedPairsOfImplicants.length - 1 ? ',' : ' '}
                            </div>
                            <div
                                className={s["ActionsMenu"] + " " + ((index === selectedIndexOfPairItem) ? s["ActionsMenu--Active"] : '')}
                                onClick={() => deletePairOfImplicant(index)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}

export default TestStep3