import React from "react"
import moment from "moment"

// Components
import Select from "../components/Select"

// Custom Hooks
import Testies from "../components/Testies"
import Country from "../components/Country.js"
import Data from "../components/Data"

const Test = () => {
  const { filteredCountries, handleChange, query } = Country()
  const { data, loading } = Data({
    query: query,
    initial: null,
  })

  const { covid } = Testies(null)

  return (
    <div>
      <h1>Global Covid Stats</h1>
      {covid && (
        <div>
          <div>Confirmed Cases:{covid.confirmed.value}</div>
          <div>Patients Recovered:{covid.recovered.value}</div>
          <div>Death Count:{covid.deaths.value}</div>
          <div>
            Last Updated: {moment(covid.lastUpdate).startOf("day").fromNow()}
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
                Last Updated: {moment(data.lastUpdate).startOf("day").fromNow()}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Test
