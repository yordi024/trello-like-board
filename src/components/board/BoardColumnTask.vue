<template>
  <Dialog v-model:open="open">
    <VisuallyHidden>
      <DialogTitle></DialogTitle>
    </VisuallyHidden>
    <div ref="target" draggable="true" class="group task-title">
      {{ task.title }}
      <div class="absolute top-1 right-1">
        <DialogTrigger as-child>
          <Button size="xs" class="mt-0 p-2 hidden group-hover:inline-flex" variant="ghost">
            <Edit2 class="h-4 w-4" />
          </Button>
        </DialogTrigger>
      </div>
    </div>
    <DialogContentTask class="bg-transparent border-none shadow-none" :style="modalStyle">
      <Textarea
        autogrow
        class="py-2 px-3 resize-none overflow-hidden block"
        :style="{ height: taskCardboundaries?.height.value + 'px' }"
        v-model="taskTitle"
        @keydown.enter="saveNewTitle()"
      ></Textarea>
      <DialogClose class="text-left">
        <Button @click="saveNewTitle()" size="sm" class="mt-3 w-[100px]"> Save </Button>
      </DialogClose>
    </DialogContentTask>
  </Dialog>
</template>

<script setup lang="ts">
import { VisuallyHidden } from 'radix-vue'
import { computed, ref, watch } from 'vue'
import { Button } from '@/components/ui'
import { Edit2 } from 'lucide-vue-next'
import {
  Dialog,
  DialogClose,
  DialogContentTask,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Task } from '@/lib/types'
import { useBoard } from '@/lib/composables'
import { useElementBounding } from '@vueuse/core'
import { Textarea } from '@/components/ui/textarea'

const props = defineProps<{
  columnId: string
  task: Task
}>()

const { editBoardColumnTask } = useBoard()

const taskTitle = ref(props.task.title)

const target = ref<HTMLDivElement | null>(null)

const open = ref(false)

const taskCardboundaries = useElementBounding(target)

const modalStyle = computed(() => {
  return {
    width: taskCardboundaries?.width.value + 'px',
    inset: '0px auto auto 0px',
    transform: `translate(${taskCardboundaries?.left.value}px, ${taskCardboundaries?.top.value}px)`,
  }
})

watch(
  () => open.value,
  () => {
    taskTitle.value = props.task.title
  },
)

function saveNewTitle() {
  editBoardColumnTask(props.columnId, props.task.id, {
    ...props.task,
    title: taskTitle.value.trim(),
  })

  open.value = false
}
</script>

<style>
.task-title {
  @apply cursor-pointer py-2 px-3 w-full shadow rounded-lg border bg-background relative text-base font-semibold;
}
</style>
