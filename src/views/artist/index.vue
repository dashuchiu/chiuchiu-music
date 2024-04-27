<script setup>
import CmLayout from '@/components/CmLayout/index.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = ref(route.params.id)
</script>
<template>
  <cm-layout :leftArrow="true"></cm-layout>
  <div>{{ id }}</div>
</template>
