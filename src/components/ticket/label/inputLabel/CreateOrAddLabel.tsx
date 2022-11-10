import { useState, ChangeEvent, MouseEventHandler } from "react"
//Librairies
import { gql, useLazyQuery } from "@apollo/client"
//Components
import Badge from "../../../common/badge/Badge"
//Types
import { Label } from "../../../../types"
import Button from "../../../Button"

type LabelAdding = Required<Pick<Label, "id" | "name">>

export function CreateOrAddLabel() {

const GET_LABELS = gql`
query getLabels($where: LabelWhereInput) {
  labels(where: $where) {
    id
    name
  }
}
`
//Liste des labels sélectionnés et déjà existant
const [selectExistingLabel, setSelectExistingLabel] = useState<LabelAdding[]>([])
//Liste des labels sélectionnés et qui seront créés après validation du formulaire
const [selectCreateLabel, setSelectCreateLabel] = useState<string[]>([])

const [searchValue, setSearchValue] = useState<string>("")


const [getLabels,{data: dataLabels}] = useLazyQuery(GET_LABELS)

async function handleChange(e:ChangeEvent<HTMLInputElement>){
	setSearchValue(e.target.value)
	await getLabels({
		variables: {
			where: {
				name: {
					startsWith: e.target.value || null
				}
			}
		}
	})
	console.log(dataLabels)
}


function handleAddLabel(label:LabelAdding){
	setSelectExistingLabel(current => [...current, {id:label.id, name:label.name}])
	setSearchValue("")
}

function handleRemoveLabel(label:LabelAdding | string){
	if(typeof label === "string"){
		setSelectCreateLabel(current=> current.filter(l=> label !== l))
	}
	else {
		setSelectExistingLabel(current=> current.filter(l=> label.id !== l.id))
	}
}

	return (
		<div className="relative ">
			
			<div className='flex h-[52px] border rounded p-0.5'>
				<ul className='flex gap-2 items-center mr-4'>
					{
					selectExistingLabel.map(
						(label)=>{
							return <li key={label.id}><Badge onClose={()=>{handleRemoveLabel(label)}}>{label.name}</Badge></li>
						}
						)
					}
					{
					selectCreateLabel.map(
						(label,i)=>{
							return <li key={i}><Badge onClose={()=>{handleRemoveLabel(label)}}>{label}</Badge></li>
						}
						)
					}
				</ul>
				<input placeholder="Chercher un label" value={searchValue} className='w-full p-0 border-none focus:border-none' onChange={e => handleChange(e)} type='text' name='labal' id='label' />
				{searchValue.length >= 2 && <Button onClick={()=>setSelectCreateLabel((current => [...current, searchValue ]))}>Créer un label</Button>}
			</div>
			{dataLabels?.labels && <div className='absolute top-full bg-grey-300 p-4 w-full rounded mt-4'>
				<ul className='flex gap-4'>
					{dataLabels?.labels.map((label: Label) => (
						<li 
							key={label.id}
							data-labelid={label.id}
							data-labelname={label.name}
							onClick={()=>handleAddLabel(label)}
							className='inline-block rounded-sm bg-secondary px-2 py-1 text-white'
						>
							{label.name}
						</li>
					))}
				</ul>
			</div>}
		</div>
	)
}
