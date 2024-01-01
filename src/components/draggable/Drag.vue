<template>
  <div asChild draggable="true" @dragstart.self="onDrag" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { TransferData } from '@/lib/types'

const props = defineProps<{ dataTransfer: TransferData }>()

function onDrag(event: any) {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.dropEffect = 'move'

  const { dataTransfer } = props

  console.log(props)

  event.dataTransfer.setData('payload', JSON.stringify(dataTransfer))
  console.log({ drag: event.dataTransfer, dataTransfer })
}
</script>
