<template>
    <form @submit.prevent="handleLogin" class="login">
      <input type="email" required placeholder="Your email" v-model="email">
      <input type="password" required placeholder="Your password" v-model="password">
      <input type="submit" value="Login">
      <div class="error">{{ error }}</div>
    </form>
  </template>
  
<script setup>

import { ref } from 'vue';
import { defineEmits } from 'vue';  // to declare custom events (here login in useLogin())
import useLogin from '@/Firebase/Authentification/useLogin.js';

const email=ref(''); 
const password = ref('');

const { error } = useLogin();
const emit = defineEmits(['customEvent']);


const handleLogin = async () => {
  if (!error.value) {
    console.log("USER LOGGED SUCCESS");
    emit('login');
  } else {
    console.log("USER NOT LOGGED");
  }
}



</script>
  
<style scoped>

.login {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

.login input[type="email"],
.login input[type="password"] {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.login input[type="email"]:focus,
.login input[type="password"]:focus {
  border-color: #5c9ded;
  outline: none;
}

.login input[type="submit"] {
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #5c9ded;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login input[type="submit"]:hover {
  background-color: #407ec9;
}

.error {
  color: #d9534f;
  font-size: 0.9rem;
  text-align: center;
}
</style>

