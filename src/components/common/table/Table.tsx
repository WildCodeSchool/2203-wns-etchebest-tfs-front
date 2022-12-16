import React from 'react'
import Link from 'next/link';

import styles from './Table.module.css';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';


interface TableProps {
  headerItems: string[]
  rowItems: any[][] | undefined //A FAIRE ! typer tableau string | number
  actions?: {edit:boolean, delete:boolean, handleClick:Function} | null
  rowLinkPath?: string[]
  noResultContent: string | JSX.Element
}

/**
 * @param headerItems Tableau de string qui contient les titres des colonnes [col1, col2, col3]
 * @param rowItems Tableau de tableau de string qui contient les données à afficher 
 * dans le tableau [[row1col1, row1col2, row1col3], [row2col1, row2col2, row2col3]]
 * @param rowLinkPath Tableau de string qui contient les liens pour chaque ligne du tableau
 * @param noResultContent Contenu à afficher si le tableau est vide
 * @return Retourne un tableau html
 */

export default function Table({headerItems, rowItems, actions, rowLinkPath, noResultContent}:TableProps) {

  //Le nombre de ligne doit correspondre au nombre de chemin (path)
 if(rowLinkPath && (rowItems?.length !== rowLinkPath?.length)) {
  throw new Error("The number of rowItems and rowLinkPath must be the same")
 }

 //Supprime la colonne ACTION si aucune action n'est définie
  function removeActionColumn(){
    if(!actions){
      return headerItems.filter((item)=> item !== "ACTION")
    }
    return headerItems
  }

  console.log(removeActionColumn())
  
 //L'id sert unique
  let rowItemsWithoutId
  if(rowItems){
    rowItemsWithoutId = rowItems.map((row)=>{
      const [_, ...rest] = row
      return rest
    })
  }

  function cellActionRender(i:number){

    if(!rowItems || !actions) return
    const [id] = rowItems[i]

    return (
    <td className={styles.table_content_cell__action} data-testid="table-structure-actions">
      {actions.edit &&
      <button
        className='bg-secondary text-white p-2 rounded-sm hover:bg-primary'
        onClick={(e)=>{
          e.preventDefault();
          e.stopPropagation();
          actions.handleClick(e, "edit", id )
         }
        }
        data-testid="table-structure-action"
      >
        <PencilIcon className='h-4'/>
      </button>
      }
       {
      actions.delete &&
      <button
        className='bg-alert text-white p-2 rounded-sm hover:bg-alert_dark'
        onClick={(e)=> {
          e.preventDefault();
          e.stopPropagation();
          actions.handleClick(e, "delete", id)
         }
        }
        data-testid="table-structure-action"
      >
        <TrashIcon className='h-4'/>
      </button>
      }
    </td>
    )
  }

  return (
    <div data-testid="table-structure" className="overflow-x-auto relative rounded-sm border border-grey-300">
      <table  className={styles.table}>
        <thead className={styles.table_header}>
          <tr>
            {removeActionColumn().map((item, index) => {
              return (
                <th key={index} className={styles.table_header_cell}>
                  {item}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {/* //Retourne chaque lignes du tableau entourées d'un lien */}
          { rowLinkPath ? rowItemsWithoutId?.map((item, i) => {
            return (
              <Link key={i} href={rowLinkPath[i]}>
              <tr data-testid="table-structure-row" key={i} className={styles.table_content_row}>
                {item.map((item, i) => {
                  return (
                    <td key={i} className={styles.table_content_cell}>
                       {item}  
                    </td>
                  )
                })}
                {actions && cellActionRender(i) }
              </tr>
              </Link>
            )
          })
          
          :

          rowItemsWithoutId?.map((item, i) => {    {/* //Retourne chaque lignes du tableau sans lien */}
            return (
              <tr data-testid="table-structure-row" key={i} className={styles.table_content_row}>
                {item.map((item, i) => {
                  return (
                    <td key={i} className={styles.table_content_cell}>
                      {item}
                    </td>
                  )
                })}
                {actions && cellActionRender(i) }
              </tr>
            )
          })
          }
        </tbody>
      </table>
      { !rowItems?.length && <div>{noResultContent}</div>}
    </div>
  )
}