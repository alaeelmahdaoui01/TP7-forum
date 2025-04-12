

<template>
  <form @submit.prevent="resetPassword" class="reset">
    <input type="email" required placeholder="Your email" v-model="email">
    <input type="submit" value="Reset">
    <div class="message">{{ message }}</div>
  </form>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
name: "ResetPassword",
components: {},
data(){
  return {
    email : "", 
    message:"",
  }
},
methods :{
  resetPassword(){
    firebase.auth().sendPasswordResetEmail(this.email).then(()=>{
      this.message="If your account exists, you will receive an email"
    }).catch(err => {
        this.message=err.message
      })
  }
}
};

</script>

<style scoped>
.reset {
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

.reset input[type="email"] {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.reset input[type="email"]:focus {
  border-color: #5c9ded;
  outline: none;
}

.reset input[type="submit"] {
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #5c9ded;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset input[type="submit"]:hover {
  background-color: #407ec9;
}

.message {
  color: #5c9ded;
  font-size: 0.9rem;
  text-align: center;
}

.error {
  color: #d9534f;
  font-size: 0.9rem;
  text-align: center;
}
</style>