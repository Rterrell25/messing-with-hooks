import { useState } from "react"

const INITIAL_STATE = {
  email: "",
  number: "",
  password: "",
  confirmPassword: "",
}

const UseForm = (ValidateLogin) => {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({})

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrors(ValidateLogin(formData))
  }
  return {
    handleChange,
    handleSubmit,
    formData,
    errors,
  }
}

export default UseForm
