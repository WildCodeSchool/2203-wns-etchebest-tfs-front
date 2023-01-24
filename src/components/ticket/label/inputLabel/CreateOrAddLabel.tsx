import { useState, ChangeEvent } from "react"
import { gql, useLazyQuery } from "@apollo/client"
import Badge from "../../../common/badge/Badge"
import { Label } from "../../../../types"

export function CreateOrAddLabel() {

	const GET_LABELS = gql`
query getLabels($where: LabelWhereInput) {
  labels(where: $where) {
    id
    name
  }
}
`
const [addedLabelsList, setAddedLabelsList] = useState<string[]>([])

const [getLabels,{data: dataLabels}] = useLazyQuery(GET_LABELS)

async function handleChange(e:ChangeEvent<HTMLInputElement>){
  console.log(e.target.value)
	if(e.target.value.length <= 2) return
	await getLabels({
		variables: {
			where: {
				name: {
					startsWith: e.target.value
				}
			}
		}
	})
}
function handleAddLabel(e:any){
	e.preventDefault()
	setAddedLabelsList(current=>[...current, e.currentTarget.dataset.labelid ])
	console.log(e.target.dataset.labelid)
}

	return (
		<div>
			{dataLabels?.labels && <div className='bg-grey-300 p-4 w-full rounded mb-4'>
				<ul className='flex gap-4'>
					{dataLabels?.labels.map((label: Label) => (
						<li data-labelid={label.id} onClick={(e)=>handleAddLabel(e)} className='inline-block rounded-sm bg-secondary px-2 py-1 text-white '>
							{label.name}
						</li>
					))}
				</ul>
			</div>}
			<div className='flex border rounded p-0.5'>
				<ul className='flex gap-2 items-center mr-4'>
					<Badge onClose={()=>{}}>Feat</Badge>
					<Badge onClose={()=>{}}>Bug</Badge>
				</ul>
				<input className='w-full p-0 border-none focus:border-none' onChange={e => handleChange(e)} type='text' name='labal' id='label' />
			</div>
		</div>
	)
}
