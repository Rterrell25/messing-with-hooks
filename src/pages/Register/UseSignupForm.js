import { useState } from "react"

const INITIAL_STATE = {
  email: "",
  number: "",
  password: "",
  confirmPassword: ""
}

const UseForm = (ValidateLogin, props) => {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({})
  const [user, setUser] = useState(null)

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    setUser(formData)
    setErrors(ValidateLogin(formData))

    const tempErrors = ValidateLogin(formData)
    setErrors(tempErrors)

    formData &&
      !tempErrors.email &&
      !tempErrors.password &&
      !tempErrors.confirmPassword &&
      !tempErrors.number &&
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
