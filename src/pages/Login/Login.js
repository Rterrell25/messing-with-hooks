import React from "react"
import UseForm from "../Login/UseForm"
import ValidateLogin from "../Login/ValidateLogin"

// Material UI
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const Login = () => {
  const { handleChange, handleSubmit, formData, user, errors } = UseForm(
    ValidateLogin
  )

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant='h5' gutterBottom>
        Welcome, Please Login
      </Typography>
      <form
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label='Email'
          type='text'
          name='email'
          value={formData.email}
          error={errors.email ? true : false}
          helperText={errors.email}
          onChange={handleChange("email")}
          style={{ width: "30%" }}
        />
        <TextField
          label='Password'
          type='password'
          name='password'
          value={formData.password}
          error={errors.password ? true : false}
          helperText={errors.password}
          onChange={handleChange("password")}
          style={{ width: "30%" }}
        />
        <br />
        <Button variant='outlined' color='primary' type='submit'>
          Submit
        </Button>
      </form>
      <br />
      {user &&
        !errors.email &&
        !errors.password &&
        JSON.stringify(user, null, 2)}
    </div>
  )
}

export default Login
