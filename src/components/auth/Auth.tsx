import React, { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'


interface IAuthProps {
	children: ReactElement | string,
  className?: string
  title: string,
  subtitle: string,
  authType: 'login' | 'register'
}
//Wrapper pour les formulaires de login et register
export function Auth({children, title, subtitle, authType}:IAuthProps) {
  return (

    <div className='min-w-[400px] max-w-[900px] rounded-sm bg-white px-16 pt-10 pb-12 text-primary'>
      
      <header className='flex flex-col mb-12 items-center'>
        <div className="mb-10">
          <Image
            src="/logo.svg"
            alt="Structure logo"
            width="87"
            height="39"
            className='mx-auto mb-10 bg-secondary text-xs'
          />
        </div>
       {/* Change la ponctuation en fin de phrase (. ou !) dans le pseudo élément after */}
       { authType === 'register' ?
         <h1 className='text-center mb-1 text-4xl font-bold after:content-["."] after:text-secondary'>
         {title}
       </h1>
       :
       <h1 className='text-center mb-1 text-4xl font-bold after:content-["!"] after:ml-1 after:text-secondary'>
         {title}
       </h1>
       }
       {/* ----------------------------------- */}
        <p className='text-center text-xs uppercase text-gray-300'>{subtitle}</p>
      </header>
      { children }
      <span className='flex justify-center text-[0.75rem] mt-2 text-grey-400 mx-auto w-full hover:text-de'>
        { authType === "register" ?
         <Link className="mx-auto hover:text-primary" href='/login'>Déjà un compte ? Se connecter</Link>
         :
         <Link className="mx-auto hover:text-primary" href='/register'>Pas encore de compte ? S'inscrire</Link>
         }
        </span>
    </div>
  )
}
