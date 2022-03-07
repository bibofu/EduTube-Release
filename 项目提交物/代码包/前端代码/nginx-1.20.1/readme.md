# nginx 代理
## func
负载均衡、请求转发、解决跨域、动静分离
## use
cmd 或 双击 打开 nginx.exe。
更新配置文件后需要重启。
## stop 
cmd 输入 nginx.exe -s stop
## config
### 1. 找到配置文件
> /conf/nginx.conf 文件

### 2. 开始配置
（1）修改默认端口
```
http{ 
    # 已修改配置端口
     server {
         listen 9001;
     }
}
```
（2）配置转发规则
在http{}中创建配置。
```conf
http{ 
    server{
        # 监听端口
        listen  9001;
        # 地址
        server_name  localhost;
        # 监听匹配转发
        # ~ /xx/ /xx/ 为匹配路径
        # proxy_pass 为转发地址
        location ~ /eduservice/    {
            proxy_pass http://localhost:8001;
        }
    }
}
```
