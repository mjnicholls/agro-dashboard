import React, {useEffect, useState} from 'react';
import {getAPIKeys} from '../../services/api/personalAccountAPI'

const ApiKeys = () => {

  useEffect(() => {
    getAPIKeys()
      .then(res => {console.log(res)})
      .catch(err => {console.log(err)})
  })


  return "Test API keys page"

}

export default ApiKeys;