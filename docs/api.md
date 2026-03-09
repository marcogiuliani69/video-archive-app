# Video Archive API

This document describes the REST API used by the Video Archive web application.

The backend is implemented with **Node.js + Express** and exposes endpoints used by the React frontend.

---

# Base URL

/api

---

# 1. Get videos by time range

Returns all videos within the specified time interval.

## Endpoint

GET /api/videos

## Query Parameters

| Parameter | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| start     | datetime | start of the search interval |
| end       | datetime | end of the search interval   |

## Example Request

GET /api/videos?start=2026-03-09T10:00&end=2026-03-09T11:00

## Example Response

[
{
"id": "2026-03-09_10-00.mp4",
"name": "2026-03-09_10-00.mp4",
"timestamp": "2026-03-09T10:00:00",
"isFavorite": false
},
{
"id": "2026-03-09_10-10.mp4",
"name": "2026-03-09_10-10.mp4",
"timestamp": "2026-03-09T10:10:00",
"isFavorite": true
}
]

---

# 2. Get latest video

Returns the most recent video available.

## Endpoint

GET /api/videos/latest

## Example Response

{
"id": "2026-03-09_10-20.mp4",
"name": "2026-03-09_10-20.mp4",
"timestamp": "2026-03-09T10:20:00",
"isFavorite": false
}

---

# 3. Stream video

Streams a video file for playback in the browser.

## Endpoint

GET /api/videos/:id/stream

Example:

GET /api/videos/2026-03-09_10-10.mp4/stream

Requirements:

- support HTTP Range requests
- return correct video content type
- handle file not found
- validate file path

---

# 4. Download video

Allows the user to download a video file.

## Endpoint

GET /api/videos/:id/download

Example:

GET /api/videos/2026-03-09_10-10.mp4/download

Requirements:

- use `Content-Disposition: attachment`
- validate file id
- prevent path traversal

---

# 5. Get favorites

Returns the list of favorite videos.

## Endpoint

GET /api/favorites

## Example Response

[
{
"id": 1,
"videoPath": "/data/videos/2026-03-09_10-00.mp4",
"createdAt": "2026-03-09T11:30:00"
}
]

---

# 6. Add favorite

Adds a video to the favorites list.

## Endpoint

POST /api/favorites

## Request Body

{
"videoPath": "/data/videos/2026-03-09_10-00.mp4"
}

---

# 7. Remove favorite

Removes a favorite video.

## Endpoint

DELETE /api/favorites/:id

Example:

DELETE /api/favorites/1

---

# Error Handling

The API should return standard HTTP status codes:

| Code | Meaning            |
| ---- | ------------------ |
| 200  | success            |
| 400  | invalid request    |
| 404  | resource not found |
| 500  | server error       |
