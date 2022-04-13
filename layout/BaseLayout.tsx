const BaseLayout = ({ children }: any) => {
	return (
		<>
			<header className={'fixed w-screen bg-white px-16 py-4 shadow-md'}>
				Header
			</header>
			<main className={'w-screen p-8 pt-20'}>{children}</main>
			<footer
				className={
					'flex w-screen justify-center bg-slate-800 py-2 text-gray-300'
				}
			>
				Footer
			</footer>
		</>
	)
}

export default BaseLayout
