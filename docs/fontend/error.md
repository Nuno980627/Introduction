# git报错系列

## Failed to connect
在git与github同步（push or  requests 时）
报错------
Failed to connect to 127.0.0.1 port 1080: Connection refused

网上总体方案都是在
$ git config --global http.proxy
查看全局的gitconfig，删除里面的http proxy代理对象
多次尝试无果

解决方案 --
打开项目本身/.git/config
删除内部http代理，删除127.0.0.1这一段。
重新pull
弹出github的登入信息
解决-- 


*********有时候，推送的时候也会报Failed to connect to github.com port 443: Timed out，是github网络原因
稍后推送即可