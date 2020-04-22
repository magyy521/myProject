let ftUrl = '//www.qmlid.cn/ftms';//丰田url前缀
// ftUrl = '/ftms'
//  ftUrl = 'https://homesite.ftms.devbmsoft.cn';丰田url测试前缀
//  let lzUrl = 'https://lzadvertbiz.lizhi.fm';// 荔枝前缀
 let qmUrl = '//kfc.octlr.com/';
 qmUrl = '';

export const api = {
  getHotVoiceList: qmUrl + '/qmlid/sound/getList',//{currentPage,pageSize}获取最热音频列表
  getVoiceById: qmUrl + '/qmlid/sound/get',//{id}根据id获取某个音频的详情,名字,得票数,排名,title
  getMyVoice: qmUrl + '/qmlid/sound/mySound',//{userId}获取我的音频,可以跟用户详情合二为一,
  submitVote: qmUrl + '/qmlid/sound/vote',//投票待对接
  saveAudio:  qmUrl +'/qmlid/sound/save',// 保存音频信息的接口
  getUserDetail: qmUrl + '/qmlid/user/get',//{userId,userName,phone}获取用户详情 待对接
  submitReward: qmUrl + '/qmlid/user/luckDraw',//提交抽奖, ,用户id
  saveLuckDraw: qmUrl + '/qmlid/user/saveLuckDraw',// {userId,phone}领取10元,保存用户的中奖信息
  saveOrder:  qmUrl + '/qmlid/subscribe/save',//保存用户的预约试驾信息
  submitOrder: ftUrl + '/Openapi/postLead',//提交预约,
  getProvince: ftUrl + '/Openapi/SetClues/getCity1',//获取省份,
  getCity: ftUrl + '/Openapi/SetClues/getRegionCity',//获取城市,
  // getDealer: ftUrl + '/Openapi/SetClues/getDealer',//获取经销商,
  getDealer: ftUrl + '/Openapi/getDealer',//获取经销商,
}
{

}
