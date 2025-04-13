<template>
  <div class="home-container">
    <div class="welcome-message">
      <h1>Welcome to the Forum!</h1> 
      <p>Connect with others, share your ideas, and discover new perspectives!</p>
      <p v-if="threads.length > 0">
        Check out the latest discussion on <b>{{ threads[0].title || "an exciting topic" }}</b>.
      </p>
    </div>

    <div class="dashboard-container">
      <h2>Latest Discussions:</h2>
      <div class="threads">
        <ListThread v-if="threads.length > 0" :threads="threads" />
        <div v-else class="loading-message">Loading discussions...</div>
      </div>
    </div>

    <div class="blur-circle"></div>
  </div>
</template>

<script>
import ListThread from '@/components/DiscussionList.vue';
import getposts from '@/Firebase/getPosts'; 

export default {
  name: 'HomeView',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  components: {
    ListThread,
  },
  data() {
    return {
      threads: []
    };
  },
  async created() {
    try {
      const { load, posts } = getposts();
      await load();
      this.threads = posts.value.slice(0, 3);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  }
};
</script>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1e1e2f;
  color: white;
  padding: 2rem;
  overflow: hidden;
}

.welcome-message {
  text-align: center;
  z-index: 1;
  max-width: 800px;
  margin-bottom: 2rem;
}

.welcome-message h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.welcome-message p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.dashboard-container {
  width: 100%;
  max-width: 1200px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  margin: 1rem auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dashboard-container h2 {
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
}

.threads {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.loading-message {
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  width: 100%;
  padding: 2rem;
}

.blur-circle {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 100, 150, 0.3), transparent 70%);
  filter: blur(80px);
  top: 20%;
  left: 10%;
  z-index: 0;
  animation: float 15s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(50px, 50px);
  }
}

@media (max-width: 768px) {
  .welcome-message h1 {
    font-size: 2rem;
  }
  
  .welcome-message p {
    font-size: 1rem;
  }
  
  .dashboard-container {
    padding: 1.5rem;
  }
  
  .threads {
    grid-template-columns: 1fr;
  }
  
  .blur-circle {
    width: 200px;
    height: 200px;
    filter: blur(60px);
  }
}
</style>