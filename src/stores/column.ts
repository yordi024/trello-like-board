import type { Column } from '@/lib/types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useColumnsStore = defineStore('columns', () => {
  const columns: Ref<Column[]> = ref<Column[]>([])

  function getBoardColumns(boardId: string): Column[] {
    const boardColumns = columns.value.filter((column) => column.boardId === boardId)
    return boardColumns.sort((a, b) => (a.order as number) - (b.order as number))
  }

  function getColumnById(id: string): Column | undefined {
    return columns.value.find((column) => column.id === id)
  }

  function addColumn(column: Column): Column {
    columns.value.push(column)
    return column
  }

  function updateColumn({ id, title, order }: Column): Column | undefined {
    const column = getColumnById(id)

    if (!column) return

    column.title = title
    column.order = order

    return column
  }

  function deleteColumn(id: string) {
    columns.value = columns.value.filter((column) => column.id !== id)
  }

  function updateColumnOrder(columnId: string, order: number) {
    const column = getColumnById(columnId)

    if (!column) return

    column.order = order
  }

  function orderColumns(columnsOrder: any) {
    for (const columnId in columnsOrder) {
      updateColumnOrder(columnId, columnsOrder[columnId] as number)
    }
  }

  return {
    columns,
    getColumnById,
    getBoardColumns,
    addColumn,
    updateColumn,
    deleteColumn,
    orderColumns,
  }
})
