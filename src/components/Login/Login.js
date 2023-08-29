import { Send } from "@mui/icons-material";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useReducer, useState } from "react";
import * as React from 'react';
import AuthContext from "../store/AuthContext";

const usernameReducer = ( state, action ) => {
    if(action.type === 'USERNAME_INPUT_CHANGE') {
        return { value : action.payload , isValid : action.payload.trim().length !== 0 }
    }
    if(action.type === 'USERNAME_INPUT_BLUR') {
        return { value : state.value , isValid : state.value.trim().length !== 0 }
    }
};

const passwordReducer = ( state, action ) => {
    if(action.type === 'PASSWORD_INPUT_CHANGE') {
        return { value : action.payload , isValid : action.payload.trim().length !== 0 }
    }
    if(action.type === 'PASSWORD_INPUT_BLUR') {
        return { value : state.value , isValid : state.value.trim().length !== 0 }
    }
};


function Login(props) {

    const ctx = React.useContext(AuthContext) ;
    
    const [formIsValid, setFormIsValid] = useState(false);
    
    const [usernameState, usernameDispatcher] = useReducer(usernameReducer, { value : '' , isValid : null }) ;
    const [passwordState, passwordDispatcher] = useReducer(passwordReducer, { value : '' , isValid : null }) ;
    
    const isValidAccount = props.isValidAccount ;

    const usernameChangeHandler = (event) => {
        usernameDispatcher({type: 'USERNAME_INPUT_CHANGE', payload : event.target.value })
        setFormIsValid(event.target.value.trim().length !== 0 && passwordState.value.trim().length !== 0);
    }
    const passwordChangeHandler = (event) => {
        passwordDispatcher({type: 'PASSWORD_INPUT_CHANGE', payload : event.target.value })
        setFormIsValid(event.target.value.trim().length !== 0 && usernameState.value.trim().length !== 0);
    }

    const validateUsernameHandler = () => {
        usernameDispatcher({type: 'USERNAME_INPUT_BLUR'})
    }
    const validatePasswordHandler = () => {
        passwordDispatcher({type: 'PASSWORD_INPUT_BLUR'})
    }

    const submitHandler = (event) => {
        event.preventDefault();
        ctx.login(usernameState.value, passwordState.value)
    }
    return (
        <Container sx={{width: '50%'}}>
            <form onSubmit={submitHandler}>
                <Stack spacing={2} pt={5}>
                    <TextField 
                        id="login-form-username" 
                        label="Username" 
                        variant="outlined"
                        value={usernameState.value}
                        onChange={usernameChangeHandler}
                        onBlur={validateUsernameHandler}
                        error={usernameState.isValid === false }
                        helperText={usernameState.isValid === false ? "please input a valid username" : ""}
                    />
                    <TextField 
                        id="login-form-password" 
                        label="Password" 
                        variant="outlined"
                        value={passwordState.value}
                        type="password"
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                        error={passwordState === false}
                        helperText={passwordState === false ? "please input a valid password" : ""}
                    />
                </Stack>

                {!isValidAccount && <h2>Username or password is invalid! </h2>}
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