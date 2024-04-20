import React from 'react'

function Assignment({title, desc,  time, date}) {
  return (
    <div className='assignment'>
        <h3 className='title'>{title}</h3>
        <p className='description'>{desc}</p>
        <div className='assignment-details'>
            <p className='time'>{time}</p>
            <p className='date'>{date}</p>
        </div>
    </div>
  )
}

export default Assignment