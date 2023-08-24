import { Send } from "@mui/icons-material";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";

const usernameReducer = ( state, action ) => {
    if(action.type === 'USENAME_INPUT_CHANGE') {
        return { value : action.payload , isValid : action.payload.trim().length !== 0 }
    }
    if(action.type === 'USENAME_INPUT_BLUR') {
        return { value : state.value , isValid : state.value.trim().length !== 0 }
    }
};

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    // useEffect(() => {
    //     console.log("1111");
    //     setFormIsValid(username.trim().length !== 0 && password.trim().length !== 0);
    //     return (() => {
    //         console.log("clean up");
    //     })
    // },[username,password])

    const [usernameState, usernameDispatcher] = useReducer(usernameReducer, { value : true , isValid : null }) ;


    const usernameChangeHandler = (event) => {
        // setUsername(event.target.value);
        usernameDispatcher({type: 'USENAME_INPUT_CHANGE', payload : event.target.value })
        setFormIsValid(event.target.value.trim().length !== 0 && password.trim().length !== 0);
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
        // setFormIsValid(event.target.value.trim().length !== 0 && username.trim().length !== 0);
    }

    const validateUsernameHandler = () => {
        setIsValidUsername(username.trim().length !== 0);
    }
    const validatePasswordHandler = () => {
        setIsValidPassword(password.trim().length !== 0);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(username, password);

        setUsername('');
        setPassword('');
        setIsValidUsername(true);
        setIsValidPassword(true);
    }
    return (
        <Container sx={{width: '50%'}}>
            <form onSubmit={submitHandler}>
                <Stack spacing={2} pt={5}>
                    <TextField 
                        id="login-form-username" 
                        label="Username" 
                        variant="outlined"
                        value={username}
                        onChange={usernameChangeHandler}
                        onBlur={validateUsernameHandler}
                        error={!isValidUsername}
                        helperText={!isValidUsername ? "please input a valid username" : ""}
                    />
                    <TextField 
                        id="login-form-password" 
                        label="Password" 
                        variant="outlined"
                        value={password}
                        type="password"
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                        error={!isValidPassword}
                        helperText={!isValidPassword ? "please input a valid password" : ""}
                    />
                </Stack>
                <Box pt={2} display='flex' justifyContent='center' alignItems='center'>
                    <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!formIsValid}
                        endIcon={<Send />}
                    >Login</Button>
                </Box>
            </form>
        </Container>
    );
}


export default Login;