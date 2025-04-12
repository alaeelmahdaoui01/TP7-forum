<template>
  <div class="home">
    <NavBar />
    <section class="welcome">
      <h1>Welcome to Forum App</h1>
      <p>Join the conversation. Share your thoughts. Learn something new.</p>
      <button><router-link to="/login"> Start a Discussion </router-link></button>
    </section>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
name: "HomeView",
components: { NavBar },
};
</script>

<style scoped>
.home {
padding: 2rem;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
background-color: #f8fafc;
min-height: 100vh;
}

.welcome {
text-align: center;
background-color: #e2e8f0;
padding: 2rem;
border-radius: 1rem;
margin-bottom: 2rem;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.welcome h1 {
font-size: 2.5rem;
color: #1e293b;
margin-bottom: 1rem;
}

.welcome p {
font-size: 1.1rem;
color: #475569;
margin-bottom: 1.5rem;
}

.welcome button {
background-color: #3b82f6;
color: white;
padding: 0.75rem 1.5rem;
font-size: 1rem;
border: none;
border-radius: 0.5rem;
cursor: pointer;
transition: background-color 0.3s ease;
}

.welcome button:hover {
background-color: #2563eb;
}

.welcome a{
  text-decoration : none ; 
  color : white 
}
</style>