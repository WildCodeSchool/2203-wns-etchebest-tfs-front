import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <div id="modal" className='fixed z-10'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}