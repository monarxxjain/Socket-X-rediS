import {Server} from 'socket.io'
import { Redis } from 'ioredis';

const pub = new Redis({
    host: 'redis-14882.c321.us-east-1-2.ec2.cloud.redislabs.com',
    port: 14882,
    username: 'default',
    password: 'ydQ7OinuFTB81DIXAap17rGo7pHSXwgi'
});
const sub = new Redis({
    host: 'redis-14882.c321.us-east-1-2.ec2.cloud.redislabs.com',
    port: 14882,
    username: 'default',
    password: 'ydQ7OinuFTB81DIXAap17rGo7pHSXwgi'
})

class SocketService {
    private _io: Server;

    constructor(){
        console.log("Init Socket Service...")
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*'
            }
        });
        sub.subscribe('MESSAGES');
    }

    public initListeners(){
        const io = this.io;
        console.log("Init Socket Listeners...");

        io.on('connect', (socket) => {
            console.log(`New Socket Connected`, socket.id);
            socket.on('event:message', async({message}: {message: string}) => {
                console.log("New Message Received", message);
                // Publish this message to REDIS
                await pub.publish('MESSAGES', JSON.stringify({ message }));
            })
        })

        sub.on('message', (channel, message) => {
            if(channel === 'MESSAGES'){
                io.emit('message', message)
            }
        })
    }

    get io(){
        return this._io;
    }
}

export default SocketService;