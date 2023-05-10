async function listVideos() {
  const response = await fetch('http://localhost:3000/videos');
  const data = await response.json();
  return data;
}

export const connectAPI = {
  listVideos
}