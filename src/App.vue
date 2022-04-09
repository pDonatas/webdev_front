<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
              </li>
              <li v-if="this.$store.state.user" class="nav-item">
                <router-link class="nav-link" to="/users">Users</router-link>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto">
              <li v-if="!this.$store.state.user" class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
              </li>
              <li v-if="!this.$store.state.user" class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
              </li>
              <li v-if="this.$store.state.user" class="nav-item">
                <router-link class="nav-link" to="/logout">Logout</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="col-md-12">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      if (!this.$store.state.user && localStorage.getItem('token')) {
        this.$store.dispatch('fetchUser');
      }

      if (!this.$store.state.countries) {
        this.$store.dispatch('fetchCountries');
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
