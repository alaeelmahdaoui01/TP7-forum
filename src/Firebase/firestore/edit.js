import { projectFirestore } from '@/Firebase/Config';

// Edit a response in a thread by its index
const editResponse = async (threadId, index, newMessage) => {
  try {
    const threadRef = projectFirestore.collection('threads').doc(threadId);
    const threadDoc = await threadRef.get();

    if (!threadDoc.exists) {
      throw new Error('Thread does not exist');
    }

    const threadData = threadDoc.data();
    const answers = Array.isArray(threadData.answers) ? threadData.answers : [];

    // Check index validity
    if (index < 0 || index >= answers.length) {
      throw new Error('Invalid index');
    }

    // ✅ Update the message at the given index
    answers[index].message = newMessage;

    // ✅ Update Firestore with the new array
    await threadRef.update({ answers });

    console.log('Response edited');
  } catch (error) {
    console.error('Error editing response:', error);
    throw error;
  }
};

export { editResponse };
