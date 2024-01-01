<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(['drop'])

function onDrop(e: any) {
  const transferData = JSON.parse(e.dataTransfer.getData('payload') || '{}')

  console.log({ drop: e.dataTransfer, transferData, payload: e.dataTransfer.getData('payload') })
  emits('drop', transferData)
}
</script>
