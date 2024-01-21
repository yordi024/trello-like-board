<template>
  <section class="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 my-4 gap-4">
    <BoardCard v-for="board in boards" :key="board.id" :board="board" />
  </section>
  <teleport to="#header-action">
    <NewBoardFormDialog>
      <Button size="sm">Create a board</Button>
    </NewBoardFormDialog>
  </teleport>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui'
import { onMounted } from 'vue'
import { BoardCard } from '@/components/board'
import { useBoard } from '@/lib/composables'
import { NewBoardFormDialog } from '@/components/forms'

const { boards } = useBoard()

onMounted(() => {
  document.documentElement.classList.add(`theme-green`)

  const $content = document.querySelector('.content')

  $content?.classList.remove('bg-primary')
})
</script>

<style></style>
