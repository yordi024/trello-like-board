import type { Board, Column, Task } from '@/lib/types'
import { defineStore } from 'pinia'
import { onMounted, ref, type Ref } from 'vue'
import data from '@/data/board.json'

export const useBoardStore = defineStore('userBoard', () => {
  const boards: Ref<Board[]> = ref<Board[]>([])

  const activeBoard = ref<Board>()

  function setActiveBoard(board: Board) {
    activeBoard.value = board
  }

  function addBoard(board: Board) {
    boards.value.push(board)
    return board
  }

  function addBoardColumn(column: Column) {
    if (!activeBoard.value) return

    activeBoard.value.columns.push(column)
  }

  function addBoardColumnTask(columnId: string, task: Task) {
    if (!activeBoard.value) return

    const activeBoardColumn = activeBoard.value.columns.find((col) => col.id === columnId)

    if (!activeBoardColumn) return

    activeBoardColumn.tasks.push(task)
  }

  function editBoardColumnTask(columnId: string, taskId: string, task: Task) {
    if (!activeBoard.value) return

    const activeBoardColumn = activeBoard.value.columns.find((col) => col.id === columnId)

    if (!activeBoardColumn) return

    const activeBoardColumnTask = activeBoardColumn.tasks.find((task) => task.id === taskId)

    if (!activeBoardColumnTask) return

    activeBoardColumnTask.title = task.title
    activeBoardColumnTask.description = task.description
  }

  onMounted(() => {
    boards.value = data as Board[]
    activeBoard.value = boards.value[0]
  })

  return {
    boards,
    activeBoard,
    setActiveBoard,
    addBoard,
    addBoardColumn,
    addBoardColumnTask,
    editBoardColumnTask,
  }
})
