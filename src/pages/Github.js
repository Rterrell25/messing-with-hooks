import React, { useState } from "react"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import TextField from "@material-ui/core/TextField"
import moment from "moment"

// context
import { useGithub } from "../contexts/GithubContext"

const INITIAL_STATE = {
  language: "All",
  search: "",
}

const Github = () => {
  const { data } = useGithub()
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [updated, setUpdated] = useState(false)
  const [created, setCreated] = useState(false)

  const handleUpdated = () => {
    setUpdated(!updated)
    data &&
      data.sort((a, b) => {
        if (updated) return a.updated_at > b.updated_at ? -1 : 1
        return a.updated_at > b.updated_at ? 1 : -1
      })
  }

  const handleCreated = () => {
    setCreated(!created)
    data &&
      data.sort((a, b) => {
        if (created) return a.created_at > b.created_at ? -1 : 1
        return a.created_at > b.created_at ? 1 : -1
      })
  }

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  return (
    <div>
      <TextField
        id='search'
        name='search'
        label='Search by Title'
        placeholder='Search by Title'
        onChange={handleInputChange("search")}
        value={formData.search}
      />
      <button className='github-filter' onClick={handleUpdated}>
        Updated {updated ? "(oldest)" : "(newest)"}
      </button>
      <button className='github-filter' onClick={handleCreated}>
        Created {created ? "(oldest)" : "(newest)"}
      </button>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>Language</FormLabel>
        <RadioGroup
          defaultValue='All'
          aria-label='language'
          name='customized-radios'
          value={formData.language}
          onChange={handleInputChange("language")}
        >
          <FormControlLabel value='All' control={<Radio />} label='All' />
          <FormControlLabel
            value='JavaScript'
            control={<Radio />}
            label='JavaScript'
          />
          <FormControlLabel value='Ruby' control={<Radio />} label='Ruby' />
        </RadioGroup>
      </FormControl>
      {!data ? (
        <h1>Loading...</h1>
      ) : (
        data
          .filter((data) => {
            if (formData.language === "All") return true
            return data.language === formData.language
          })
          .filter((data) => {
            if (formData.search === "") return true
            return (data.name + data.language)
              .toLowerCase()
              .includes(formData.search.toLowerCase())
          })
          .map((user) => (
            <div key={user.id}>
              <div>{user.name}</div>
              <div>{user.language}</div>
              <div>
                Updated: {moment(user.updated_at).startOf("day").fromNow()}
              </div>
              <div>
                Created:
                {moment(user.created_at).startOf("day").fromNow()}
              </div>
            </div>
          ))
      )}
    </div>
  )
}

export default Github
