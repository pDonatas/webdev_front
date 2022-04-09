<template>
  <div class="card">
    <div class="card-header">User create</div>
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
          <label for="country">Country</label>
          <Select2 id="country" name="country" v-model="user.country" :options="this.countries" />
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input type="text" id="address" name="email" class="form-control" v-model="user.address" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" class="form-control" v-model="user.password" required>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" @click.prevent="createUser">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditView',
  data () {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        country: '',
        address: '',
        password: ''
      }
    }
  },
  computed: {
    countries () {
      if (this.$store.getters.countries) {
        return this.$store.getters.countries.map(country => {
          return {
            text: country.name,
            id: country.alpha3Code
          }
        })
      }

      return {};
    }
  },
  methods: {
    createUser() {
      if (this.user.address && this.user.address.length === 0) {
        delete this.user.address
      }
      this.axios.post('/api/users', this.user)
        .then(() => {
          this.$router.push('/users')
          this.$toast.open({
            message: 'User created successfully',
            type: 'success',
            position: 'top-right'
          });
        })
        .catch(error => {
          if (error.response.data.errors) {
            const errors = Object.values(error.response.data.errors);
            errors.forEach((error) => {
              this.$toast.open({
                message: error[0],
                type: 'error',
                position: 'top-right'
              });
            })
          }
        })
    },

  }
}
</script>
