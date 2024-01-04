<template>
  <Dialog v-model:open="open">
    <VisuallyHidden>
      <DialogTitle></DialogTitle>
    </VisuallyHidden>
    <DialogContentTask class="bg-transparent border-none shadow-none" :style="modalStyle">
      <Textarea
        autogrow
        class="py-2 px-3 resize-none overflow-hidden block"
        :style="{ height: modalStyle?.height }"
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
import { ref, watch } from 'vue'
import { Button } from '@/components/ui'
import { Dialog, DialogClose, DialogContentTask, DialogTitle } from '@/components/ui/dialog'
import { useBoard } from '@/lib/composables'
import { Textarea } from '@/components/ui/textarea'

const { editBoardColumnTask, selectedTask, modalStyle } = useBoard()

const taskTitle = ref()

const open = ref(false)

watch(
  () => selectedTask.value,
  () => {
    if (selectedTask.value?.id) {
      taskTitle.value = selectedTask.value.title
      open.value = true
    }
  },
)

function saveNewTitle() {
  if (!selectedTask.value) return

  editBoardColumnTask(selectedTask.value?.columnId as string, selectedTask.value.id, {
    ...selectedTask.value,
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
