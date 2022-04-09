<template>
  <div class="card">
    <div class="card-header">
      Users
      <button @click="this.$router.push({ name: 'CreateUser'})" class="btn btn-primary">Create new</button>
      <form method="post">
        <div class="form-group">
          <label for="search">Search</label>
          <input type="text" class="form-control" id="search" v-model="search" placeholder="Search">
          <input type="button" class="btn btn-primary" value="Search" @click="searchUsers()">
        </div>
      </form>
    </div>
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="user.id" v-for="user in users.data">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="btn btn-primary" @click="editUser(user)">Edit</button>
              <button v-if="this.$store.state.user.id !== user.id" class="btn btn-danger" @click="deleteUser(user)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="users.meta && users.meta.last_page > 1">
        <ul class="pagination">
          <li class="page-item" v-if="users.meta.current_page > 1">
            <a class="page-link" href="#" @click.prevent="getUsers(users.meta.current_page - 1)">Previous</a>
          </li>
          <li class="page-item" v-if="users.meta.current_page < users.meta.last_page">
            <a class="page-link" href="#" @click.prevent="getUsers(users.meta.current_page + 1)">Next</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      users: [],
      search: ''
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    searchUsers() {
      this.axios.post('/api/users/search', {
        search: this.search
      }).then(response => {
        this.users = response.data
      })
    },
    getUsers (page = 1) {
      this.axios.get('/api/users?page=' + page).then(response => {
        this.users = response.data;
      })
    },
    editUser(user) {
      this.$router.push({ name: 'EditUser', params: { id: user.id } })
    },
    deleteUser(user) {
      this.axios.delete('/api/users/' + user.id).then(() => {
        this.getUsers()
      })
    }
  }
}
</script>
