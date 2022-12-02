import {HTMLProps, useEffect, useRef} from "react"
import { UseFormRegister, UseFormWatch } from "react-hook-form"
//Styles
import styles from "./input/InputGroup.module.css"
//Types
import { ValidatorForm } from "../../../types"

interface TextareaGroupProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string
  name: string
  register: UseFormRegister<any>
  watch: UseFormWatch<any>
  validator?: ValidatorForm<any>
}


export default function TextareaGroup({label, register, watch, name, validator, ...rest}:TextareaGroupProps) {

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { ref, ...restRegsiter } = register(name)
  useAutosizeTextArea(textareaRef.current, watch(name));

  return (
    <>
      {label && <label className={styles.label} htmlFor={name}>{label}</label>}
      <textarea
      ref={(e) => {
        ref(e)
       textareaRef.current = e
      }}
      className={styles.input}
      rows={1}
      {...restRegsiter}
      {...rest}
      ></textarea>
    </>
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
