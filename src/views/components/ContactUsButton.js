import React from 'react'

import { supportEmailMailTo } from '../../config'

const ContactUsButton = () => (
  <a role="button" className="btn btn-primary" href={supportEmailMailTo}>
    Contact us
  </a>
)

export default ContactUsButton
