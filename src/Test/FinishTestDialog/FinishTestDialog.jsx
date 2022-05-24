import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

function FinishTestDialog({ handleCloseDialog, dialogIsOpen }) {

    return (
        <Dialog
            open={dialogIsOpen}
            onClose={() => handleCloseDialog(false)}
        >
            <DialogTitle>
                {"Закінчити тест"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ви дійсно бажаєте закінчити тест? Після відправки результату у вас буде можливість
                    дізнатися свій балл та подивитись правильне рішення.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseDialog(false)} type="error">Назад</Button>
                <Button onClick={() => handleCloseDialog(true)} type="success">Відправити</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FinishTestDialog