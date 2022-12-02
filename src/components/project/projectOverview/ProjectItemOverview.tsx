import type { ReactElement } from 'react'
import styles from './ProjectItemOverview.module.css'

interface ProjectOverviewProps {
  opened: number,
  wip: number,
  review: number,
  done: number,
  subject: string | ReactElement
}

export default function ProjectItemOverview(props: ProjectOverviewProps) {
  const {opened, wip, review, done, subject} = props
	return (
		<section>
			<h2 className={'text-secondary uppercase font-medium mb-2 mt-5'}>Overview</h2>
			<div className={styles.statusWrapper}>
				<div className={styles.status}>
					<h5 className={styles.statusName}>Ouvert</h5>
					<p className={styles.statusNumber}>{opened}</p>
				</div>
				<div className={styles.status}>
					<h5 className={styles.statusName}>En cours</h5>
					<p className={styles.statusNumber}>{wip}</p>
				</div>
				<div className={styles.status}>
					<h5 className={styles.statusName}>En revue</h5>
					<p className={styles.statusNumber}>{review}</p>
				</div>
				<div className={styles.status}>
					<h5 className={styles.statusName}>Fermé</h5>
					<p className={styles.statusNumber}>{done}</p>
				</div>
				<div className={styles.subject}>
					<h5 className={styles.statusName + " mb-2"}>Description</h5>
					<pre className="text-primary font-sans font-medium whitespace-pre-line">{subject}</pre>
				</div>
			</div>
		</section>
	)
}