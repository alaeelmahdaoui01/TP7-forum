import { projectFirestore } from './Config.js'
import { ref } from 'vue'


const getposts = () => {
    const posts = ref([]);
    const load = async() => {
        try {
            const res = await projectFirestore.collection('threads').get()
            posts.value = res.docs.map(doc => {
                const data = doc.data();
                // Ensure required fields exist
                return {
                    id: doc.id,
                    title: data.title || 'Untitled',
                    tags: Array.isArray(data.tags) ? data.tags : [],
                    author: data.author || '',
                    // other fields...
                }
            })
        } catch (err) {
            console.error('Error loading posts:', err.message);
            throw err; // Re-throw to handle in component
        }
    }
    return { load, posts }
}

export default getposts;