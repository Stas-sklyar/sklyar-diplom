import s from '../Test.module.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function TestForm({ studentName, studentGroup, setStudentName, setStudentGroup, startTest }) {

    return (
        <form className={s["Test-Form"]}>
            <TextField
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                className={s["Test-TextField"]}
                label="Введіть ПІБ"
                variant="outlined"
            />
            <TextField
                value={studentGroup}
                onChange={e => setStudentGroup(e.target.value)}
                className={s["Test-TextField"]}
                label="Введіть группу"
                variant="outlined"
            />
            <Button
                className={s["Test-StartBtn"]}
                variant="contained"
                onClick={() => startTest()}
            >
                Почати тест
            </Button>
        </form>
    )
}

export default TestForm