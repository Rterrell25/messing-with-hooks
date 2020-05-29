import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"

const Country = () => {
  const [country, setCountry] = useState(null)
  const [query, setQuery] = useState("")

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const countries = []
  country !== null &&
    country.countries.forEach((item) => {
      countries.push(item.name)
    })
  const filteredCountries = countries.map((country, i) => {
    return (
      <option key={i} value={country}>
        {country}
      </option>
    )
  })

  const fetchSingleCountry = useCallback(() => {
    axios.get(`https://covid19.mathdro.id/api/countries`).then((res) => {
      console.log("i'm fetch single country", res.data)
      setCountry(res.data)
    })
  }, [setCountry])

  useEffect(() => {
    fetchSingleCountry()
  }, [fetchSingleCountry])

  return { filteredCountries, handleChange, query }
}

export default Country
