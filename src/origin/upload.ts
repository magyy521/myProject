import axios from 'axios';
function changeMediaToMp3(mediaId: string | number) {
  return new Promise<string>((resolve, reject) => {
    axios
      .get(`//oauthbiz.lizhi.fm/transWechatAudioNew`, {
        params: {
          media_id: mediaId,
          tag: "brand"
        }
      })
      .then((resp: any) => {
        resolve(resp.data.data.highBand);
      })
      .catch((err: Error) => {
        reject(err.message);
      });
  });
}
export default changeMediaToMp3;
