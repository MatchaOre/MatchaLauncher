import { createServer, IncomingMessage, ServerResponse } from "http";
import { AddressInfo } from "net";

const router = new Map<string, (req: IncomingMessage, res: ServerResponse) => void>();

export function addRouteHandler(path: string, 
    handler: (req: IncomingMessage, res: ServerResponse) => void){
        router.set(path, handler);
}

const server = createServer();

server.listen(0)

export const serverPort = (server.address() as AddressInfo).port;