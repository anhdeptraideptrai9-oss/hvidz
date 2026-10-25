{
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "port": 10808,
      "protocol": "socks",
      "settings": {
        "auth": "noauth",
        "udp": true
      },
      "tag": "socks-in"
    },
    {
      "port": 10809,
      "protocol": "http",
      "tag": "http-in"
    }
  ],
  "outbounds": [
    {
      "protocol": "hysteria",
      "settings": {
        "address": "wraith2.trollmodz.store",
        "port": 443,
        "version": 2
      },
      "streamSettings": {
        "network": "hysteria",
        "security": "tls",
        "tlsSettings": {
          "serverName": "wraith2.trollmodz.store",
          "alpn": ["h3"]
        },
        "hysteriaSettings": {
          "auth": "TRLL-A40E-7AFC-5EC9.1792863006.42d8200aba6d0af91a7f5f50758a029d",
          "version": 2,
          "up": "50 mbps",
          "down": "100 mbps",
          "fakeHwid": "UL50105W7N0TVAAN"
        }
      },
      "tag": "proxy",
      "remarks": "NovaX by - hvidzios"
    },
    {
      "protocol": "freedom",
      "tag": "direct"
    },
    {
      "protocol": "blackhole",
      "tag": "block"
    }
  ],
  "routing": {
    "domainStrategy": "IPIfNonMatch",
    "rules": [
      {
        "type": "field",
        "outboundTag": "proxy",
        "domain": [
          "full:clientbp.ggpolarbear.com",
          "full:loginbp.ggpolarbear.com",
          "full:core-bs.ggpolarbear.com",
          "full:core-bs.freefiremobile.com",
          "full:core-tata.freefireind.in",
          "full:core-gmc.freefiremobile.com",
          "full:client.ind.freefiremobile.com",
          "full:client.us.freefiremobile.com",
          "full:sgnetwork.ggblueshark.com",
          "full:menetwork.ggblueshark.com",
          "full:bdnetwork.ggpolarbear.com",
          "full:100067.connect.garena.com",
          "full:100067.msdk.garena.com",
          "full:clientbp.ppmainecoonghj.com",
          "full:loginbp.ppmainecoonghj.com",
          "full:gin.freefireind.in",
          "full:gin.freefiremobile.com",
          "full:vodka.freefireind.in",
          "full:dl.castle.freefiremobile.com",
          "full:dl.cdn.freefiremobile.com",
          "full:dl-core.cdn.freefiremobile.com",
          "full:dl.gmc.freefiremobile.com",
          "full:dl.aw.freefiremobile.com",
          "full:dl.dir.freefiremobile.com",
          "full:dl.bs.freefiremobile.com",
          "full:dl.ak.freefiremobile.com",
          "full:dl-sg-production.freefiremobile.com",
          "full:dl-tata.freefireind.in",
          "full:dl-bs.ggpolarbear.com",
          "domain:freefiremobile-a.akamaihd.net"
        ]
      }
    ]
  },
  "remarks": "NovaX by - hvidzios"
}
