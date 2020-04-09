import { useEffect, useState, useCallback } from "react"
import axios from "axios"

const Data = ({ query, initial }) => {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    fetchCountry()
  }, [fetchCountry])

  return { data, loading }
}

export default Data
