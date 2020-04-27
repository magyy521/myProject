const axios = require('axios');
function changeMediaToMp3(mediaId) {
  console.log('将从微信下载来的id转换为MP3,mediaId是',mediaId)
  return new Promise((resolve, reject) => {
    axios
      .get(`https://oauthbiz.lizhi.fm/transWechatAudioNew?tag=kfc&media_id=${mediaId}`)
      .then((resp) => {
        console.log('transWechatAudioNewc成功',resp)
        resolve(resp.data.data.highBand);
      })
      .catch((err) => {
        console.log('transWechatAudioNew失败了,原因是',err)
        reject(err.message);
      });
  });
}
export {changeMediaToMp3}