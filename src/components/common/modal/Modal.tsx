import React, { useEffect, useState, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps extends PropsWithChildren {
  children?: React.ReactNode | undefined
  close:Function
}


// https://stackoverflow.com/questions/71650035/nextjs-typescript-modal

export default function Modal ({ children, close }: ModalProps) {
  const [_document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    setDocument(document);
  }, []);

  function closeFromBackground(e: React.SyntheticEvent<HTMLDivElement>){

    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }
    else if(e.target.dataset.background){
        close()
    }  
  }

  if (_document) {
    return createPortal(
      <div data-background onClick={(e)=>closeFromBackground(e)} className="flex w-screen h-screen backdrop-blur-sm">
        <div className=" m-auto p-12 bg-white border border-grey-400 rounded-sm xl:w-1/2 md:w-3/4 sm:w-full" >
          {children}
        </div>
      </div>,
      _document.getElementById("modal")! //notice `!` at the end of line
    );
  } else {
    return null;
  }
};
