import s from '../Test.module.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

function TestStep5({ selectedImplicantsOfUserCore, setSelectedImplicantsOfUserCore }) {
    const [implicantOfUserCore, setImplicantOfUserCore] = useState('')
    const [selectedIndexOfImplicantsForUserCore, setSelectedIndexOfImplicantsForUserCore] = useState(-1)

    const openImplicantOfUsrCoreItemActionsMenu = (index) => {
        setSelectedIndexOfImplicantsForUserCore(index)
    }

    const hideImplicantOfUserCoreItemActionsMenu = () => {
        setSelectedIndexOfImplicantsForUserCore(-1)
    }

    const deleteImplicantOfUserCoreItem = (index) => {
        let newArr = selectedImplicantsOfUserCore
        newArr.splice(index, 1)
        setSelectedImplicantsOfUserCore([...newArr])
    }

    const handleUserCore = (value) => {
        if (
            !(value.length > 4) &&
            (
                value[value.length - 1] === '1' ||
                value[value.length - 1] === '0' ||
                value[value.length - 1] === 'x'
            )
        ) {
            setImplicantOfUserCore(value)
        }
    }

    const handleAddImplicantOfCore = (implicantOfUserCore) => {
        if (implicantOfUserCore.length !== 4) {
            return
        }
        let newArr = selectedImplicantsOfUserCore
        newArr.push([implicantOfUserCore])
        setSelectedImplicantsOfUserCore([...newArr])
        setImplicantOfUserCore('')
    }

    return (
        <section className={s["Test-Section"]}>
            <h3>3. Третій крок</h3>
            <p>Введіть ядро в форматі - [[1,0,x,1], [0,1,x,0]]</p>

            <div className={s["Test-AddItemForm"]}>
                <TextField
                    value={implicantOfUserCore}
                    onChange={e => handleUserCore(e.target.value)}
                    className={s["Test-AddItemTextField"]}
                    label="Введіть імпліканту"
                    variant="outlined"
                    size='small'
                    type="text"
                />
                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleAddImplicantOfCore(implicantOfUserCore)}
                    size='small'
                >
                    Додати імпліканту
                </Button>
            </div>

            <div>
                {selectedImplicantsOfUserCore.map((item, index) => (
                    <div key={index}
                        className={s["Test-AddedItem"]}
                        onMouseEnter={() => openImplicantOfUsrCoreItemActionsMenu(index)}
                        onMouseLeave={() => hideImplicantOfUserCoreItemActionsMenu()}
                    >
                        <div>
                            [{item.join(' - ')}]
                            {index !== selectedImplicantsOfUserCore.length - 1 ? ',' : ' '}
                        </div>

                        <div
                            className={s["ActionsMenu"] + " " + ((index === selectedIndexOfImplicantsForUserCore) ? s["ActionsMenu--Active"] : '')}
                            onClick={() => deleteImplicantOfUserCoreItem(index)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TestStep5