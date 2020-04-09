<template>
  <div id="app">
    <md-toolbar class="md-accent">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <h3 class="md-title">Vee Validate Address Book App</h3>
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Vee Validate Address Book App</span>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <router-link to="/">
            <span class="md-list-item-text">Home</span>
          </router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/contact">
            <span class="md-list-item-text">Add Contact</span>
          </router-link>
        </md-list-item>
      </md-list>
    </md-drawer>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app",
  data: () => {
    return {
      showNavigation: false
    };
  }
};
</script>
<style lang="scss">
.center {
  text-align: center;
}
</style>
