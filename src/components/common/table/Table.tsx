import React from 'react'
import Link from 'next/link';

import styles from './Table.module.css';


interface TableProps {
  headerItems: string[]
  rowItems: any[][] | undefined //A FAIRE ! typer tableau string | number
  rowLinkPath?: string[]
}

/**
 * @param headerItems Tableau de string qui contient les titres des colonnes [col1, col2, col3]
 * @param rowItems Tableau de tableau de string qui contient les données à afficher 
 * dans le tableau [[row1col1, row1col2, row1col3], [row2col1, row2col2, row2col3]]
 * @param rowLinkPath Tableau de string qui contient les liens pour chaque ligne du tableau
 * @return Retourne un tableau html
 */

export default function Table({headerItems, rowItems, rowLinkPath}:TableProps) {

  //Le nombre de ligne doit correspondre au nombre de chemin (path)
 if(rowLinkPath && rowItems?.length !== rowLinkPath?.length) {
  throw new Error("The number of rowItems and rowLinkPath must be the same")
 }

  return (
    <div className="overflow-x-auto relative  rounded-sm border border-grey-300">
      <table className={styles.table}>
        <thead className={styles.table_header}>
          <tr>
            {headerItems.map((item, index) => {
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
          { rowLinkPath ? rowItems?.map((item, i) => {
            return (
              <Link key={i} href={rowLinkPath[i]}>
              <tr key={i} className={styles.table_content_row}>
                {item.map((item, i) => {
                  return (
                    <td key={i} className={styles.table_content_cell}>
                       {item}  
                    </td>
                  )
                })}
              </tr>
              </Link>
            )
          })
          
          :

          rowItems?.map((item, i) => {    {/* //Retourne chaque lignes du tableau sans lien */}
            return (
              <tr key={i} className={styles.table_content_row}>
                {item.map((item, i) => {
                  return (
                    <td key={i} className={styles.table_content_cell}>
                      {item}
                    </td>
                  )
                })}
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  )
}






