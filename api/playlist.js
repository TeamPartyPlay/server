const express = require('express');
const tokenAuth = require('middleware/tokenAuth');
const eventAuth = require('middleware/eventAuth');
const PlaylistModel = require('models/Playlist');
const TrackModel = require('models/Track');

const router = express.Router();

router.use(tokenAuth);

/**
 * |Method|Endpoint|Usage|Returns
 * |-|-|-|-|
 * |GET   | `/api/playlist`        | Get current playlist      | Playlist
 * |GET   | `/api/playlist/:id`    | Get a playlist by id      | Playlist
 * |GET   | `/api/playlist/stream` | Stream the playlist       | Stream of Playlist
 * |POST  | `/api/playlist`        | Start new Playlist        | Playlist
 * |POST  | `/api/playlist/vote`   | Vote on track             | Track
 * |POST  | `/api/playlist/add     | Add Song to Playlist      | Playlist
 * |POST  | `/api/playlist/remove` | Remove Song from Playlist | Playlist
 * |DELETE| `/api/playlist/:id`    | Delete a playlist         |
 */
/**
 * Get the Playlist of the current Event
 * @param {express.Request} req Express Request with User and Event
 * @param {express.Response} res Express Response
 * @returns {express.Response} Express Response
 */
const getCurrentPlaylist = (req, res) => res.send(req.event.playlist);

router.get('/', eventAuth, getCurrentPlaylist);

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await PlaylistModel.findById(id);
    return res.send(event.playlist);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post('/', eventAuth, async (req, res) => {
  const { event } = req;
  const { spotifyId, tracks } = req.body;
  const newTracks = [];
  try {
    if (tracks) {
      if (Array.isArray(tracks)) {
        tracks.forEach(async ({ uri, votes }) => {
          const track = new TrackModel({
            uri,
            votes,
          });
          await track.save();
          newTracks.push(track);
        });
      } else {
        const track = new TrackModel({
          uri: tracks.uri,
          votes: tracks.votes,
        });
        await track.save();
        newTracks.push(track);
      }
    }
    const playlist = new PlaylistModel({
      spotifyId,
      tracks: newTracks,
    });
    await playlist.save();
    event.playlist = playlist;
    await event.save();
    return res.send(playlist);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post('/vote', eventAuth, async (req, res) => {
  const { event, user } = req;
  const { playlist } = event;
  const { id } = req.body;
  if (playlist) {
    const track = await TrackModel.findById(id);
    console.log(track);
    track.votes = [...track.votes, user._id];
    await track.save();
    return res.send(track);
  }
  return res.status(500).send({ error: 'Event does not contain playlist' });
});

router.post('/add', eventAuth, async (req, res) => {
  const { event } = req;
  const { playlist } = event;
  const { uri } = req.body;
  try {
    if (playlist) {
      const p = await PlaylistModel.findById(playlist._id).populate('tracks').exec();
      /* console.log(p.tracks);
      p.tracks.filter((track) => {
        console.log({ track });
        console.log({ uri });
        return track.uri === uri;
      });
      console.log((p.tracks.filter((track) => track.uri === uri)).length); */
      if ((p.tracks.filter((track) => track.uri === uri)).length) throw new Error('Song is already on the playlist');
      const t = new TrackModel({ uri, votes: [req.user._id] });
      await t.save();
      p.tracks = [...p.tracks, t];
      await p.save();
      return res.send(p);
    }
    throw new Error('Event does not contain playlist');
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post('/remove', eventAuth, async (req, res) => {
  const { event, user } = req;
  const { playlist } = event;
  const { id } = req.body;
  try {
    if (playlist) {
      const track = await TrackModel.findById(id);
      if (track) {
        const updatedTracks = playlist.tracks.filter((t) => t !== id);
        playlist.tracks = updatedTracks;
        await playlist.save();
        await track.remove();
        return res.send(event.playlist);
      }
      throw new Error('Track Doesn\'t Exist');
    } else {
      throw new Error('Event does not contain playlist');
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await PlaylistModel.findByIdAndDelete(id).exec();
    return res.send({ delete: true });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
