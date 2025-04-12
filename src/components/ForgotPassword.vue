<template>
    <form @submit.prevent="handleForgotPassword">
      <input type="email" v-model="email" placeholder="Enter your email" required />
      <button type="submit">Reset Password</button>
      <div class="error" v-if="error">{{ error }}</div>
    </form>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import useForgotPassword from "@/Firebase/Authentification/forgotPassword.js";
  import { defineEmits } from 'vue';

  const email = ref("");
  const { error, forgotPassword } = useForgotPassword();
  const emit = defineEmits(['customEvent']);
  
  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email.value);
      alert("Password reset email sent. Please check your inbox.");
      emit('reset');
    } catch (err) {
      console.error(err);
    }
  };
  </script>


<style scoped>
form {
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

form input[type="email"] {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

form input[type="email"]:focus {
  border-color: #5c9ded;
  outline: none;
}

form button[type="submit"] {
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #5c9ded;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button[type="submit"]:hover {
  background-color: #407ec9;
}

.error {
  color: #d9534f;
  font-size: 0.9rem;
  text-align: center;
}
</style>
