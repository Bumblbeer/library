import React, {useState} from 'react'
import s from './Form.module.css'
import Button from "../common/Button";

export const Input = ({placeholder = 'Input', value = '', onChange = ()=>{}, ...props}) => {
  return <input className={s.input} placeholder={placeholder} value={value} onChange={onChange} {...props}/>
}

const BookForm = ({onSubmit=()=>{}, initialState}) => {
  const [data, setData] = useState(initialState || {title: '', authors: [], year: '', desc: '', coverURL: ''})
  const [isWaiting, setWaiting] = useState(false)

  const disabled = () => data.title === '' || data.authors.length === 0 || data.year === '' || data.authors == ''

  const setField = (fieldName, value) => {
    setData(prevState => ({...prevState, [fieldName]: value}))
  }
  const submit = async () => {
    setWaiting(true)
    await onSubmit(data)
    setWaiting(false)
  }

  return <div className={s.wrapper}>
      <div className={s.formTitle}>{initialState ? "Edit book: "+initialState.title : "Add a new book"}</div>
      <Input onChange={(e)=>setField('title', e.target.value)} value={data.title} placeholder={'Title'} autoFocus={true}/>
      <Input onChange={(e)=>setField('authors', e.target.value.split(',').map(i=>i.trim(' ')))} value={data.authors.join(', ')} placeholder={'Authors (comma-separated)'}/>
      <Input onChange={(e)=>setField('year', e.target.value)} value={data.year} placeholder={'Year of publication'}/>
      <Input onChange={(e)=>setField('desc', e.target.value)} value={data.desc} placeholder={'Description'}/>
      <Input onChange={(e)=>setField('coverURL', e.target.value)} value={data.coverURL} placeholder={'Cover image URL'}/>
      <div className={s.buttonArea}><Button title={isWaiting ? 'Wait' :'Save'} onClick={submit} disabled={disabled() || isWaiting}/></div>
  </div>
}

export default BookForm