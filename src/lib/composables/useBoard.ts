import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'
import type { Color, Column, Task } from '../types'
import { uuid } from '../utils'

export const useBoard = function () {
  const store = useBoardStore()

  const { boards, selectedTask, modalStyle, currentForm } = storeToRefs(store)

  const {
    getBoardById,
    addBoard,
    addBoardColumn,
    addBoardColumnTask,
    editBoardColumnTask,
    moveColumn,
    moveTask,
    openTaskDetailsModal,
    openEditTaskTitleModal,
    setModalStyle,
    setSelectedTask,
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

    addBoard({
      id: uuid(),
      title,
      color,
      columns: defaultColumns,
    })
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
    openEditTaskTitleModal(task)
    setModalStyle(modalStyle)
  }

  function editTask(task: Task) {
    openTaskDetailsModal(task)
  }

  return {
    boards,
    getBoardById,
    selectedTask,
    currentForm,
    modalStyle,
    addBoard,
    addColumn,
    addBoardColumnTask,
    addNewBoard,
    editBoardColumnTask,
    moveColumn,
    moveTask,
    editTaskTitle,
    editTask,
    setSelectedTask,
  }
}
