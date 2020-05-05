
//  let qmUrl = '//kfc.octlr.com';
// let  qmUrl = 'https://www.octlr.com/api';

let qmUrl = 'https://kfc.octlr.com/api'

export const api = {
  // 已对接
  getUserDetail: qmUrl + '/user/getUser',//{userId,userName,phone}获取用户详情
  loadPageList: qmUrl + '/audio/loadPageList',//{currentPage,pageSize}获取音频列表
  addAudio:  qmUrl +'/audio/add',// 保存音频信息的接口

  // 未对接
  getAudioDetail: qmUrl + '/audio/detail',//根据id获取音频详情
  submitVote: qmUrl + '/vote/do',// 投票 
  getReward: qmUrl + '/audio/getTop3',// 获取中奖信息

}
