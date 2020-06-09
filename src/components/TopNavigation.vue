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
    return (this.$router as any).options.routes.filter((route: any) => {
      if (route.meta && route.meta.hidden) {
        return false;
      }
      return true;
    });
  }
}
</script>

<style lang="scss">
section.navigation {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  ul {
    display: grid;
    grid-auto-columns: max-content;
    grid-auto-flow: column;
    gap: 16px;
    padding: 0;

    a {
      color: #0f0f0f;
      text-decoration: none;
      position: relative;
      font-size: 15px;

      &:after {
        position: absolute;
        content: "";
        height: 1px;
        bottom: -4px;
        margin: 0 auto;
        left: 0;
        right: 0;
        width: calc(100% - 4px);
        background-color: #5f5f5f33;
      }

      &.router-link-exact-active {
        &:after {
          height: 2px;
          background-color: #5f5f5f;
        }
      }
    }
  }
}
</style>
