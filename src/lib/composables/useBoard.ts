import { useBoardsStore } from '@/stores/board'
import { storeToRefs } from 'pinia'
import type { Color, Column, Task } from '../types'
import { uuid } from '../utils'
import { useColumnsStore } from '@/stores/column'
import { useTasksStore } from '@/stores/task'
import { ref } from 'vue'

const modalStyle = ref<any>()

export const useBoard = function () {
  const boardsStore = useBoardsStore()
  const columnsStore = useColumnsStore()
  const tasksStore = useTasksStore()

  const { boards } = storeToRefs(boardsStore)

  const { getBoardById, addBoard } = boardsStore

  const { getBoardColumns, addColumn } = columnsStore

  const { addTask, getTasksColumn, updateTask } = tasksStore

  function addNewBoard({ title, color }: { title: string; color: Color }) {
    const defaultColumns: Column[] = [
      {
        id: uuid(),
        title: 'To Do',
        order: 1,
      },
      {
        id: uuid(),
        title: 'Doing',
        order: 2,
      },
      {
        id: uuid(),
        title: 'Done',
        order: 3,
      },
    ]

    const board = addBoard({
      id: uuid(),
      title,
      color,
    })

    for (const column of defaultColumns) {
      column.boardId = board.id
      addColumn(column)
    }
  }

  function addBoardColumn(boardId: string, title: string, onComplete: Function) {
    if (!title.trim()) return

    addColumn({
      id: uuid(),
      boardId,
      title: title.trim(),
    })

    onComplete()
  }

  function addColumnTask(columnId: string, title: string, onComplete: Function) {
    if (!title.trim()) return

    addTask({
      columnId,
      title: title.trim(),
    })

    onComplete()
  }

  function updateColumnTask(task: Task) {
    updateTask({ ...task })
  }

  function setModalStyle(value: any) {
    modalStyle.value = value
  }

  return {
    boards,
    getBoardById,
    modalStyle,
    setModalStyle,
    addNewBoard,
    getBoardColumns,
    addBoardColumn,
    addColumnTask,
    updateColumnTask,
    getTasksColumn,
  }
}
