import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'
import type { Task } from '../types'
import { ref } from 'vue'

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

  function addNewBoard() {
    const board = addBoard({
      id: 'board-' + new Date().getTime(),
      title: 'Board #' + boards.value.length + 1,
      columns: [],
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
