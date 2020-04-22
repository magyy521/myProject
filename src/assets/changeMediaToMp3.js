const axios = require('axios');
function changeMediaToMp3(mediaId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`//oauthbiz.lizhi.fm/transWechatAudioNew`, {
        params: {
          media_id: mediaId,
          tag: "brand"
        }
      })
      .then((resp) => {
        resolve(resp.data.data.highBand);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
export {changeMediaToMp3}