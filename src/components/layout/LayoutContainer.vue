<script setup>
import LayoutTab from '@/components/layout/LayoutTab.vue'
import MusicPlayer from '@/components/musicPlayer/MusicPlayer.vue'
</script>
<template>
  <slot name="content"></slot>
  <MusicPlayer></MusicPlayer>
  <LayoutTab></LayoutTab>
</template>
