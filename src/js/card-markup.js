export default function photoCard(data) {
         return  `
        <div class="photo-card">
        <img src="${data.webformatURL}" alt="${data.tags} " loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: </b>${data.likes}
          </p>
          <p class="info-item">
            <b>Views: </b>${data.views}
          </p>
          <p class="info-item">
            <b>Comments: </b>${data.comments}
          </p>
          <p class="info-item">
            <b>Downloads: </b>${data.downloads}
          </p>
        </div>
      </div>`
       };