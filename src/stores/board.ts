import type { Board } from '@/lib/types'
import { uuid } from '@/lib/utils'
import { defineStore } from 'pinia'
import { onMounted, ref, type Ref } from 'vue'

export const useBoardsStore = defineStore('boards', () => {
  const boards: Ref<Board[]> = ref<Board[]>([])

  function getBoardById(id: string): Board | undefined {
    return boards.value.find((board) => board.id === id)
  }

  function addBoard(board: Board) {
    boards.value.push(board)
    return board
  }

  function updateBoard({ id, title, color }: Board) {
    const board = getBoardById(id)

    if (!board) return

    board.title = title
    board.color = color
  }

  function deleteBoard(id: string) {
    const index = boards.value.findIndex((board) => board.id === id)

    if (index === -1) return

    boards.value.splice(index, 1)
  }

  onMounted(() => {
    boards.value.push({
      id: uuid(),
      title: 'My Board',
      color: 'green',
    })
  })

  return {
    boards,
    getBoardById,
    addBoard,
    updateBoard,
    deleteBoard,
  }
})
