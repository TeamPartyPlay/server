const express = require('express');
const tokenAuth = require('../middleware/tokenAuth');

const router = express.Router();

router.use(tokenAuth);

/**
 * |Method|Endpoint|Usage|Returns
 * |-|-|-|-|
 * |GET   | `/api/playlist`        | Get current playlist    | Playlist
 * |GET   | `/api/playlist/:id`    | Get a playlist by id    | Playlist
 * |GET   | `/api/playlist/stream` | Stream the playlist     | Stream of Playlist
 * |POST  | `/api/playlist`        | Start new Playlist      | Playlist
 * |POST  | `/api/playlist/:id`    | User joins a playlist   | Playlist
 * |POST  | `/api/playlist/vote`   | Vote on track           | Vote
 * |PUT   | `/api/playlist`        | Update current playlist | Playlist
 * |PUT   | `/api/playlist/:id`    | Update playlist by id   | Playlist
 * |DELETE| `/api/playlist/:id`    | Delete a playlist |
 */
/**
 * Get the Playlist of the current Event
 * @param {express.Request} req Express Request with User and Event
 * @param {express.Response} res Express Response
 * @returns {express.Response} Express Response
 */
const getCurrentPlaylist = (req, res) => res.send({ ...req.event.playlist });

// eslint-disable-next-line arrow-body-style
router.get('/', /** TODO: Event Authorization */ getCurrentPlaylist);

router.get('/:eventId', (req, res) => {
  const { eventId } = req.params;
  return res.send({ connection: 'success' });
});

router.post('/vote', /** TODO: Event Authorization */ (req, res) => {
  const { event, song } = req.body;
  const { playlist } = req.event;
  return res.send({ connection: 'success' });
});

module.exports = router;
