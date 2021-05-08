# ssh_key
Github 最近好像去除了版本控制时拉取推送时账号密码登入方式，
统一采用ssh-key的方式。

## 查询是否已有
```javascript
//git bash
ls -al ~/.ssh 
```
终端出现文件id_rsa.pub 或 id_dsa.pub，则表示该电脑已经存在SSH Key
如果已有可直接查看

## 生成
```javascript
//git bash
ssh-keygen -t rsa -C "your_full_name@xxxxx.com"
```

## 设置passphrase(可跳过)
```javascript
//版本控制时需要输入的key
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]
```

## 查看

C盘>User>user name>.ssh>id_rsa.pub

## giuhub 设置
github用户>settings>ssh>new一个
参考如下

https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account