<template>
  <div class="card">
    <div class="card-header">
      <h4>Login</h4>
    </div>
    <div class="card-body">
      <form method="post">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" class="form-control" v-model="user.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" class="form-control" v-model="user.password" required>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data () {
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },

  methods: {
    login () {
      this.axios.post('/api/login', this.user).then(response => {
        localStorage.setItem('token', response.data.token);
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        this.$store.dispatch('fetchUser');
        this.$toast.open({
          message: 'Login successful',
          type: 'success',
          position: 'top-right'
        });
        this.$router.push('/');
      }).catch(error => {
        if (error.response.data.errors) {
          const errors = Object.values(error.response.data.errors);
          errors.forEach((error) => {
            this.$toast.open({
              message: error,
              type: 'error',
              position: 'top-right'
            });
          })
        }
      })
    }
  }
}
</script>
