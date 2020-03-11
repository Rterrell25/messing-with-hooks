import { useState } from "react"

const INITIAL_STATE = {
  email: "",
  password: ""
}

const UseForm = ValidateLogin => {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState(INITIAL_STATE)
  const [user, setUser] = useState(null)

  const handleChange = field => e => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    setUser(formData)
    setErrors(ValidateLogin(formData))
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
