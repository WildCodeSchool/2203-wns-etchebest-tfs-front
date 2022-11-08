import type { ReactElement } from 'react'
import styles from './ProjectItemOverview.module.css'

interface ProjectOverviewProps {
  opened: number,
  wip: number,
  review: number,
  done: number,
  cta: ReactElement
  
}

export default function ProjectItemOverview(props: ProjectOverviewProps) {
  const {opened, wip, review, done, cta} = props
	return (
		<section>
			<h2 className={'text-secondary uppercase font-medium mb-2 mt-5'}>Overview</h2>
			<div className={styles.statusWrapper}>
				<div className={styles.status}>
					<p className={styles.statusName}>Ouvert</p>
					<p className={styles.statusNumber}>{opened}</p>
				</div>
				<div className={styles.status}>
					<p className={styles.statusName}>En cours</p>
					<p className={styles.statusNumber}>{wip}</p>
				</div>
				<div className={styles.status}>
					<p className={styles.statusName}>En revue</p>
					<p className={styles.statusNumber}>{review}</p>
				</div>
				<div className={styles.status}>
					<p className={styles.statusName}>Fermé</p>
					<p className={styles.statusNumber}>{done}</p>
				</div>
				<div className="h-full pt-8 md:pt-0 flex flex-cols items-center col-span-2 justify-center">
					{cta}
				</div>
			</div>
		</section>
	)
}