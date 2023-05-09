import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react"
import { useParams } from "react-router-dom";
const SERVERURL = process.env.SERVER_URL



const EmailPage =()=>{
    // const [message, setMessage] = useState('');
    const [values, setValues] = useState({ 
        from: '',
        to: '', 
        message: ''
    })
    const {id, file} = useParams();

    const onChange = (e: ChangeEvent<HTMLInputElement |HTMLTextAreaElement >) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        
    }

    const onSubmit = async(e: FormEvent)=>{
        e.preventDefault()
        try {
            const res = await axios.post(`${SERVERURL}/api/put-files/${id}`, {
                to: values.to,
                from: values.from,
                message: values.message
            })
            console.log(res)
            setValues({
                from: '',
                to: '', 
                message: ''
            })
             
        } catch (error: any) {
            console.log(error.response)
        }
    }


    return(
        <>
         <h1>send eMail</h1>
         <form className='container mt-3' onSubmit={e=>{onSubmit(e)}}>
                <div className='mb-3'>
                    <h1>send {file} as an Email </h1>
                <label htmlFor='from' className='form-label'>
                    from:
                </label>
                <input
                    onChange={e=>{onChange(e)}}
                    type='text'
                    value={values.from}
                    className='form-control'
                    id='from'
                    name='from'
                    placeholder='enter your email'
                    required
                />
                </div>

                <div className='mb-3'>
                <label htmlFor='to' className='form-label'>
                    To:
                </label>
                <input
                    onChange={e=>{onChange(e)}}
                    type='text'
                    value={values.to}
                    className='form-control'
                    id='to'
                    name='to'
                    placeholder="enter receiver's email"
                    required
                />
                </div>

                <div className='mb-3'>
                <label htmlFor='message' className='form-label'>
                    type message here
                </label>
                <textarea
                    onChange={e=>{onChange(e)}}
                    value={values.message}
                    className='form-control'
                    id='message'
                    name='message'
                    placeholder="add aditional text"
                    required
                    rows={5}
                    cols={5}
                />
                </div>

                

                <button type='submit' className='btn btn-primary'>
                    Send mail
                </button>
                
            </form>
         
        </>
         
         )
        
    

}

export default EmailPage