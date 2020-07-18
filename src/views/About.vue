
<template>
<div>
  <h1>Create Event {{ user.name }}</h1>
  <p>There are {{catLength}} categories</p>
  <ul>
    <li v-for="cat in categories" :key="cat">
        {{cat}}
    </li>
  </ul>
<p>
{{ getEventById(3) }}
</p>

<hr>

{{ doneToDos }}

<hr>


</div>

</template>


<script>
// @ is an alias to /src

import { mapState, mapGetters } from 'vuex'

export default {
  name: "About",
  computed: {
    ...mapState(['user', 'categories']),
    ...mapGetters(['getEventById', 'catLength', 'doneToDos'])
  }
};
</script>