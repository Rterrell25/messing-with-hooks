import React from "react"

const Select = ({ filteredCountries, handleChange }) => {
  return (
    <select className='github-filter' onChange={handleChange}>
      <option>All Countries</option>
      {filteredCountries}
    </select>
  )
}

export default Select
