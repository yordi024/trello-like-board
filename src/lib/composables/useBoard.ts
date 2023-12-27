import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'

export const useBoard = function () {
  const store = useBoardStore()

  const { boards, activeBoard } = storeToRefs(store)

  const { setActiveBoard, addBoard, addBoardColumn, addBoardColumnTask, editBoardColumnTask } =
    store

  function addNewBoard() {
    const board = addBoard({
      id: 'board-' + new Date().getTime(),
      title: 'Board #' + boards.value.length + 1,
      columns: [],
    })

    setActiveBoard(board)
  }

  return {
    boards,
    activeBoard,
    setActiveBoard,
    addBoard,
    addBoardColumn,
    addBoardColumnTask,
    addNewBoard,
    editBoardColumnTask,
  }
}
