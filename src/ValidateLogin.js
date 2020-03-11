export default function ValidateLogin(formData) {
  let errors = {}

  if (!formData.email) {
    errors.email = "Email address is required"
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email address is invalid"
  }
  if (!formData.password) {
    errors.password = "Password is required"
  } else if (formData.password.length < 10) {
    errors.password = "Password must be longer than 10 characters"
  }

  return errors
}
