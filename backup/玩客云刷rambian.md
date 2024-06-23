一、玩客云硬件参数
CPU是晶晨S805 ，32位，ARM 4核1.5GHz
1G(DDR3)+8G(eMMC)
两个USB 2.0，HDMI接口，一个千兆网口（RJ45 ）
二、刷机准备工具
WIN10电脑一台
矿渣玩客云
双公头USB线一根【用于连接电脑和玩客云，用于刷底层包】
螺丝刀，一把金属镊子，用来短接用（用金属线也是可以的）
闲置 U 盘一个，或者读卡器配合存储卡也行【U盘用于刷 Armbian 系统】
晶晨刷机软件 USB Burning Tool，update.img 文件为安卓底包，zip 文件为 armbian 固件
三、刷机包基本常识
1、直刷包：直接刷，刷完就OK可以直接使用

优点：

（1）方便快捷，不用U盘等工具

（2）速度快，省去中间过程

缺点：

（1）再次刷机可能需要重新短接

（2）换系统可能需要重新对emmc进行大量读写

2、底包：用于对设备进行引导，引导设备启动USB设备上的系统（类似于PE系统），一般搭配U盘刷机包使用

优点：
（1）可以随便换系统，一个U盘一个系统

（2）在没将系统输入emmc之前可以不用拆机

缺点：

（1）系统性能受限于USB设备与接口，稳定性难绷（USB2.0的接口我也不好说什么了）

（2）占用一个USB接口

注：如果你将U盘内系统写入emmc的话那基本和直刷包没区别了

3、镜像包：直刷包的内包含了系统镜像，直刷直用

底包和系统镜像分离，底包包含引导，镜像包包含系统镜像，镜像包也就是U盘刷机包

4、选择：如果你身边没有U盘等设备，那肯定只有用直刷包了

当然如果你选择的固件只有U盘刷机包那种，那也只能找一个U盘了

如果你的数据线或者因为成色而导致直刷用的那个USB接口不稳定，那建议用刷底包的方式
底包因为只包含引导或者部分驱动会刷得很快，而直刷包就需要一个漫长的过程，如果不稳定的话
就会导致刷机失败以至于要重新刷，那就得不偿失了

同样的，如果你用来U盘引导的那个接口不稳定（用来直刷和引导系统的那个接口不一样）
所以没有哪个更好的说法，全部看实际情况和你选择的固件包

四、刷机教程
1、拆机及注意
玩客云的拆机十分简单，有接口那一侧，外层塑料挡板是双面胶粘上去的，使用撬棒或者一字批起子之类，从缝隙入手，慢慢转圈撬开即可，挡板弹性挺大， 并不容易搞坏。

然而二层挡板就是 6 颗螺丝下掉完事，主板是卡在壳子的卡槽里的，可以捏住 SD 卡槽部分的主板空白位，用点力即可把主板拔出来。
直刷包地址

`https://github.com/hzyitc/armbian-onecloud/releases`
四、修改静态ip
1、修改文件 # nano /etc/network/interfaces
2、修改如下：

```
# Wired adapter #1
#allow-hotplug eth0
#no-auto-down eth0
# iface eth0 inet dhcp
auto eth0
iface eth0 inet static
address 192.168.1.253
netmask 255.255.255.0
gateway 192.168.1.1
dns-nameservers 8.8.8.8 114.114.114.114
hwaddress 12:34:56:78:9A:BC
```
五、安装Docker
1、换Debian源

```
mv /etc/apt/sources.list /etc/apt/sources.list.bk
nano /etc/apt/sources.list
```
2、粘贴

