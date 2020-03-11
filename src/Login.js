import React from "react"
import UseForm from "./UseForm"
import ValidateLogin from "./ValidateLogin"

const Login = () => {
  const { handleChange, handleSubmit, formData, user, errors } = UseForm(
    ValidateLogin
  )

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Log In</h2>
      <form
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          name='email'
          value={formData.email}
          placeholder='email'
          onChange={handleChange("email")}
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type='password'
          value={formData.password}
          name='password'
          placeholder='password'
          onChange={handleChange("password")}
        />
        {errors.password && <p>{errors.password}</p>}
        <button type='submit'>Submit</button>
      </form>

      {user &&
        !errors.email &&
        !errors.password &&
        JSON.stringify(user, null, 2)}
    </div>
  )
}

export default Login
