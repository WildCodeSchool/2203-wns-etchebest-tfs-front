import {HTMLProps, useEffect, useRef} from "react"
import { FieldError, UseFormRegister, UseFormWatch } from "react-hook-form"
//Styles
import styles from "./input/InputGroup.module.css"
//Types
import { ValidatorForm } from "../../../types"
import { ErrorInput } from "./input/ErrorInput"
import { ExclamationCircleIcon } from "@heroicons/react/outline"

interface TextareaGroupProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string
  name: string,
  helper?: string
  register: UseFormRegister<any>
  watch: UseFormWatch<any>
  validator?: ValidatorForm<any>
  errors: Record<string, FieldError>
}


export default function TextareaGroup({label, helper, register, watch, errors, name, validator, ...rest}:TextareaGroupProps) {

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { ref, ...restRegsiter } = register(name, validator ? validator[name] : undefined)
  useAutosizeTextArea(textareaRef.current, watch(name));

  return (
    <div>
      {label && <label className={styles.label} htmlFor={name}>{label}</label>}
      <div className="relative">
        <textarea
        ref={(e) => {
          ref(e)
         textareaRef.current = e
        }}
        className={styles.input}
        rows={1}
        {...restRegsiter}
        {...rest}
        >
        </textarea>
        {errors && errors[name] && <ExclamationCircleIcon className='absolute h-4 top-4 right-3 transform -translate-y-1/2 stroke-alert_dark '/>}
      </div>
      {helper && <span className='text-xs text-grey-500'>{helper}</span>}
      {errors? errors[name] &&<ErrorInput errors={errors} field={name}/> : null}
    </div>
  )
}

// https://codesandbox.io/s/autosize-textarea-owwtu?from-embed=&file=/src/App.tsx:259-307
const useAutosizeTextArea = (textAreaRef: HTMLTextAreaElement | null,value: string) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};
