registerPlugin({
    name: 'Playlist Manager',
    version: '1.0',
    description: 'Create your queue with easy and fast input gestures!',
    author: 'Odynn Aguilar <admin@kaoz.space>',
    enableWeb: true,
    requiredModules: [
        'ws'
    ],
    vars: []
}, function (sinusbot, config) {
    var ws = require('ws')
    var engine = require('engine')
    var event = require('event')
    var media = require('media')
    var broadcastState = function (write) {
        var currentTrack = media.getCurrentTrack()
        var queue = media.getQueue()
        var data = {
            currentTrack: currentTrack ? {
                title: currentTrack.title()
            } : null,
            queue: queue.map(function (track) {
                return {
                    title: track.title()
                }
            })
        }
        if (write) {
            ws.write(write, 1, {
                event: 'STATE',
                data: data
            })
        } else {
            ws.broadcast(1, {
                event: 'STATE',
                data: data
            });
        }
    }

    event.on('ws.connect', function (id) {
        broadcastState(id)
    });

    event.on('ws.disconnect', function (id) {
        //
    });

    event.on('ws.data', function (id, type, data) {
        var event = JSON.parse(data)
        engine.log('received event: ' + event.event)
        switch (event.event) {
            case "QUEUE":
                media.enqueueYt(event.data.url)
                break;
            case "NOW":
                media.yt(event.data.url)
                break;
            case "REMOVE":
                media.removeFromQueue(event.data.index)
                broadcastState()
                break;
            case "NEXT":
                media.playNext()
                setTimeout(function () {
                    broadcastState()
                }, 500)
                break;
            case "CLEAR":
                media.clearQueue()
                media.stop()
                broadcastState()
                break;
        }
    });

    event.on('ytdl.success', function () {
        setTimeout(function () {
            broadcastState()
        }, 500)
    })

    event.on('trackEnd', function () {
        setTimeout(function () {
            broadcastState()
        }, 500)
    })
});