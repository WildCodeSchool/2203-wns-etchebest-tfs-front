import React from 'react'
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import styles from './Table.module.css';


interface TableProps {
  headerItems: string[]
  rowItems: any[][] | undefined //TODO ! type array string | number
  actions?: {edit:boolean, delete:boolean, handleClick:Function} | null
  rowLinkPath?: string[]
  noResultContent: string | JSX.Element
}

/**
 * @param headerItems Array of strings - columns titles [col1, col2, col3]
 * @param rowItems Array of array of strings - datas to display in table: [[row1col1, row1col2, row1col3], [row2col1, row2col2, row2col3]]
 * @param rowLinkPath Array of strings - contains link for each row of the table
 * @param noResultContent Contntent to display if no result
 * @return Returns html table
*/

export default function Table({headerItems, rowItems, actions, rowLinkPath, noResultContent}:TableProps) {

 if(rowLinkPath && (rowItems?.length !== rowLinkPath?.length)) {
  throw new Error("The number of rowItems and rowLinkPath must be the same")
 }

 //if no action defined, remove "ACTION" column
  function removeActionColumn(){
    if(!actions){
      return headerItems.filter((item)=> item !== "ACTION")
    }
    return headerItems
  }

  console.log(removeActionColumn())
  
  //remove id from rowItems
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
          {/* Transforms each row of the table into a link */}
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

          rowItemsWithoutId?.map((item, i) => {    {/* Rows are not links */}
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