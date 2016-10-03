'use strict'
const util = require('util'),
    Stream = require('stream').Writable,
    nodemailer = require('nodemailer'),
    Levels = {
        10: 'TRACE',
        20: 'DEBUG',
        30: 'INFO',
        40: 'WARN',
        50: 'ERROR',
        60: 'FATAL'
    }
const telegram = require('telegram-bot-api')
class BunyanTelegramBote extends Stream {

    constructor(token, config){
        super()
        this.config = config
        this.api = new telegram({ token: token })
        // this.api = new telegram({token: '256145359:AAEvGvAvqX2ZRcTrjITFwjB7SOh83FIPqO8'})
    }

    /**
     * Format Subject
     */
    _formatSubject(log) {
        return util.format(
            '[%s] %s/%s on %s',
            Levels[log.level] || 'LVL' + log.level,
            log.name,
            log.pid,
            log.hostname
        )
    }

    /**
     * Format Body
     */
    _formatBody(log) {
        var rows = [];
        rows.push('* name: ' + log.name);
        rows.push('* hostname: ' + log.hostname);
        rows.push('* pid: ' + log.pid);
        rows.push('* time: ' + log.time);

        if (log.msg) {
            rows.push('* msg: \n' + log.msg);
        }

        if (log.err) {
            rows.push('* err.stack: ' + log.err.stack);
        }

        return rows.join('\n');
    }

    /**
     * Write Stream
     */
    write(log) {
      this.api.sendMessage({ chat_id: this.config.chat_id, text:log })
    }
}

module.exports = BunyanNodeMailer
