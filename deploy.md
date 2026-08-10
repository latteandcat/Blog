# 腾讯云轻量服务器自动部署方案

本文档适用于当前 VuePress 2 博客项目，部署目标为：

```text
https://blog.latteandcat.cn
```

推荐部署架构：

```text
push 到 GitHub main
        ↓
GitHub Actions：npm ci + npm run build
        ↓
rsync 上传 .vuepress/dist
        ↓
/var/www/blog/releases/<commit SHA>
        ↓ 原子切换软链接
/var/www/blog/current
        ↓
Nginx + HTTPS
        ↓
https://blog.latteandcat.cn
```

当前项目的 VuePress 配置没有设置 `base`，因此应部署在 `blog.latteandcat.cn` 的根路径，而不是 `latteandcat.cn/blog/`。VuePress 默认构建产物目录为 `.vuepress/dist`。

参考：[VuePress CLI 文档](https://v2.vuepress.vuejs.org/reference/cli)

## 1. 前提约定

本文档作如下假设：

- 腾讯云轻量应用服务器运行 Ubuntu。
- GitHub 源码仓库为 `latteandcat/Blog`。
- 发布分支为 `main`。
- 主站 `latteandcat.cn` 已按照原主页部署文档完成部署。
- 博客使用独立子域名 `blog.latteandcat.cn`。
- GitHub Actions 负责构建，腾讯云服务器只保存和提供静态文件。

服务器不需要安装 Node.js、npm、数据库、Docker 或 PM2。

## 2. 配置 DNS 和防火墙

在 DNSPod 或域名服务商处添加或更新：

| 主机记录 | 类型 | 值 |
| --- | --- | --- |
| `blog` | A | 腾讯云服务器公网 IPv4 |

如果存在指向旧服务器的 `blog` AAAA 记录，而新服务器没有配置 IPv6，应删除或更新该记录。

在腾讯云轻量应用服务器的“防火墙”页面开放：

| 端口 | 来源 | 用途 |
| --- | --- | --- |
| TCP 22 | 建议限制为自己的公网 IP，例如 `1.2.3.4/32` | SSH |
| TCP 80 | `0.0.0.0/0` | HTTP、证书验证 |
| TCP 443 | `0.0.0.0/0` | HTTPS |

不要放通全部端口。腾讯云轻量服务器防火墙等同于 CVM 安全组，应遵循最小授权原则。

参考：[腾讯云轻量服务器防火墙文档](https://cloud.tencent.com/document/product/1207/44577/)

在本地 PowerShell 中检查解析：

```powershell
nslookup blog.latteandcat.cn
```

结果应当是新服务器的公网 IPv4。

## 3. 初始化 Ubuntu

登录服务器：

```powershell
ssh ubuntu@服务器公网IP
```

如果腾讯云镜像使用 root 用户：

```powershell
ssh root@服务器公网IP
```

安装基础软件：

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y nginx rsync curl ufw
sudo timedatectl set-timezone Asia/Shanghai
```

启动并启用 Nginx：

```bash
sudo systemctl enable --now nginx
sudo systemctl status nginx --no-pager
```

配置 Ubuntu 自身防火墙。必须先允许 SSH，再启用 UFW：

```bash
sudo ufw allow OpenSSH
sudo ufw allow "Nginx Full"
sudo ufw enable
sudo ufw status
```

如果服务器已经为主站安装了 Nginx、rsync、curl、UFW，可以跳过已完成的命令。

## 4. 创建无 sudo 权限的部署用户

GitHub Actions 不使用 root 或日常登录账号，而是使用专门的 `deploy` 用户：

```bash
sudo adduser --disabled-password --gecos "" deploy

sudo install -d -m 700 \
  -o deploy -g deploy \
  /home/deploy/.ssh

sudo install -d -m 2755 \
  -o deploy -g www-data \
  /var/www/blog \
  /var/www/blog/releases
```

创建临时页面，供配置 Nginx 和首次申请证书时使用：

```bash
sudo install -d -m 2755 \
  -o deploy -g www-data \
  /var/www/blog/releases/bootstrap

echo '<!doctype html><html><body>Blog deployment initializing.</body></html>' \
  | sudo tee /var/www/blog/releases/bootstrap/index.html >/dev/null

sudo chown deploy:www-data \
  /var/www/blog/releases/bootstrap/index.html

sudo chmod 644 \
  /var/www/blog/releases/bootstrap/index.html

sudo -u deploy ln -sfnT \
  /var/www/blog/releases/bootstrap \
  /var/www/blog/current
```

检查：

```bash
ls -la /var/www/blog
ls -la /var/www/blog/current/
```

## 5. 配置 Nginx

创建博客站点配置：

```bash
sudo nano /etc/nginx/sites-available/blog.latteandcat.cn
```

粘贴以下内容：

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name blog.latteandcat.cn;

    root /var/www/blog/current;
    index index.html;

    # 支持 /timeline、/categories/DRL/1 等 VuePress 无扩展名地址。
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # VuePress/Vite 构建出的带哈希静态资源。
    location /assets/ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 允许 Let's Encrypt，拒绝访问其他隐藏文件。
    location ~ /\.(?!well-known).* {
        deny all;
    }

    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    access_log /var/log/nginx/blog.latteandcat.access.log;
    error_log  /var/log/nginx/blog.latteandcat.error.log;
}
```

启用配置：

```bash
sudo ln -s \
  /etc/nginx/sites-available/blog.latteandcat.cn \
  /etc/nginx/sites-enabled/blog.latteandcat.cn

sudo nginx -t
sudo systemctl reload nginx
```

必须看到：

```text
syntax is ok
test is successful
```

不要删除或覆盖主站 `latteandcat.cn` 的 Nginx 配置。

测试 HTTP：

```bash
curl -I -H "Host: blog.latteandcat.cn" http://127.0.0.1
curl -I http://blog.latteandcat.cn
```

## 6. 配置 HTTPS

确保以下条件已经满足：

- `blog.latteandcat.cn` 已解析到当前服务器。
- 腾讯云防火墙开放 TCP 80 和 443。
- UFW 允许 `Nginx Full`。
- HTTP 地址可以从公网访问。

如果服务器尚未安装 Certbot：

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/local/bin/certbot
```

如果最后一条命令提示软链接已经存在，可以忽略。

申请证书，将邮箱替换为自己的邮箱：

```bash
sudo certbot --nginx \
  -d blog.latteandcat.cn \
  --redirect \
  --agree-tos \
  --no-eff-email \
  -m 你的邮箱地址
```

检查 HTTPS 和证书续期：

```bash
sudo nginx -t
curl -I https://blog.latteandcat.cn
sudo certbot renew --dry-run
systemctl list-timers | grep certbot
```

参考：[Certbot Nginx 安装说明](https://certbot.eff.org/instructions?os=ubuntufocal&ws=nginx)

## 7. 创建 GitHub Actions 专用 SSH 密钥

在本地 PowerShell 中执行：

```powershell
ssh-keygen `
  -t ed25519 `
  -C "github-actions-blog" `
  -f "$env:USERPROFILE\.ssh\blog_deploy"
```

此密钥不要设置密码，因为 GitHub Actions 无法交互输入。

生成两个文件：

```text
%USERPROFILE%\.ssh\blog_deploy       私钥，必须保密
%USERPROFILE%\.ssh\blog_deploy.pub   公钥
```

显示公钥：

```powershell
Get-Content "$env:USERPROFILE\.ssh\blog_deploy.pub"
```

登录服务器并编辑授权文件：

```bash
sudo nano /home/deploy/.ssh/authorized_keys
```

粘贴公钥，并在公钥开头增加 `restrict`：

```text
restrict ssh-ed25519 AAAA...... github-actions-blog
```

然后设置权限：

```bash
sudo chown -R deploy:deploy /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

`deploy` 用户不应加入 `sudo` 组。

从本地测试部署用户：

```powershell
ssh `
  -i "$env:USERPROFILE\.ssh\blog_deploy" `
  deploy@服务器公网IP `
  "whoami && test -w /var/www/blog/releases && echo OK"
```

预期输出：

```text
deploy
OK
```

## 8. 记录并验证服务器主机指纹

不要让 GitHub Actions 直接信任未经验证的 `ssh-keyscan` 结果。

先在服务器上查看真实指纹：

```bash
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

然后在本地 PowerShell 中执行：

```powershell
ssh-keyscan -t ed25519 服务器公网IP |
  Set-Content -Encoding ascii .\blog_known_hosts

ssh-keygen -lf .\blog_known_hosts
```

确认本地输出的指纹与服务器输出的指纹完全一致。

## 9. 设置 GitHub Actions Secrets

进入 GitHub 仓库：

```text
Settings
→ Secrets and variables
→ Actions
```

在 `Variables` 中添加：

```text
名称：DEPLOY_HOST
值：服务器公网IP
```

在 `Secrets` 中添加以下两个 Secret。

### 9.1 DEPLOY_SSH_KEY

值为私钥全文，可在本地读取：

```powershell
Get-Content "$env:USERPROFILE\.ssh\blog_deploy" -Raw
```

内容应包括首尾标记：

```text
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

### 9.2 DEPLOY_KNOWN_HOSTS

值为经过指纹验证的 `known_hosts` 内容：

```powershell
Get-Content .\blog_known_hosts -Raw
```

不要把私钥、服务器密码或任何 Secret 提交到 Git 仓库。

参考：[GitHub Actions Secrets 文档](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)

## 10. 添加自动部署工作流

在项目中创建：

```text
.github/workflows/deploy.yml
```

文件内容：

```yaml
name: Deploy blog

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: blog-production
  cancel-in-progress: false

jobs:
  deploy:
    name: Build and deploy
    runs-on: ubuntu-latest

    environment:
      name: production
      url: https://blog.latteandcat.cn

    env:
      DEPLOY_HOST: ${{ vars.DEPLOY_HOST }}
      DEPLOY_USER: deploy
      DEPLOY_ROOT: /var/www/blog

    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Set up Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build VuePress
        run: npm run build

      - name: Verify build
        run: test -s .vuepress/dist/index.html

      - name: Configure SSH
        env:
          DEPLOY_SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}
          DEPLOY_KNOWN_HOSTS: ${{ secrets.DEPLOY_KNOWN_HOSTS }}
        run: |
          set -euo pipefail

          install -m 700 -d "$HOME/.ssh"

          printf '%s\n' "$DEPLOY_SSH_KEY" \
            > "$HOME/.ssh/id_ed25519"

          printf '%s\n' "$DEPLOY_KNOWN_HOSTS" \
            > "$HOME/.ssh/known_hosts"

          chmod 600 "$HOME/.ssh/id_ed25519"
          chmod 600 "$HOME/.ssh/known_hosts"

      - name: Upload and activate release
        run: |
          set -euo pipefail

          REMOTE="${DEPLOY_USER}@${DEPLOY_HOST}"
          RELEASE_DIR="${DEPLOY_ROOT}/releases/${GITHUB_SHA}"

          SSH_OPTIONS=(
            -i "$HOME/.ssh/id_ed25519"
            -o BatchMode=yes
            -o StrictHostKeyChecking=yes
          )

          ssh "${SSH_OPTIONS[@]}" "$REMOTE" \
            "mkdir -p '${RELEASE_DIR}'"

          rsync \
            -az \
            --delete \
            --chmod=D755,F644 \
            -e "ssh -i $HOME/.ssh/id_ed25519 -o BatchMode=yes -o StrictHostKeyChecking=yes" \
            .vuepress/dist/ \
            "${REMOTE}:${RELEASE_DIR}/"

          PREVIOUS_TARGET="$(
            ssh "${SSH_OPTIONS[@]}" "$REMOTE" \
              "readlink -f '${DEPLOY_ROOT}/current' || true"
          )"

          ssh "${SSH_OPTIONS[@]}" "$REMOTE" \
            "test -s '${RELEASE_DIR}/index.html' && \
             ln -sfnT '${RELEASE_DIR}' '${DEPLOY_ROOT}/current'"

          if ! curl \
            --fail \
            --silent \
            --show-error \
            --location \
            --retry 5 \
            --retry-all-errors \
            --max-time 20 \
            https://blog.latteandcat.cn/ \
            >/dev/null
          then
            echo "Health check failed; rolling back."

            if [ -n "$PREVIOUS_TARGET" ]; then
              ssh "${SSH_OPTIONS[@]}" "$REMOTE" \
                "ln -sfnT '${PREVIOUS_TARGET}' '${DEPLOY_ROOT}/current'"
            fi

            exit 1
          fi

          ssh "${SSH_OPTIONS[@]}" "$REMOTE" \
            "find '${DEPLOY_ROOT}/releases' \
               -mindepth 1 -maxdepth 1 -type d \
               -printf '%T@ %p\n' |
             sort -nr |
             tail -n +6 |
             cut -d' ' -f2- |
             xargs -r rm -rf"
```

该工作流只使用 GitHub 官方的 `actions/checkout` 和 `actions/setup-node`，SSH 与 rsync 部署使用系统命令，避免向不必要的第三方 Action 提供服务器私钥。

参考：

- [GitHub Actions 安全建议](https://docs.github.com/en/actions/reference/security/secure-use)
- [GitHub Actions 部署与并发控制](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments)

## 11. 第一次执行自动部署

在本地项目目录提交工作流：

```powershell
git add .github/workflows/deploy.yml
git commit -m "ci: add production deployment workflow"
git push origin main
```

然后进入 GitHub：

```text
Actions → Deploy blog
```

确认以下步骤全部成功：

- Checkout
- Set up Node.js
- Install dependencies
- Build VuePress
- Verify build
- Configure SSH
- Upload and activate release

如果不想立即提交代码，也可以在工作流文件已经存在后，通过 `workflow_dispatch` 在 GitHub Actions 页面手动执行。

## 12. 上线验收

在本地检查 HTTP 和 HTTPS：

```powershell
curl.exe -I http://blog.latteandcat.cn
curl.exe -I https://blog.latteandcat.cn
```

依次在浏览器中访问：

```text
https://blog.latteandcat.cn/
https://blog.latteandcat.cn/timeline
https://blog.latteandcat.cn/categories/DRL/1
https://blog.latteandcat.cn/docs/frontend2019/html5-semantic
```

验收内容：

- HTTP 自动跳转到 HTTPS。
- 浏览器显示安全锁标志。
- 首页 Logo、头像、背景、字体和图标正常。
- 分类、标签、时间轴正常。
- 文章页面可以打开。
- 上述无 `.html` 地址直接打开和刷新都正常。
- 主站 `https://latteandcat.cn` 不受影响。
- ICP 和公安备案链接正常。

## 13. 后续自动部署流程

以后只需要把博客修改推送到 `main`：

```powershell
git push origin main
```

GitHub Actions 会自动：

1. 使用 `npm ci` 安装锁定依赖。
2. 执行 `npm run build`。
3. 检查 `.vuepress/dist/index.html`。
4. 上传到以 Git commit SHA 命名的新目录。
5. 原子切换 `/var/www/blog/current` 软链接。
6. 请求线上 HTTPS 地址进行健康检查。
7. 健康检查失败时自动恢复之前的软链接。
8. 部署成功后只保留最近五个版本。

静态文件更新不需要重启或重新加载 Nginx。

## 14. 查看版本和手动回滚

查看当前线上版本：

```bash
readlink -f /var/www/blog/current
```

查看可回滚版本：

```bash
ls -1dt /var/www/blog/releases/*
```

手动回滚到指定提交：

```bash
sudo -u deploy ln -sfnT \
  /var/www/blog/releases/需要恢复的提交SHA \
  /var/www/blog/current
```

回滚后检查：

```bash
readlink -f /var/www/blog/current
curl -I https://blog.latteandcat.cn
```

手动回滚同样不需要重启 Nginx。

## 15. 常见故障排查

### 15.1 GitHub Actions SSH 连接失败

检查：

- `DEPLOY_HOST` 是否为正确的公网 IP。
- 腾讯云防火墙是否允许 GitHub Actions 访问 TCP 22。
- UFW 是否允许 OpenSSH。
- `DEPLOY_SSH_KEY` 是否包含完整私钥。
- `DEPLOY_KNOWN_HOSTS` 是否对应当前服务器。
- `/home/deploy/.ssh/authorized_keys` 权限是否正确。

查看服务器 SSH 日志：

```bash
sudo journalctl -u ssh -n 100 --no-pager
```

### 15.2 rsync 提示 Permission denied

检查目录权限：

```bash
ls -ld /var/www/blog
ls -ld /var/www/blog/releases
sudo -u deploy test -w /var/www/blog/releases && echo writable
```

修复权限：

```bash
sudo chown deploy:www-data /var/www/blog /var/www/blog/releases
sudo chmod 2755 /var/www/blog /var/www/blog/releases
```

### 15.3 首页正常，但刷新文章或分类页面出现 404

检查 Nginx 中是否包含：

```nginx
try_files $uri $uri/ $uri.html =404;
```

然后执行：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 15.4 HTTPS 证书申请失败

检查：

```bash
nslookup blog.latteandcat.cn
curl -I http://blog.latteandcat.cn
sudo ss -lntp | grep -E ':80|:443'
```

常见原因：

- DNS 还未生效。
- A 记录仍然指向旧服务器。
- 存在错误的 AAAA 记录。
- 腾讯云防火墙未开放 TCP 80。
- UFW 未允许 Nginx。

### 15.5 出现 Nginx 欢迎页或错误站点

查看当前启用的配置：

```bash
ls -la /etc/nginx/sites-enabled
sudo nginx -T | grep -n "server_name"
```

确认 `blog.latteandcat.cn` 只匹配博客对应的 `server` 块。

### 15.6 查看 Nginx 日志

```bash
sudo systemctl status nginx --no-pager
sudo journalctl -u nginx -n 100 --no-pager
sudo tail -n 100 /var/log/nginx/blog.latteandcat.error.log
sudo tail -n 100 /var/log/nginx/blog.latteandcat.access.log
```

## 16. 目录关系

最终服务器目录结构类似：

```text
/var/www/
├── latteandcat/                  主站静态文件
└── blog/
    ├── current -> releases/<SHA> 当前博客版本
    └── releases/
        ├── <SHA-1>/
        ├── <SHA-2>/
        └── <SHA-3>/
```

主站继续由原来的 Nginx `server` 块和 `/var/www/latteandcat` 提供服务；博客使用独立的 `server` 块和 `/var/www/blog/current`，两者互不覆盖。
