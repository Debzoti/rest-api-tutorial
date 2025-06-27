import logger from "pino";
import dayjs from "dayjs";


const log = logger({
    transport: {
        target: "pino-pretty",
        options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
        },
    },
    base: {
        pid: false,
        hostname: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,

})

export default log;