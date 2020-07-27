import axios from 'axios' //引入axios
import {
  Toast
} from 'vant' //引入Toast

function upLoaderFile(file, uploadUrl) { //file为 你读取成功的回调文件信息
  //new 一个FormData格式的参数
  const params = new FormData()
  params.append('file', file)
  let config = {
    headers: { //添加请求头
      'Content-Type': 'multipart/form-data'
    }
  }
  return new Promise((resolve, reject) => {
    axios.post(uploadUrl, params, config).then(res => {
      Toast.success(res.data)
      resolve(res.data)
    }).catch(err => {
      Toast.fail('上传失败')
      reject(err)
    });
  })
}
export default upLoaderFile
