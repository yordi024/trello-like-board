<template>
  <div ref="target" class="group task-title" @click="editTask({ ...task, columnId })">
    {{ task.title }}
    <div class="absolute top-1 right-1">
      <Button
        @click.stop="editTaskTitle({ ...task, columnId }, modalStyle)"
        size="xs"
        class="mt-0 p-2 hidden group-hover:inline-flex"
        variant="ghost"
      >
        <Edit2 class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui'
import { Edit2 } from 'lucide-vue-next'
import type { Task } from '@/lib/types'
import { useBoard } from '@/lib/composables'
import { useElementBounding } from '@vueuse/core'

defineProps<{
  columnId: string
  task: Task
}>()

const { editTaskTitle, editTask } = useBoard()

const target = ref<HTMLDivElement | null>(null)

const taskCardboundaries = useElementBounding(target)

const modalStyle = computed(() => {
  return {
    height: taskCardboundaries?.height.value + 'px',
    width: taskCardboundaries?.width.value + 'px',
    inset: '0px auto auto 0px',
    transform: `translate(${taskCardboundaries?.left.value}px, ${taskCardboundaries?.top.value}px)`,
  }
})
</script>

<style>
.task-title {
  @apply cursor-pointer py-2 px-3 w-full shadow rounded-lg border bg-background relative text-base font-semibold;
}
</style>
