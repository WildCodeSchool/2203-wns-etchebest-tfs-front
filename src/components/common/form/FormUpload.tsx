import XCircleIcon from "@heroicons/react/outline/XCircleIcon";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Button";
import Input from "./Input";

type FormData = {
  file: FileList;
};

export function FormUpload() {
	
	const { register, handleSubmit } = useForm<FormData>();
	
	const [files, setFiles] = useState<FileList | null>(null)
	const [file, setFile] = useState<string | null>(null)
	const [error, setError] = useState<{message: string, size: number | null}>({message: "", size:null})

	function onSubmit() {
		console.log()
		if(files){
			const file = files[0] 
			console.log(file)
			if(file.size/1024/1024 > 1){
				setError({ message: "Le fichier est trop volumineux", size: Math.round(file.size/1024/1024 * 100)/100 })
			}
			else if(file && !error.message){
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = () => {
					setFile(reader.result as string)
				}
			}
		}
	}
	return (
				<div className='flex justify-evenly'>
					<form onSubmit={ handleSubmit(onSubmit) } >
						<div className="mb-2 flex">
							<Input 
								{...register("file")}
								onChange={e => setFiles(e.currentTarget.files)}
								label='Picture' 
								name="file"
								id="file"
								type="file"
								accept=".jpg, .png, .gif, .jpeg"
							/>
						</div>
				{/* 		{error && <p>{error.message}</p>}
						{error?.size && <p>{error.size}mo</p>} */}
						<Button type='submit'>Submit</Button>
					</form>
          <div className="test"></div>
          {file &&
            <div className='border-2 rounded-md	 p-8 relative' >
              <button className='absolute top-2 right-2' onClick={
                  () => {
                    setFile(null)
                  }
                }>
                <XCircleIcon className='filter invert-1 h-6'/>
              </button> 
              <img width="300px" src={file} alt="Red dot" /> 
            </div>
          }
		</div>
	)
}




