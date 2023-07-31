<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <h3>Example 1</h3>
  <div>
    Data: {{ example1 }}
  </div>
  <button @click="getLanguage">Get Language</button>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return{
      example1: ""
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    async getLanguage () {
      try {
        const res = await axios.post(
          'http://localhost:4000/graphql', {
          query: '{ language }'
        })
        this.example1 = res.data.data.language
      } catch (e) {
        console.log('err', e)
      }
    },
    async getDataFromHeroku () {
      try {
        let body = {
          operationName: 'MyQuery',
            query: `query MyQuery {
              categories {
                _id
              }
            }`
        }
        const res = await axios.post(
          'https://harmless-macaque-15.hasura.app/v1/graphql', body,
          {
            headers: {
              'content-type': 'application/json',
              'x-hasura-admin-secret': "G409WPghfq3F9ZsLwWFetGBRjRJL14isVshVRRPmRy6yyEp6f4m1uqlv90nAHC17"
            },
        })
        console.log("res", res)
        this.example1 = res.data.data.language
      } catch (e) {
        console.log('err', e)
      }
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
  margin-top: 60px;
}
</style>
