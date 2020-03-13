import { useState } from "react"

const INITIAL_STATE = {
  email: "",
  password: ""
}

const UseForm = (ValidateLogin, props) => {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({})
  const [user, setUser] = useState(null)

  const handleChange = field => e => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    setUser(formData)
    setErrors(ValidateLogin(formData))

    const tempErrors = ValidateLogin(formData)
    setErrors(tempErrors)

    // Use the formData directly and the tempErrors
    formData &&
      !tempErrors.email &&
      !tempErrors.password &&
      props.history.push("/")
  }
  return {
    handleChange,
    handleSubmit,
    formData,
    user,
    errors
  }
}

export default UseForm
