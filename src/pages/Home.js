import React, { useEffect, useState } from 'react'
import "./Home.css"
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import axios from 'axios';

function Home() {


  const [values,setValues]=useState({sign:"",name:"",date:null,email:"",errors:{sign:"",name:"",date:"",email:""}})
  const [horoscope,setHoroscope]=useState([])

  const options=['Yesterday', 'Today', 'Tomorrow'];
  

  const handleChange=(e)=>{
    const {name,value}=e.target
    const errors={...values.errors}
    switch(name){
      case "sign":{
        if(!value){
          errors.sign="Sign is required!"
        }else{
          errors.sign=""
        }
        break
      }
      case "name":{
        if(!value){
          errors.name="Name is required!"
        }else{
          errors.name=""
        }
        break
      }
      case "date":{
        if(value==null){
          errors.date="Date is required!"
        }else{
          errors.date=""
        }     
        break
      }
      case "email":{
        if(!value){
          errors.email="Email is required!"
        }else{
          errors.email=""
        }
        break
      }
    }
    setValues({...values,[name]:value,errors})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const getPost=async ()=>{
      try{
        const res=await axios.get(`http://sandipbgt.com/theastrologer/api/horoscope/${values.sign.toLowerCase()}/${values.date.toLowerCase()}`)
        setHoroscope(res.data)
      }catch{
        alert("Something went wrong")
      }
    }
    getPost()
  }

  const handleOverlay=()=>{
    if(!horoscope.horoscope){
    document.getElementById('overlay').style.display="none"
    }else{      
    document.getElementById('overlay').style.display="block"
    }
  }

  const handleDisplay=()=>{
    document.getElementById('overlay').style.display="none"
    }
    
console.log(horoscope)


  return (
    <>
    <div className='home'>
      <form onSubmit={handleSubmit}>
        <h1 className='home_title'>Horoscope</h1>
        <div className='home_container'>
          <div className='home_subcontainer'>
            <h5 className='home_subtitle'>Sign</h5>
            <InputText name="sign" type="text" value={values.sign} onChange={handleChange} required />
            <span className='home_validation p-error block'>{values.errors.sign}</span>
          </div>
          <div className='home_subcontainer'>
            <h5 className='home_subtitle'>Name</h5>
            <InputText name="name" type="text" value={values.name} onChange={handleChange} required />
            <span className='home_validation p-error block'>{values.errors.name}</span>
          </div>
          <div className="home_subcontainer card">
            <h5 className='home_subtitle'>Horoscope Date</h5>
            <SelectButton name="date" value={values.date} options={options} onChange={handleChange} required />
            <span className='home_validation p-error block'>{values.errors.date}</span>
          </div>
          <div className='home_subcontainer'>
            <h5 className='home_subtitle'>Email</h5>
            <InputText name="email" type="email" value={values.email} onChange={handleChange} required />
            <span className="home_validation p-error block">{values.errors.email}</span>
          </div>
          <div className="home_subcontainer home_button card">
            <Button label="Submit" aria-label="Submit" type='submit' onClick={handleOverlay} />
          </div>
        </div>
      </form>
    </div>
    

    <div className='home_overlay' id='overlay' onClick={handleDisplay}>
        <p>Name: {values.name}</p>
        <p>Sign: {horoscope.sunsign}</p>
        <p>Date: {horoscope.date}</p>
        <p>Description: {horoscope.horoscope}</p>
    </div>
    </>
  )
}

export default Home