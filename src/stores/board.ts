import type { Board, Column, Task } from '@/lib/types'
import { defineStore } from 'pinia'
import { onMounted, ref, type Ref } from 'vue'
import data from '@/data/board.json'

export const useBoardStore = defineStore('useBoard', () => {
  const boards: Ref<Board[]> = ref<Board[]>([])

  const activeBoard = ref<Board>()

  const selectedTask = ref<Task>()

  const modalStyle = ref<any>()

  const currentForm = ref('')

  function setActiveBoard(board: Board) {
    activeBoard.value = board
  }

  function setModalStyle(style: any) {
    modalStyle.value = style
  }

  function getBoardById(boardId: string): Board | undefined {
    return boards.value.find((board) => board.id === boardId)
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

  function removeBoardColumnTask(columnId: string, taskId: string) {
    if (!activeBoard.value) return

    const activeBoardColumn = activeBoard.value.columns.find((col) => col.id === columnId)

    if (!activeBoardColumn) return

    activeBoardColumn.tasks = activeBoardColumn.tasks.filter((task) => task.id !== taskId)
  }

  function removeBoardColumn(columnId: string) {
    if (!activeBoard.value) return

    activeBoard.value.columns = activeBoard.value.columns.filter((col) => col.id !== columnId)
  }

  function moveColumn(oldIndex: number, newIndex: number) {
    if (!activeBoard.value) return

    const activeBoardColumn = activeBoard.value.columns.at(oldIndex)

    if (!activeBoardColumn) return

    activeBoard.value.columns.splice(oldIndex, 0, activeBoard.value.columns.splice(newIndex, 1)[0])
  }

  function moveTask(
    fromColumnIndex: number,
    fromTaskIndex: number,
    toColumIndex: number,
    newTaskIndex: number,
  ) {
    if (!activeBoard.value) return

    const fromColumn = activeBoard.value.columns.at(fromColumnIndex)
    const toColum = activeBoard.value.columns.at(toColumIndex)

    if (!fromColumn || !toColum) return

    const [taskToMove] = fromColumn.tasks.splice(fromTaskIndex, 1)
    toColum.tasks.splice(newTaskIndex, 0, taskToMove)
  }

  function setSelectedTask(task?: Task) {
    selectedTask.value = task
  }

  function openTaskDetailsModal(task: Task) {
    setSelectedTask(task)
    currentForm.value = 'task-details'
  }

  function openEditTaskTitleModal(task: Task) {
    setSelectedTask(task)
    currentForm.value = 'task-title'
  }

  onMounted(() => {
    boards.value = data as Board[]
    activeBoard.value = boards.value[0]
    selectedTask.value = activeBoard.value.columns[0].tasks[0]
  })

  return {
    boards,
    activeBoard,
    selectedTask,
    getBoardById,
    currentForm,
    modalStyle,
    setSelectedTask,
    setModalStyle,
    setActiveBoard,
    addBoard,
    addBoardColumn,
    addBoardColumnTask,
    editBoardColumnTask,
    moveColumn,
    moveTask,
    removeBoardColumnTask,
    openTaskDetailsModal,
    openEditTaskTitleModal,
  }
})
