import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import Select from "../components/Select"
import moment from "moment"

const Test = () => {
  const [covid, setCovid] = useState(null)
  const [query, setQuery] = useState("")
  const [country, setCountry] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(() => {
    axios.get(`https://covid19.mathdro.id/api/`).then(res => {
      setCovid(res.data)
    })
  }, [setCovid])

  const fetchSingleCountry = useCallback(() => {
    axios.get(`https://covid19.mathdro.id/api/countries`).then(res => {
      setCountry(res.data)
    })
  }, [setCountry])

  const fetchCountry = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://covid19.mathdro.id/api/countries/${query}`
      )
      setData(response.data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }, [setData, query])

  const countries = []
  country !== null &&
    country.countries.forEach(item => {
      countries.push(item.name)
    })
  const filteredCountries = countries.map((country, i) => {
    return (
      <option key={i} value={country}>
        {country}
      </option>
    )
  })

  const handleChange = event => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    fetchCountry()
  }, [fetchCountry])

  useEffect(() => {
    fetchData()
    fetchSingleCountry()
  }, [fetchData, fetchSingleCountry])

  return (
    <div>
      <h1>Global Covid Stats</h1>
      {covid && (
        <div>
          <div>Confirmed Cases:{covid.confirmed.value}</div>
          <div>Patients Recovered:{covid.recovered.value}</div>
          <div>Death Count:{covid.deaths.value}</div>
          <div>
            Last Updated:{" "}
            {moment(covid.lastUpdate)
              .startOf("day")
              .fromNow()}
          </div>
        </div>
      )}
      <br />
      <Select
        filteredCountries={filteredCountries}
        handleChange={handleChange}
      />
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          data &&
          data.confirmed && (
            <div>
              <h1>{query} Covid Stats</h1>
              <div>Confirmed Cases:{data.confirmed.value}</div>
              <div>Confirmed Cases:{data.recovered.value}</div>
              <div>Death Count:{data.deaths.value}</div>
              <div>
                Last Updated:{" "}
                {moment(data.lastUpdate)
                  .startOf("day")
                  .fromNow()}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Test
