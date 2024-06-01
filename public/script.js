allSongs();

function allSongs() {
  const songContainer = document.getElementById("songContainer");

  fetch("http://localhost:8080/main/so")
    .then((res) => res.json())
    .then((songsJson) => {
      console.log("it is json in javascript: ", songsJson.songs);
      if (Array.isArray(songsJson.songs)) {
        
        songsJson.songs.forEach(async (song) => {
          createSongItem(songContainer,song);
        });

      } else {
        console.log("its not an array");
      }
    })
    .catch((err) => {
      console.error("here is error: ", err);
    });
}

function idSend(id) {
  const player = document.getElementById("audio_p");
  player.control;

  let playing = false;

  console.log("id got and send(hope)");
  // return 0;
  fetch(`http://localhost:8080/main/no/${id}`)
    .then((response) => response.blob())
    .then((songBlob) => {
      // player.load();
      const url = window.URL.createObjectURL(songBlob);
      console.log("url of blob", url);
      return url;
    })
    .then((url) => (player.src = url))
    .then(() => player.play())
    .catch((err) => console.error(err));
}

function createSongItem(songContainer,song) {
    let songItem = document.createElement("p");
    songItem.setAttribute("id", "song");
    songItem.setAttribute("onclick", `idSend(${song.id})`);
    songItem.textContent = song.name;
    songContainer.appendChild(songItem);
}
// return 0;
//

// play_btn.addEventListener("click", () => {
// if (!playing) {
// let song = document.getElementById("title");
// if (song) {
/* ,{
        // } */
//   method : "POST",
//   headers : {
//     "Content-Type" : "application/json",
//   },
//   body : JSON.stringify(tit)
/*           .then(response => {
            if (response.ok) {
              response
                .arrayBuffer()
                .then(buffer => {
                  const base64data = btoa(
                    String.fromCharCode(...new Uint8Array(buffer))
                  );
                  player.src = `data:audio\wav;base64,${base64data}`;
                  player.play();
                  playing = true;
                })
                .catch(error => {
                  console.error(
                    "maybe audion didn't retrieved or unable to transform"
                  );
                });
            } else {
              console.error("response was not ok");
            }
          })
          .catch((error) => {
            console.error("Fetch error: ", error);
          });
      // } else {
      //   alert("plz add the title");
      // }
    } else {
      player.pause();
      playing = false;
    }
 */ // };
// }

// sendmvalue();
// method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(tit),
//         }
// .then(()=>{
//   player.play();
// })
// play_btn.addEventListener("click", () => {
//   if (playing) {
//       player.pause()
//       playing = false
//   }
//   // else if(){
//       // player.currentTime = 0;
//   // }
//   else {
//       player.play()
//       playing = true
//   }
// })
// player.src = ' '
