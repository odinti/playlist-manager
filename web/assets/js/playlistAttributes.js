export const playlistAttributes = {
    computed: {
        playlist () {
            return this.$store.state.sinusbot.queue
        },
        playlistLength () {
            return this.playlist.length
        },
        isPlaylistEmpty () {
            return this.playlistLength === 0
        }
    }
}
