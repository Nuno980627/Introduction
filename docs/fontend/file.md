# vue中下载文件使用 file-saver
file-saver文件保存控件
文件错误 excel无法打开
excel报错文件格式或文件名错误无法打开excel
```javascript
export function downloadImportTemplate() {
  return request({
    url: '/apptMember/importTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
```
在excel中加入   responseType: 'blob'解决