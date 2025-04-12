<template>
    <header>
        <nav>
            <div class="container">
                <router-link to="/"> Forum App </router-link>
            </div>

            <div>
                <ul>
                    <router-link to="/"> Home </router-link>
                    <router-link to="/login"> Login/Sign Up </router-link>
                </ul>
            </div>
            
        </nav>
    </header>

</template>
  
<style scoped>
header {
  background-color: #1e293b; /* Slate-800 */
  padding: 1rem 0;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.container {
  font-size: 1.5rem;
  font-weight: bold;
}

.container a {
  color: white;
  text-decoration: none;
}

ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

ul a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
}

ul a:hover {
  background-color: #334155; /* Slate-700 */
}

.profile{
  color : white; 
}

</style>