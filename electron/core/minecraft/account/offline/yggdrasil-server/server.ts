import { appVersion } from "../../../../../main";
import { addRouteHandler, serverPort } from "../../../../network/http/server/http-server";

addRouteHandler("/api/yggdrasil", (_,res) => {
    
    // https://yushijinhun.github.io/authlib-injector/zh/Yggdrasil-服务端技术规范.html
    
    res.writeHead(200, JSON.stringify(
        {
            meta:{
                implementationName: "Yggdrasil",
                implementationVersion: appVersion,
                serverName: "Matcha Launcher Internal Yggdrasil Server",
                links:{
                    "homepage": "https://github.com/MatchaOre/MatchaLauncher"
                },
                "feature.non_email_login": true
            },
            skinDomains: [
                "localhost",
                "127.0.0.1",
                "littleskin.cn"
            ],
            signaturePublickey: ""
        }
    ));

    res.end()
});

