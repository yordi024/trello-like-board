import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'
import type { Color, Column, Task } from '../types'
import { uuid } from '../utils'

export const useBoard = function () {
  const store = useBoardStore()

  const { boards, activeBoard, selectedTask, modalStyle } = storeToRefs(store)

  const {
    setActiveBoard,
    addBoard,
    addBoardColumn,
    addBoardColumnTask,
    editBoardColumnTask,
    moveColumn,
    moveTask,
    setSelectedTask,
    setModalStyle,
  } = store

  function addNewBoard({ title, color }: { title: string; color: Color }) {
    const defaultColumns: Column[] = [
      {
        id: uuid(),
        title: 'To Do',
        tasks: [],
      },
      {
        id: uuid(),
        title: 'Doing',
        tasks: [],
      },
      {
        id: uuid(),
        title: 'Done',
        tasks: [],
      },
    ]

    const board = addBoard({
      id: uuid(),
      title,
      color,
      columns: defaultColumns,
    })

    setActiveBoard(board)
  }

  function addColumn(title: string, onComplete: Function) {
    if (!title.trim()) return

    addBoardColumn({
      id: 'column-' + new Date().getTime(),
      title: title.trim(),
      tasks: [],
    })

    onComplete()
  }

  function editTaskTitle(task: Task, modalStyle: any) {
    setSelectedTask(task)
    setModalStyle(modalStyle)
    console.log({ task, modalStyle: modalStyle.value })
  }

  return {
    boards,
    activeBoard,
    selectedTask,
    modalStyle,
    setActiveBoard,
    addBoard,
    addColumn,
    addBoardColumnTask,
    addNewBoard,
    editBoardColumnTask,
    moveColumn,
    moveTask,
    editTaskTitle,
  }
}
