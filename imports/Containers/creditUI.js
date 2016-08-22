import React from 'react'
export default CreditUI= (props)=>{
  let content=props.subscribed? props.creditData && props.creditData.point || 0 : 'Loading'

  return <span>{content}</span>
}