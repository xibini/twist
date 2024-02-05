<!--游戏区域-->
<script>
import GameMap from "@/components/GameMap.vue";

export default {
  components: {
    GameMap
  }
}
</script>

<template>
  <div class="playarea">
    <GameMap></GameMap>
  </div>
</template>

<style scoped>
div.playarea {
  width: 60vw;
  height: 70vh;
  margin: 40px auto;
}
</style>