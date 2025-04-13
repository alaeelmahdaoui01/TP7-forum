<template>
  <div class="dashboard-container">
    <div class="welcome-message">
      <h1>Welcome to the world of information</h1>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search discussions...">
        <button @click="search">Search</button>
      </div>
    </div>
    <div class="threads-content">
      <ListThread v-if="filteredThreads.length > 0" :threads="filteredThreads" />
      <div v-else class="loading-message">Loading discussions...</div>
    </div>
    <div class="blur-circle"></div>
  </div>
</template>
  
  <script>
  import ListThread from '@/components/DiscussionList.vue';
  import getposts from '@/Firebase/getPosts.js'; 
  
  export default {
    name: 'DashboardView',
    components: {
      ListThread,
    },
    data() {
      return {
        threads: [],
        searchQuery: ''
      };
    },
    async created() {
      try {
        const { load, posts } = getposts();
        await load();
        this.threads = posts.value;
        console.log('Threads:', this.threads)
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    },
    computed: {
      filteredThreads() {
        if (!this.searchQuery) {
          return this.threads;
        } else {
          const query = this.searchQuery.toLowerCase();
          return this.threads.filter(thread => 
            thread.title.toLowerCase().includes(query) || 
            thread.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }
      }
    },
    methods: {
      search() {
        // This method is called when the search button is clicked
        // The computed property `filteredThreads` automatically updates based on the `searchQuery`
      }
    }
  };
  </script>
  
  <style scoped>
.dashboard-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1e1e2f;
  color: white;
  padding: 2rem;
  overflow: hidden;
}

.welcome-message {
  text-align: center;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto 2rem;
}

.welcome-message h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.threads-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1;
}

.loading-message {
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 2rem;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-bar input {
  padding: 12px 20px;
  width: 70%;
  border-radius: 30px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px rgba(255, 100, 150, 0.3);
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-bar button {
  padding: 12px 25px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(135deg, #ff5e7d 0%, #ff2d5f 100%);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-bar button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 45, 95, 0.4);
}

.blur-circle {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 100, 150, 0.3), transparent 70%);
  filter: blur(80px);
  top: 10%;
  right: 10%;
  z-index: 0;
  animation: float 15s ease-in-out infinite alternate;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(20px, 20px);
  }
}

@media (max-width: 768px) {
  .welcome-message h1 {
    font-size: 2rem;
  }
  
  .search-bar {
    flex-direction: column;
    align-items: center;
  }
  
  .search-bar input {
    width: 100%;
  }
  
  .search-bar button {
    width: 100%;
  }
  
  .blur-circle {
    width: 200px;
    height: 200px;
    filter: blur(60px);
  }
}
</style>