export default function photoCard(data) {
         return  `
        <div class="photo-card">
        <img src="${data.previewURL}" alt="${data.tags} " loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${data.likes} </b>
          </p>
          <p class="info-item">
            <b>Views: ${data.views} </b>
          </p>
          <p class="info-item">
            <b>Comments: ${data.comments} </b>
          </p>
          <p class="info-item">
            <b>Downloads: ${data.downloads} </b>
          </p>
        </div>
      </div>`
       };