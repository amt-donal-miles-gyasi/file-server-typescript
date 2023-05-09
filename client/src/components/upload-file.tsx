import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
const SERVERURL = process.env.SERVER_URL

const Userpage: React.FC = () => {
  const [file, setfile] = useState<FileList | null>(null);
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  let data = new FormData();
  if (file) {
    data.append("file", file[0]);
  }
  data.append("title", values.title);
  data.append("description", values.description);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const ans = await axios.post(`${SERVERURL}/api/put-files`, data);
      console.log(ans);
      setValues({
        title: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

    return (
        <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data" >
            <div className="form-group">
                <div className="mt-3">
                <input onChange={(e)=> setfile( e.target.files)}
                type="file" className="form-control-file" name="file"/>
                </div>
                <div className="mb-3">
                <label htmlFor='title' className='form-label'>
                    Title
                </label>
                <input  onChange={(e) => onChange(e)}
                 type="text" 
                 className="form-control" 
                 placeholder="title" 
                 name="title" 
                 value = {values.title}/>
                </div>

                <div className='mb-3'>
                <label htmlFor='description' className='form-label'>
                    Description
                </label>
                <input
                    onChange={(e) => onChange(e)}
                    type='text'
                    value={values.description}
                    className='form-control'
                    id='description'
                    name='description'
                    placeholder='description'
                    
                />
                </div>
                
                <button type="submit" value="submit" className="btn btn-default" style={{backgroundColor: "blue", color: "white"}}> submit</button>
            </div>
        </form>
    )
};   
 
export default Userpage;