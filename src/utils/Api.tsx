import axios from 'axios';

export const fetchData = async (page: number, pageSize: number) => {
  try {
    return await axios.get(
      `https://661010ca0640280f219c36af.mockapi.io/post?page=${page}&limit=${pageSize}`,
    );
  } catch (error) {
    throw new Error('Error fetching data: ' + error);
  }
};

export const handleLike = async (id: any, data: any[]) => {
  try {
    const index = data.findIndex(item => item.id === id);
    const updatedData = [...data];
    if (data[index].liked) {
      await axios.put(
        `https://661010ca0640280f219c36af.mockapi.io/post/${id}`,
        {likes: data[index].likes - 1},
      );
      updatedData[index] = {
        ...data[index],
        likes: data[index].likes - 1,
        liked: false,
      };
    } else {
      await axios.put(
        `https://661010ca0640280f219c36af.mockapi.io/post/${id}`,
        {likes: data[index].likes + 1},
      );
      updatedData[index] = {
        ...data[index],
        likes: data[index].likes + 1,
        liked: true,
      };
    }
    return updatedData;
  } catch (error) {
    throw new Error('Error updating likes:' + error);
  }
};

export const handleComment = async (
  id: any,
  commentText: any,
  data: {id: any}[],
) => {
  try {
    const response = await fetch(
      `https://661010ca0640280f219c36af.mockapi.io/post/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({comments: commentText}),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to add comment');
    }

    const updatedPost = await response.json();
    const updatedData = data.map((item: {id: any}) =>
      item.id === id ? updatedPost : item,
    );
    return updatedData;
  } catch (error) {
    throw new Error('Error adding comment:' + error);
  }
};
