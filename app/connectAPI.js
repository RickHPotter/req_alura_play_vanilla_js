async function createVideo(video) {
  const conn = await fetch('http://localhost:3000/videos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: video.id,
      title: video.title,
      desc: `${video.desc} k views`,
      url: video.url,
      img: video.img,
    })
  })

  if (!conn.ok) {
    throw new Error('Failed to upload the video.')
  }

  const data = await conn.json();
  return data;
}

async function readVideos() {
    const response = await fetch('http://localhost:3000/videos');
    const data = await response.json();
    return data;
}

async function readVideosWhere(query) {
  const response = await fetch(`http://localhost:3000/videos?q=${query}`);
  const data = await response.json();
  return data;
}

async function updateVideo() {

}

async function deleteVideo() {

}


export const connectAPI = {
  createVideo, readVideos, readVideosWhere, updateVideo, deleteVideo
}