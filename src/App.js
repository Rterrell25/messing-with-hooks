import React, { useState, useEffect } from "react"

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
}

const App = () => {
  const [count, setCount] = useState(0)
  const [isOn, setIsOn] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  const [status, setStatus] = useState(navigator.onLine)
  const [{ latitude, longitude, speed }, setLocation] = useState(
    initialLocationState
  )

  useEffect(() => {
    document.title = `You have clicked ${count} times`
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("onine", handleOnline)
    window.addEventListener("offline", handleOffline)
    navigator.geolocation.getCurrentPosition(handleGeoLocation)
    const watchId = navigator.geolocation.watchPosition(handleGeoLocation)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("onine", handleOnline)
      window.removeEventListener("offline", handleOffline)
      navigator.geolocation.clearWatch(watchId)
    }
  }, [count])

  const handleOnline = () => {
    setStatus(true)
  }

  const handleOffline = () => {
    setStatus(false)
  }

  const handleMouseMove = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    })
  }

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1)
  }

  const toggleLight = () => {
    setIsOn(previsOn => !previsOn)
  }

  const handleGeoLocation = event => {
    setLocation({
      latitude: event.coords.latitude,
      longitude: event.coords.longitude,
      speed: event.coords.speed
    })
  }

  return (
    <>
      <h2>Counter</h2>
      <button onClick={incrementCount}>I was clicked {count} times</button>
      <h2>Toggle Light</h2>
      <img
        src={
          isOn
            ? "https://icon.now.sh/highlight/fd0"
            : "https://icon.now.sh/highlight/aaa"
        }
        style={{
          height: "50px",
          width: "50px"
        }}
        onClick={toggleLight}
        alt='Lightbulb'
      ></img>
      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      <br />
      <h2>Network Status</h2>
      <p>
        you are <strong>{status ? "online" : "offline"}</strong>
      </p>
      <h2>GeoLocation</h2>
      <p>Latitude is {latitude}</p>
      <p>longitude is {longitude}</p>
      <p>Your speed is {speed ? speed : "0"}</p>
    </>
  )
}

export default App
