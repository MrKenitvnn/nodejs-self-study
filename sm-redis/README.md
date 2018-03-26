
### Cài đặt Redis

#### MacOS

>$ brew install redis

Tự động chạy Redis khi mở máy
>$ ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents

Tắt chế độc tự động chạy Redis khi mở máy
>$ launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

Start Redis sử dụng ```launchctl```
>$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

Start Redis sử dụng file config
>$ redis-server /usr/local/etc/redis.conf

Redis configuration file
> /usr/local/etc/redis.conf

Gõ bỏ Redis và các file
>$ brew uninstall redis
>$ rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

Test xem Redis server đang chạy không
>$ redis-cli ping


