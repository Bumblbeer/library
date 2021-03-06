import React, {useState, useContext} from 'react'
import s from './Form.module.css'
import Button from "../common/Button";
import {Input} from "./BookForm";
import LibraryContext from "../../contexts/LibraryContext";


const UserForm = ({onSubmit=()=>{}, initialState}) => {
  const [data, setData] = useState(initialState || {name: '', transactionList: []})

  const [isWaiting, setWaiting] = useState(false)

  const [existing, setExisting] = useState(false)

  const lib = useContext(LibraryContext)

  const disabled = () => data.name === ''

  const setField = (fieldName, value) => {
    setData(prevState => ({...prevState, [fieldName]: value}))
  }
  const submit = async () => {
    setWaiting(true)
    await onSubmit(data)
    setWaiting(false)
  }

  return <div className={s.wrapper}>
    <div className={s.formTitle}>{initialState ? "Edit user: "+initialState.title : "Add a new user"}</div>
    <Input onChange={(e)=> {
      setExisting(false)
      setField('name', e.target.value)
      if (lib.searchUser(e.target.value) !== undefined) setExisting(true)
    }} value={data.name} placeholder={'Username'} autoFocus={true} style={existing ? {borderColor: 'red'} : {}}/>
    <div className={s.buttonArea}><Button title={isWaiting ? 'Wait' :'Save'} onClick={submit} disabled={disabled() || isWaiting || existing}/></div>
  </div>
}

export default UserForm
