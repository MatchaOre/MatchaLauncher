import { IncomingMessage, ServerResponse, createServer } from "http";
import { AddressInfo } from "net";

const urlMapper = new Map<string, (req: IncomingMessage, res: ServerResponse)=>void>();

const server = createServer((req,res) => {
    const route = urlMapper.get(req.url??"") ?? routeDefault;
    route.call(null, req, res);
});

function routeDefault(req: IncomingMessage,res: ServerResponse){
    res.writeHead(404, JSON.stringify(
        {
            error: "REQUEST_RESOURCE_NOT_FOUND",
            message: `No handler was found on this path.`
        }
    ), {
        server: "Matcha Launcher Internal WebServer Gateway",
        "x-api-path": req.url
    });
    res.end();6
}

try{
    server.listen(0);
}catch{

}

export function addRouteHandler(
    path: string, 
    handler: (req: IncomingMessage, res: ServerResponse) => void){
        urlMapper.set(path,handler)

}

export function getServerPort(): number {
    return (server.address() as AddressInfo).port;
}