```
deb https://mirrors.ustc.edu.cn/debian/ bullseye main non-free contrib
deb-src https://mirrors.ustc.edu.cn/debian/ bullseye main non-free contrib
deb https://mirrors.ustc.edu.cn/debian-security/ bullseye-security main
deb-src https://mirrors.ustc.edu.cn/debian-security/ bullseye-security main
deb https://mirrors.ustc.edu.cn/debian/ bullseye-updates main non-free contrib
deb-src https://mirrors.ustc.edu.cn/debian/ bullseye-updates main non-free contrib
deb https://mirrors.ustc.edu.cn/debian/ bullseye-backports main non-free contrib
deb-src https://mirrors.ustc.edu.cn/debian/ bullseye-backports main non-free contrib
```
可以进入[清华大学Debian软件源官网](https://mirrors.tuna.tsinghua.edu.cn/help/debian/)定制源
2024-04-20T02:55:48.png

更新源报错的解决方法

`（E: The repository 'http://apt.armbian.com stretch Release' does not have a Release file.）`
编辑 nano /etc/apt/sources.list.d/armbian.list，将 http://apt.armbian.com/ 替换为以下链接

`https://mirrors.tuna.tsinghua.edu.cn/armbian`
或者可以由以下命令完成

`sed -i.bak 's#http://apt.armbian.com#https://mirrors.tuna.tsinghua.edu.cn/armbian#g' /etc/apt/sources.list.d/armbian.list`
3、保存并更新软件

`apt-get update && apt-get upgrade`
4、安装Docker
docker和iptables不兼容，建议安装前执行

```
update-alternatives --set iptables /usr/sbin/iptables-legacy
update-alternatives --set ip6tables /usr/sbin/ip6tables-legacy
```
如果报错：update-alternatives: error: no alternatives for iptables
尝试更新iptables再执行以上两行命令

`apt install iptables`
完成之后，执行Docker安装可视化一键脚本

`bash <(curl -sSL https://linuxmirrors.cn/docker.sh)`
5、安装Docker面板

```docker run -d --restart=always --name="portainer" -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data 6053537/portainer-ce:2.19.0@sha256:df464e724255c2c3db304b343bec82d4510e507c77893e8ed61e122b9fa42bf1```
六、安装FRPC客户端内网穿透
1、创建frp.ini文件并创建目录

```
mkdir /frp
vim /frp/frpc.ini
```
2、编辑frpc.ini配置文件

```
[common]
server_addr = x.x.x.x
server_port = 7000
token = XXXXX

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000
```
3、拉取镜像

`docker pull snowdreamtech/frpc`
4、启动docker容器

`docker run --restart=always --network host -d -v /frp/frpc.ini:/etc/frp/frpc.ini --name frpc snowdreamtech/frpc`
七、永久性挂载硬盘
1、查看硬盘名称

`fdisk -l`
查看刚刚接入的U盘/硬盘并记下其设备名称
2024-04-20T03:01:12.png
Device：对应硬盘名称 -Size：对应硬盘大小- Type：对应硬盘格式

2、格式化硬盘
Linux硬盘格式需要Etx4,我这个硬盘已经格式化了，再演试一次，使用命令：

`mkfs -t ext4 /dev/sda1  #格式化硬盘选择ext4文件系统`
此过程会提示Proceed anyway? (y,N)，问你是否继续格式化，输入y回车继续，后面提示其它回车就OK
2024-04-20T03:02:08.png
3、挂载硬盘/U盘
接下来开始挂载硬盘，查看硬盘的UUID，输入：

`blkid 硬盘名称（例如blkid /dev/sda1）`
UUID="这里面就是UUID"复制下来
2024-04-20T03:02:50.png
使用ftp工具连接玩客云找到/etc/fstab文件打开编辑（我使用的finalshell自带ftp工具，如果你装了宝塔直接在宝塔文件里找也可以，当然你也可以使用VI命令行直接编辑）

在fstab文件后面追加：

`UUID=改为你的硬盘UUID   /mnt/随便命名后面创建对应的文件夹最好时英文/   ext4    defaults    0 0`
2024-04-20T03:03:15.png
编辑后保存上传回去，在/mnt/文件夹下创建你刚刚设置的文件夹名称，例如我刚刚设置的是/mnt/Disk，就创建一个Disk文件夹

回到命令行窗口输入reboot重启玩客云，等1-2分钟重启成功

进行完全部步骤以后你可能会发现，玩客云的指示灯为什么是红色的？？？
google 了一圈，查到这是正常现象，镜像的问题，不过并不影响使用。
觉得红灯碍眼，可以 ssh 进去后运行

```
echo "default-on" >/sys/class/leds/onecloud\:blue\:alive/trigger
echo "none" >/sys/class/leds/onecloud\:green\:alive/trigger
echo "none" >/sys/class/leds/onecloud\:red\:alive/trigger
```
就变成蓝灯常量了chmod +x /etc/rc.local && nano /etc/rc.local 想开机设置加到 rc.local 里就行