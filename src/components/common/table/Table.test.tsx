import { render, screen } from '@testing-library/react'
import Table from './Table'

describe('Table', () => {
	it('should be render in the document', () => {
		render(
			<Table
				headerItems={['Col1,Col2,Col3']}
				rowItems={[
					['id1','Col1-Row1', 'Col2-Row1', 'Col3-Row1'],
					['id2','Col1-Row2', 'Col2-Row2', 'Col3-Row2'],
					['id3','Col1-Row3', 'Col2-Row3', 'Col3-Row3']
				]}
				noResultContent={
					<>
						<p>No Content</p>
					</>
				}
			/>
		)
		const tableEl = screen.getByTestId('table-structure')
		expect(tableEl).toBeInTheDocument()
	})
	it('should be display no content when array is empty', () => {
		render(
			<Table
				headerItems={['Col1,Col2,Col3']}
				rowItems={[]}
				noResultContent={
					<>
						<p>No Content</p>
					</>
				}
			/>
		)
		expect(screen.queryByText(/No Content/i)).toBeInTheDocument()
	})
	it('should be display 3 rows, 3 cells by row and action column contain 2 childs', () => {
    const rowContent = [1, 'jhjbn', 0]
    const rowItems = [
      rowContent, rowContent ,rowContent, rowContent, rowContent
    ]
		const table = render(
			<Table
				headerItems={['NOM', 'MEMBRES', 'ACTION']}
				rowItems={rowItems}
        actions={
          {
            edit: true,
            delete: true,
            handleClick: ()=>{}
          }
        }
				noResultContent={
					<>
						<p>No Content</p>
					</>
				}
			/>
		)
		const rows = screen.getAllByTestId('table-structure-row')
    
		expect(rows).toHaveLength(rowItems.length)
		rows.forEach(row => {
			expect(row.children).toHaveLength(rowContent.length)
			expect(row.children[row.children.length - 1 ].childElementCount).toEqual(2)
		})
	})
  it('should be display actions column with 1 element when delete is disabled', () => {
    const rowContent = [1, 'jhjbn', 0]
    const rowItems = [
      rowContent, rowContent ,rowContent, rowContent, rowContent
    ]
		const table = render(
			<Table
				headerItems={['NOM', 'MEMBRES', 'ACTION']}
				rowItems={rowItems}
        actions={
          {
            edit: true,
            delete: false,
            handleClick: ()=>{}
          }
        }
				noResultContent={
					<>
						<p>No Content</p>
					</>
				}
			/>
		)
		const rows = screen.getAllByTestId('table-structure-row')
		rows.forEach(row => {
			expect(row.children[row.children.length - 1 ].childElementCount).toEqual(1)
		})
	})
})
