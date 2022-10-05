import type { ReactElement } from 'react'

interface Properties {
  opened: number,
  wip: number,
  review: number,
  done: number,
  cta: ReactElement
  
}

export default function ProjectItemOverview(props: Properties) {
  const {opened, wip, review, done, cta} = props
	return (
		<>
			<h2 className={'text-secondary uppercase font-medium mb-2 mt-5'}>Overview</h2>
			<div className={'bg-white border border-grey-300 w-full flex flex-col md:grid grid-cols-6 py-8'}>
				<div className="border-b md:border-b-0 py-2 md:py-0 md:border-r border-gray border-grey-300 flex flex-col items-center justify-center">
					<p className={'text-grey-300 text-xs font-medium uppercase'}>Open</p>
					<p className={'text-5xl text-primary font-bold'}>{opened}</p>
				</div>
				<div className="border-b md:border-b-0 py-2 md:py-0 md:border-r border-gray border-grey-300 flex flex-col items-center justify-center">
					<p className={'text-grey-300 text-xs font-medium uppercase'}>Wip</p>
					<p className={'text-5xl text-primary font-bold'}>{wip}</p>
				</div>
				<div className="border-b md:border-b-0 py-2 md:py-0 md:border-r border-gray border-grey-300 flex flex-col items-center justify-center">
					<p className={'text-grey-300 text-xs font-medium uppercase'}>Review</p>
					<p className={'text-5xl text-primary font-bold'}>{review}</p>
				</div>
				<div className="border-b md:border-b-0 py-2 md:py-0 md:border-r border-gray border-grey-300 flex flex-col items-center justify-center">
					<p className={'text-grey-300 text-xs font-medium uppercase'}>Done</p>
					<p className={'text-5xl text-primary font-bold'}>{done}</p>
				</div>
				<div className="h-full pt-8 md:pt-0 flex flex-cols items-center col-span-2 justify-center">
					{cta}
				</div>
			</div>
		</>
	)
}