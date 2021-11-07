import React from 'react'

import { supportEmailMailTo } from '../../config'

const ContactUsButton = ({ title }) => (
  <a role="button" className="btn btn-primary" href={supportEmailMailTo}>
    {title || 'Contact us'}
  </a>
)

export default ContactUsButton
