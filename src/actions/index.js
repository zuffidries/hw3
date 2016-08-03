export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // CREATE_POST: 'CREATE_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // DELETE_POST: 'DELETE_POST',
};


export function fetchPosts() {
  return {
    type: ActionTypes.FETCH_POSTS,
    payload: null,
  };
}

export function fetchPost() {
  return {
    type: ActionTypes.FETCH_POST,
    payload: null,
  };
}
