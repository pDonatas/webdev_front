<template>
  <div class="card">
    <div class="card-header">
      <h4>Register</h4>
    </div>
    <div class="card-body">
      <form method="post">
        <div class="form-group">
          <label for="first_name">First name</label>
          <input type="text" id="first_name" name="first_name" class="form-control" v-model="user.first_name" required>
        </div>
        <div class="form-group">
          <label for="last_name">Last name</label>
          <input type="text" id="last_name" name="last_name" class="form-control" v-model="user.last_name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" class="form-control" v-model="user.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" class="form-control" v-model="user.password" required>
        </div>
        <div class="form-group">
          <label for="password_confirmation">Password confirmation</label>
          <input type="password" id="password_confirmation" name="password_confirmation" class="form-control" v-model="user.password_confirmation" required>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" @click.prevent="register">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data () {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  methods: {
    register () {
      this.axios.post('/api/register', this.user).then(response => {
        localStorage.setItem('token', response.data.token);
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        this.$store.dispatch('fetchUser');
        this.$toast.open({
          message: 'Registration successful',
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
