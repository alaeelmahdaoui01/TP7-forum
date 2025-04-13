<template>
  <div class="discussion">
    <Thread :thread="mainThread" />

    <div v-if="replies.length > 0" class="replies">
      <h3>Replies</h3>
      <ThreadReply
        v-for="reply in replies"
        :key="reply.id"
        :reply="reply"
        :currentUserId="currentUserId"
        @delete-reply="deleteReply"
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
    const { post, load } = getthread(this.$route.params.id);
    await load();
    this.mainThread = post.value;
    this.replies = post.value.answers || [];
  },
  methods: {
    async addReply() {
      const trimmed = this.newReplyContent.trim();
      const user = getUser();

      if (trimmed && user) {
        const reply = {
          content: trimmed,
          author: user.uid
        };

        await appendAnswerToThread(this.$route.params.id, reply.author, reply.content);

        this.replies.push({
          id: Date.now().toString(), // temp ID until reload
          message: reply.content,
          author: reply.author
        });

        this.newReplyContent = '';
      }
    },
    async deleteReply(replyId) {
      try {
        await deleteResponse(this.$route.params.id, replyId);
        this.replies = this.replies.filter(reply => reply.id !== replyId);
      } catch (err) {
        alert('Failed to delete reply.');
      }
    }
  }
};
</script>
