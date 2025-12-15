const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());

// Serve static files (including MP3)
app.use(express.static(__dirname));

app.get("/suggest/:term", (req, res) => {
  res.json({
    data: [
      {
        artist: { name: "Lauryn Hill" },
        title: "Can't Take My Eyes Off of You"
      }
    ]
  });
});


// SOURCE!!!!  https://archive.org/details/04-to-zion/The+Miseducation+Of+Lauryn+Hill+(1998)/15+-+Can't+Take+My+Eyes+Off+Of+You.mp3


app.get("/v1/:artist/:song", (req, res) => {
  // Return lyrics WITH timestamps for syncing
  res.json({
    audioUrl: "/cant-take-my-eyes-off-you.mp3", // Your MP3 file name
    lyrics: `You're just too good to be true
Can't take my eyes off of you
You'd be like heaven to touch (Heaven to touch)
I wanna hold you so much (Hold you so much)
At long last, love has arrived
And I thank God I'm alive
You're just too good to be true
Can't take my eyes off of you

Pardon the way that I stare (The way that I stare)
There's nothing else to compare
The sight of you leaves me weak
There are no words left to speak (Words left to speak)
But if you feel like I feel
Please let me know that it's real
You're just too good to be true
Can't take my eyes off of you

I need you, baby, and if it's quite alright
I need you, baby, to warm a lonely night
I love you, baby, trust in me when I say, "It's okay"
Oh, pretty baby, don't let me down, I pray
Oh, pretty baby, now that I found you, stay
And let me love you, oh, baby—let me love you, oh, baby—

You're just too good to be true
Can't take my eyes off of you
You'd be like heaven to touch (Heaven to touch)
I wanna hold you so much (Hold you so much)
At long last, love has arrived
And I thank God I'm alive
You're just too good to be true
Can't take my eyes off of you

I need you, baby, and if it's quite alright
I need you, baby, to warm a lonely night
I love you, baby, trust in me when I say, "It's okay"
Oh, pretty baby, don't let me down, I pray 
Oh, pretty baby, now that I found you, stay 
And let me love you, oh, baby—let me love you, oh, baby—

I need you, baby, and if it's quite alright
I love you, baby, to warm a lonely night
I need you, baby, trust in me when I say, "It's okay"
Oh, pretty baby, don't let me down, I pray
Oh, pretty baby, now that I found you, stay
And let me love you, oh, baby—let me love you, oh, baby—`,


    
    // Synced lyrics with timestamps (in seconds)
    // You'll need to adjust these times to match your actual MP3
    syncedLyrics: [
      { time: 20.0, text: "You're just too good to be true" },
      { time: 23.5, text: "Can't take my eyes off of you" },
      { time: 25.0, text: "You'd be like heaven to touch (Heaven to touch)" },
      { time: 28.0, text: "I wanna hold you so much (Hold you so much)" },
      { time: 31.0, text: "At long last, love has arrived" },
      { time: 34.5, text: "And I thank God I'm alive" },
      { time: 36.5, text: "You're just too good to be true" },
      { time: 39.5, text: "Can't take my eyes off of you" },
      { time: 41.0, text: "" },
      { time: 44.0, text: "Pardon the way that I stare (The way that I stare)" },
      { time: 46.0, text: "There's nothing else to compare" },
      { time: 48.0, text: "The sight of you leaves me weak" },
      { time: 50.0, text: "There are no words left to speak (Words left to speak)" },
      { time: 53.0, text: "But if you feel like I feel" },
      { time: 55.5, text: "Please let me know that it's real" },
      { time: 58.5, text: "You're just too good to be true" },
      { time: 60.1, text: "Can't take my eyes off of you" },
      { time: 64.0, text: "" },
      { time: 72.0, text: "I need you, baby, and if it's quite alright" },
      { time: 74.0, text: "I need you, baby, to warm a lonely night" },
      { time: 79.0, text: "I love you, baby, trust in me when I say, \"It's okay\"" },
      { time: 90.0, text: "Oh, pretty baby, don't let me down, I pray" },
      { time: 96.0, text: "Oh, pretty baby, now that I found you, stay" },
      { time: 101.0, text: "And let me love you, oh, baby—let me love you, oh, baby—" },
      { time: 108.0, text: "" },
      { time: 112.0, text: "You're just too good to be true" },
      { time: 115.0, text: "Can't take my eyes off of you" },
      { time: 118.0, text: "You'd be like heaven to touch (Heaven to touch)" },
      { time: 120.0, text: "I wanna hold you so much (Hold you so much)" },
      { time: 123.5, text: "At long last, love has arrived" },
      { time: 125.0, text: "And I thank God I'm alive" },
      { time: 128.0, text: "You're just too good to be true" },
      { time: 131.0, text: "Can't take my eyes off of you" },
      { time: 133.0, text: "" },
      { time: 138.0, text: "I need you, baby, and if it's quite alright" },
      { time: 144.0, text: "I need you, baby, to warm a lonely night" },
      { time: 150.0, text: "I love you, baby, trust in me when I say, \"It's okay\"" },
      { time: 160.0, text: "Oh, pretty baby, don't let me down, I pray" },
      { time: 165.0, text: "Oh, pretty baby, now that I found you, stay" },
      { time: 171.0, text: "And let me love you, oh, baby—let me love you, oh, baby—" },
      { time: 180.0, text: "" },
      { time: 181.0, text: "I need you, baby, and if it's quite alright" },
      { time: 188.0, text: "I love you, baby, to warm a lonely night" },
      { time: 193.0, text: "I need you, baby, trust in me when I say, \"It's okay\"" },
      { time: 202.0, text: "Oh, pretty baby, don't let me down, I pray" },
      { time: 209.0, text: "Oh, pretty baby, now that I found you, stay" },
      { time: 214.0, text: "And let me love you, oh, baby—let me love you, oh, baby—" },

    ]
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  console.log("Serving files from:", __dirname);
});

