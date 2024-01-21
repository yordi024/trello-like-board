<template>
  <header class="h-[54px] py-2 border-b">
    <div class="mx-auto container-fluid w-full">
      <div class="flex justify-between items-center">
        <Button class="px-0" as-child variant="link" size="sm">
          <RouterLink to="/"><BookText /></RouterLink>
        </Button>
        <div class="flex gap-2">
          <div id="header-action"></div>
          <Button @click="toggleDark()" class="px-2" size="sm" variant="ghost">
            <Sun v-if="isDark" />
            <Moon v-else class="h-5" />
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui'
import { useDark, useToggle } from '@vueuse/core/index.cjs'
import { BookText, Moon, Sun } from 'lucide-vue-next'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
