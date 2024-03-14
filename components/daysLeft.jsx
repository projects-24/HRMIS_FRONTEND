import React from 'react'
import { useState, useEffect } from 'react';

export default function DaysLeft({Year, funcss}) {
    const [newYear, setnewYear] = useState(0)
    useEffect(() => {
     if(Year){
        const getYear = parseInt(new Date().getFullYear())
        const gottenYear = parseInt(Year)
        const leftYear = gottenYear - getYear
        setnewYear(leftYear)
     }
    }, [Year])
    
  return (
    <span className={funcss}>
        {newYear} yr(s) 
    </span>
  )
}
