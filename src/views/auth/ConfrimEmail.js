import React from 'react'

import { Button, Container } from 'reactstrap'

const ConfirmEmail = () => {
  const confirmEmail = () => {
    console.log('here email confirmation will go')
  }

  return (
    <>
      <div className="content">
        <Container>
          <p>Here confirmation email page will go</p>
          <Button onClick={confirmEmail} color="primary">
            Confirm email
          </Button>
        </Container>
      </div>
    </>
  )
}

export default ConfirmEmail
