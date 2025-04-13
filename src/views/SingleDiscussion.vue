
<template>
  <div class="discussion">
    <Thread :thread="mainThread" />

    <div v-if="replies.length > 0" class="replies">
      <h3>Replies</h3>
      <ThreadReply
        v-for="(reply, index) in replies"
        :key="index"
        :reply="reply"
        :index="index"
        :currentUserId="currentUserId"
        @delete-reply="deleteReply"
        @edit-reply="editReply"
      />
    </div>

    <div v-if="canReply" class="reply-form">
      <h3>Add a Reply</h3>
      <textarea
        v-model="newReplyContent"
        placeholder="Type your reply here..."
        class="reply-input"
      ></textarea>
      <button @click="addReply" class="reply-button">Reply</button>
    </div>
  </div>
</template>

<script>
import Thread from '@/components/Discussion.vue';
import ThreadReply from '@/views/ResponceDiscussion.vue';
import { getUser } from '@/Firebase/Authentification/getUser';
import { getthread } from '@/Firebase/firestore/getDisc.js';
import { appendAnswerToThread } from '@/Firebase/firestore/addDisc.js';
import { deleteResponse } from '@/Firebase/firestore/delete.js';
import { editResponse } from '@/Firebase/firestore/edit.js';


export default {
  name: 'DiscussionView',
  components: {
    Thread,
    ThreadReply
  },
  data() {
    return {
      mainThread: null,
      replies: [],
      newReplyContent: '',
      currentUserId: getUser()?.uid || null,
      canReply: true
    };
  },
  async created() {
    await this.loadThread();
  },
  methods: {
    async loadThread() {
      const { post, load } = getthread(this.$route.params.id);
      await load();
      this.mainThread = post.value;
      this.replies = post.value.answers || [];
    },
    async addReply() {
      const trimmed = this.newReplyContent.trim();
      const user = getUser();

      if (trimmed && user) {
        const reply = {
          content: trimmed,
          author: user.uid
        };

        await appendAnswerToThread(this.$route.params.id, reply.author, reply.content);
        await this.loadThread();
        this.newReplyContent = '';
      }
    },
    async deleteReply(index) {
      try {
        await deleteResponse(this.$route.params.id, index);
        await this.loadThread();
      } catch (err) {
        alert('Failed to delete reply.');
      }
    },
    async editReply({ index, newContent }) {
  try {
    await editResponse(this.$route.params.id, index, newContent);
    await this.loadThread(); // Refresh replies
  } catch (err) {
    alert('Failed to edit reply.');
  }
}

  }
};
</script>

<style scoped>
.discussion {
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 20px;
}

.replies {
  margin-top: 20px;
}

.replies h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #262626;
}

.reply-form {
  margin-top: 20px;
}

.reply-form h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #262626;
}

.reply-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
}

.reply-button {
  background-color: rgb(245, 66, 101);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.reply-button:hover {
  background-color: rgb(189, 28, 60);
}
</style>
