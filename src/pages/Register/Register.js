import React from "react"
import ValidateSignup from "../Register/ValidateSignup"
import UseSignupForm from "../Register/UseSignupForm"

// Material UI
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

const Register = props => {
  const { handleChange, handleSubmit, formData, user, errors } = UseSignupForm(
    ValidateSignup,
    props
  )

  const isInvalid =
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword ||
    !formData.number

  const useStyles = makeStyles(theme => ({
    form: {
      textAlign: "center",
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      position: "relative"
    },

    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative"
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      position: "relative"
    },
    progress: {
      position: "absolute"
    },
    progressTwo: {
      position: "absolute",
      top: "20px"
    },
    progressThree: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "40%"
    }
  }))
  const classes = useStyles()
  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Typography variant='h5' gutterBottom>
            Don't Have an Account? Please Signup
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin='normal'
              variant='outlined'
              label='Email'
              type='text'
              name='email'
              value={formData.email}
              error={errors.email ? true : false}
              helperText={errors.email}
              onChange={handleChange("email")}
            />
            <TextField
              fullWidth
              margin='normal'
              variant='outlined'
              label='Password'
              type='password'
              name='password'
              value={formData.password}
              error={errors.password ? true : false}
              helperText={errors.password}
              onChange={handleChange("password")}
            />
            <TextField
              fullWidth
              margin='normal'
              variant='outlined'
              label='Confirm Password'
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            <TextField
              variant='outlined'
              fullWidth
              margin='normal'
              label='Telephone Number'
              type='number'
              name='number'
              value={formData.number}
              error={errors.number ? true : false}
              helperText={errors.number}
              onChange={handleChange("number")}
            />

            <br />
            <Button
              variant='outlined'
              color='primary'
              type='submit'
              fullWidth
              disabled={isInvalid}
              className={classes.submit}
            >
              Submit
            </Button>
          </form>

          {user &&
            !errors.email &&
            !errors.password &&
            !errors.confirmPassword &&
            !errors.number &&
            JSON.stringify(user, null, 2)}
        </div>
      </Container>
    </div>
  )
}

export default Register
