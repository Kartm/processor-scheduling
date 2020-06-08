<template>
  <section class="navigation">
    <ul>
      <router-link v-for="route in routes" :to="route" :key="route.path">
        <span>{{route.name | tra}}</span>
      </router-link>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

export interface NavigationOption {
  text: string;
  targetRoute: string;
}

@Component
export default class TopNavigation extends Vue {
  private get routes() {
    return (this.$router as any).options.routes;
  }
}
</script>

<style lang="scss">
section.navigation {
  position: absolute;
  top: 0;

  ul {
    display: grid;
    grid-auto-columns: max-content;
    grid-auto-flow: column;
    gap: 10px;
    padding: 0;

    a {
      color: #0f0f0f;
      text-decoration: none;
      position: relative;

      &:after {
        position: absolute;
        content: "";
        height: 2px;
        bottom: -4px;
        margin: 0 auto;
        left: 0;
        right: 0;
        width: 90%;
        background-color: #5f5f5f33;
      }

      &.router-link-exact-active {
        &:after {
          width: 90%;
          background-color: #5f5f5f;
        }
      }
    }
  }
}
</style>
