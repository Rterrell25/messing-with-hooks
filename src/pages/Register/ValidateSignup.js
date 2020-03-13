export default function ValidateLogin(formData) {
  let errors = {}

  if (!formData.email) {
    errors.email = "Email address is required"
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email address is invalid"
  }
  if (!formData.password) {
    errors.password = "Password is required"
  } else if (formData.password.length < 6) {
    errors.password = "Password must be longer than 10 characters"
  }
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required"
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords must match"
  }

  const telRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

  if (!formData.number) {
    errors.number = "Telephone is required"
  } else if (!telRegex.test(formData.number)) {
    errors.number = "Telephone is invalid"
  }
  return errors
}
