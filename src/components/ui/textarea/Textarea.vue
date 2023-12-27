<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { onClickOutside } from '@vueuse/core'
import { nextTick, ref } from 'vue'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  style?: any
  autogrow?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
  (e: 'clickOutSide', payload: Event): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const target = ref<HTMLTextAreaElement | null>(null)

onClickOutside(target, (event) => emits('clickOutSide', event))

function onInput() {
  if (!props.autogrow) return

  if (!target.value) return

  target.value.style.height = 'auto'
  target.value.style.height = target.value.scrollHeight + 'px'
}
</script>

<template>
  <textarea
    ref="target"
    v-model="modelValue"
    @input="onInput"
    :style="props.style"
    :class="
      cn(
        'flex w-full rounded-lg border border-input bg-background px-3 py-2 font-semibold text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        $attrs.class ?? '',
      )
    "
  />
</template>
