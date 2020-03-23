import React from "react"
import UseForm from "../Login/UseForm"
import ValidateLogin from "../Login/ValidateLogin"

import { makeStyles } from "@material-ui/core/styles"

// Material UI
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"

const useStyles = makeStyles(theme => ({
  form: {
    textAlign: "center",
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    position: "relative"
  },
  logo: {
    width: 80,
    margin: "20px auto 20px auto"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: "relative"
  },
  progress: {
    position: "absolute"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    width: "100%",
    position: "absolute"
  }
}))

const Login = props => {
  const classes = useStyles()

  const { handleChange, handleSubmit, formData, user, errors } = UseForm(
    ValidateLogin,
    props
  )

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant='h5' gutterBottom>
        Welcome, Please Login
      </Typography>
      <Container component='main' maxWidth='xs'>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            fullWidth
            margin='normal'
            label='Email'
            type='text'
            name='email'
            value={formData.email}
            error={errors.email ? true : false}
            helperText={errors.email}
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='Password'
            type='password'
            name='password'
            value={formData.password}
            error={errors.password ? true : false}
            helperText={errors.password}
            onChange={handleChange}
          />
          <br />
          <Button
            variant='outlined'
            color='primary'
            type='submit'
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Container>
      <br />
      {user &&
        !errors.email &&
        !errors.password &&
        JSON.stringify(user, null, 2)}
    </div>
  )
}

export default Login
