const express = require('express')
const songartists = express.Router()
const songsController = require('./songsController.js')
const { getAllSongArtists, getSongArtist, deleteSongArtist, updateSongArtist, createSongArtist } = require('../queries/songartists')
const { checkArtist, checkAlbums, checkRoots, checkSunSign, checkNetWorth, checkOnTour, checkIsAlive, checkHasChildren, checkOfficialWebsite, checkSocialMedia } = require('../validations/checkSongartists')
songartists.use('/:songartist_id/songs', songsController)


songartists.get('/', async (req, res) => {
    const allSongArtists = await getAllSongArtists()
    if(allSongArtists[0]) {
        res.status(200).json(allSongArtists)
    } else {
        res.status(500).json({ error: 'Internal Service Error' })
    }
})

songartists.get('/:id', async (req, res) => {
    const { id } = req.params
    const singleSongArtist = await getSongArtist(id)
    if(singleSongArtist) {
        res.status(200).json(singleArtist)
    } else {
    res.status(404).json({ error: 'Song Not Found' })
    }
})

songartists.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deletedSongArtist = await deleteSongArtist(id)
    if(deletedSongArtist.id) {
        res.status(200).json({ message: 'Successfully Deleted Song' })
    } else {
        res.status(404).json({ error: 'Song Not Found' })
    }
})

songartists.put('/:id', 
    checkArtist, 
    checkAlbums, 
    checkRoots,
    checkSunSign,
    checkNetWorth,
    checkOnTour,
    checkIsAlive,
    checkHasChildren,
    checkOfficialWebsite,
    checkSocialMedia,
    async (req, res) => {
    const { id } = req.params
    const updatedSongArtist = await updateSongArtist(id, req.body)
    if(updatedSongArtist.id) {
        res.status(200).json(updatedSongArtist)
    } else {
        res.status(404).json({ error: 'Song Not Found' })
    }
})

songartists.post('/', 
    checkArtist, 
    checkAlbums, 
    checkRoots,
    checkSunSign,
    checkNetWorth,
    checkOnTour,
    checkIsAlive,
    checkHasChildren,
    checkOfficialWebsite,
    checkSocialMedia, async (req, res) => {
    const newSongArtist = await createSongArtist(req.body)
    res.json(newSongArtist)
})


module.exports = songartists