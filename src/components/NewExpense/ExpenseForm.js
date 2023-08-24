import { Send } from "@mui/icons-material";
import { Box, Button, Container, TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function ExpenseForm(props) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [inputDate, setInputDate] = useState(new Date());

    const [isValidTitle, setIsValidTitle] = useState(true);
    const [isValidAmount, setIsValidAmount] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    /// continue expenseForm validation

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
        setFormIsValid(event.target.value.trim().length !== 0
            && !isNaN(amount.trim()) && amount.trim().length !== 0
            && (inputDate instanceof Date && !isNaN(inputDate)));
    }

    const amountChangeHandler = (event) => {
        setAmount(event.target.value);
        setFormIsValid(!isNaN(event.target.value.trim()) && event.target.value.trim().length !== 0
            && title.trim().length !== 0
            && (inputDate instanceof Date && !isNaN(inputDate)));
    }

    const titleValidateHandler = () => {
        setIsValidTitle(title.trim().length !== 0);
    }
    const amountValidateHandler = () => {
        setIsValidAmount(!isNaN(amount.trim()) && amount.trim().length !== 0);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        var expenseData = {
            title: title,
            amount: amount,
            date: inputDate
        };
        props.onSaveExpense(expenseData);
        setTitle('');
        setAmount('');
        setIsValidTitle(true);
        setIsValidAmount(true);
        // setDate(new Date());
    }

    return (
        <Container sx={{width: '50%'}}>
            <form onSubmit={submitHandler}>
                <Stack spacing={2} pt={5}>
                    <TextField 
                        id="expense-form-title" 
                        label="Title" 
                        variant="outlined"
                        value={title}
                        onChange={titleChangeHandler}
                        onBlur={titleValidateHandler}
                        error={!isValidTitle}
                        helperText={!isValidTitle ? "please input a valid title" : ""}
                    />
                    <TextField 
                        id="expense-form-amount" 
                        label="Amount"
                        variant="outlined"
                        // type="number"
                        value={amount}
                        onChange={amountChangeHandler}
                        onBlur={amountValidateHandler}
                        error={!isValidAmount}
                        helperText={!isValidAmount ? "please input a valid number" : ""}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            value={inputDate}
                            onChange={(newValue) => setInputDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Stack>

                <Box pt={2} display='flex' justifyContent='center' alignItems='center'>
                    <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!formIsValid}
                        endIcon={<Send />}
                    >Add Expense</Button>
                </Box>
            </form>
        </Container>
        
    );
}

export default ExpenseForm;