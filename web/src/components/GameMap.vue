<!--游戏蒙版-->
<script>
import {GameMapObject} from "@/assets/scripts/GameMapObject";
import { ref, onMounted } from "vue";

export default {
  setup() {
    let parent = ref(null);
    let canvas = ref(null);
    onMounted(() => {
      new GameMapObject(canvas.value.getContext('2d'), parent.value)
    });
    return {
      parent,
      canvas
    }
  }
}
</script>

<template>
    <div ref="parent" class="gamemap">
      <canvas ref="canvas" tabindex="0">

      </canvas>
    </div>
</template>

<style scoped>
div.gamemap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>