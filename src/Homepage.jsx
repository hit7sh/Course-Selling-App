import { Card, Typography } from '@mui/material'
import React from 'react'

const Homepage = () => {
  return (
    <Card variant="outlined" style={{width:700, padding:20, marginTop:80, marginLeft:300}}>
        <Typography variant='h6'>
          Welcome to Courses Website!
          Here you can create your account or log in if you already
          have an account.
          <br />
          If you are a user. You can:
          <li>Explore various courses that interests you.</li>
          <li>Buy a course through your account.</li>
          <br />
          If you are an admin. You can:
          <li>Explore various courses that interests you.</li>
          <li>Create a new course.</li>
          <li>Delete a course.</li>
          <li>Update an existing course.</li>
        </Typography>
    </Card>
  )
}

export default Homepage