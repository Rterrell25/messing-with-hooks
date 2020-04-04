import { useEffect, useState, useCallback } from "react"
import axios from "axios"

const Test = () => {
  const [covid, setCovid] = useState(null)
  const fetchData = useCallback(() => {
    axios.get(`https://covid19.mathdro.id/api/`).then((res) => {
      setCovid(res.data)
      console.log("weiner", res.data)
    })
  }, [setCovid])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { covid }
}

export default Test
