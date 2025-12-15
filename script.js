// Selectors
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
const audioContainer = document.getElementById('audio-container');
const audioPlayer = document.getElementById('audio-player');

const apiURL = 'https://lyrics-search-app.onrender.com';
// const apiURL = 'http://localhost:3000';

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showDataSafe(data);
  console.log(data);
}

// Event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  
  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

function showDataSafe(lyrics) {
  result.innerHTML = '';
  more.innerHTML = '';
  
  const ul = document.createElement('ul');
  ul.className = 'songs';
  
  lyrics.data.forEach((song) => {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    const strong = document.createElement('strong');
    strong.textContent = song.artist.name;
    
    span.appendChild(strong);
    span.appendChild(document.createTextNode(` - ${song.title}`));
    li.appendChild(span);
    
    const button = document.createElement('button');
    button.className = 'btn';
    button.textContent = 'Get Lyrics';
    button.dataset.artist = song.artist.name;
    button.dataset.songtitle = song.title;
    
    li.appendChild(button);
    ul.appendChild(li);
  });
  
  result.appendChild(ul);
}

// Get lyrics button click
result.addEventListener('click', (e) => {
  const clickedEl = e.target;
  
  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');
    getLyricsSafe(artist, songTitle);
  }
});

async function getLyricsSafe(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  
  result.innerHTML = '';
  more.innerHTML = '';
  
  if (data.error) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = data.error;
    result.append(errorMessage);
    return;
  }
  
  // Show audio player if audio URL exists
  if (data.audioUrl) {
    audioContainer.style.display = 'block';
    audioPlayer.src = data.audioUrl;
    console.log('Audio loaded:', data.audioUrl);
  }
  
  // Create heading
  const heading = document.createElement('h2');
  const strong = document.createElement('strong');
  strong.textContent = artist;
  
  heading.append(strong, ` - ${songTitle}`);
  result.append(heading);
  
  // Create synced lyrics container
  const lyricsContainer = document.createElement('div');
  lyricsContainer.className = 'lyrics-container';
  
  if (data.syncedLyrics && data.syncedLyrics.length > 0) {
    // Use synced lyrics with timestamps
    data.syncedLyrics.forEach((line, index) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'lyric-line';
      lineDiv.textContent = line.text;
      lineDiv.dataset.time = line.time;
      lineDiv.dataset.index = index;
      lyricsContainer.appendChild(lineDiv);
    });
    
    // Setup audio sync
    setupLyricSync(data.syncedLyrics);
  } else {
    // Fallback to regular lyrics
    const lines = data.lyrics.split(/\r\n|\r|\n/);
    lines.forEach((line) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'lyric-line';
      lineDiv.textContent = line;
      lyricsContainer.appendChild(lineDiv);
    });
  }
  
  result.append(lyricsContainer);
}

function setupLyricSync(syncedLyrics) {
  let currentLineIndex = -1;
  
  // Remove old event listeners by cloning the audio element
  const newAudioPlayer = audioPlayer.cloneNode(true);
  audioPlayer.parentNode.replaceChild(newAudioPlayer, audioPlayer);
  
  // Update reference
  const audio = document.getElementById('audio-player');
  
  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    
    // Find which line should be active
    for (let i = syncedLyrics.length - 1; i >= 0; i--) {
      if (currentTime >= syncedLyrics[i].time) {
        if (i !== currentLineIndex) {
          currentLineIndex = i;
          updateActiveLine(i);
        }
        break;
      }
    }
  });
  
  // Reset on song end
  audio.addEventListener('ended', () => {
    resetLyrics();
  });
}

function updateActiveLine(index) {
  const lines = document.querySelectorAll('.lyric-line');
  
  lines.forEach((line, i) => {
    line.classList.remove('active', 'past');
    
    if (i === index) {
      line.classList.add('active');
      // Scroll to active line
      line.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (i < index) {
      line.classList.add('past');
    }
  });
}

function resetLyrics() {
  const lines = document.querySelectorAll('.lyric-line');
  lines.forEach(line => {
    line.classList.remove('active', 'past');
  });
}