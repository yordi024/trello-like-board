<template>
  <div ref="target" class="group task-title" @click="emits('onEdit', task)">
    {{ task.title }}
    <div class="absolute top-1 right-1">
      <Button
        @click.stop="
          () => {
            emits('onTitleEdit', task)
            setModalStyle(modalStyle)
          }
        "
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

const emits = defineEmits(['onTitleEdit', 'onEdit'])

const { setModalStyle } = useBoard()

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

<style></style>
