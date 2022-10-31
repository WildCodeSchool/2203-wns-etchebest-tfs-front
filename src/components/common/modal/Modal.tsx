import { useRef, useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: ReactNode,
}


export default function Modal ({ children }: ModalProps) {
  const [_document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    setDocument(document);
  }, []);

  if (_document) {
    return createPortal(
      <div className="flex w-screen h-screen backdrop-blur-sm">
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
