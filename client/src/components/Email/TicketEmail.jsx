import React from 'react'
import emailjs from '@emailjs/browser';
import { useSelector, useDispatch } from "react-redux";
const TicketEmail = () => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    
  return (
    <div>TicketEmail</div>
  )
}

export default TicketEmail