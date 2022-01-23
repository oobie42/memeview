let url = 'https://meme-api.herokuapp.com/gimme/20';
fetch(url)
  .then(response => response.json())
  .then(data => parseMemeList(data));

function parseMemeList(memeList) {
  const divElement = document.getElementById('meme-list-div');
  for (i = 0; i < memeList.count; i++) {
    showMeme(divElement, memeList.memes[i]);
  }
}

function showMeme(imageListDiv, memeItem) {
  console.log(memeItem);
  addClickableImage(imageListDiv, memeItem.preview[0], memeItem.url);
  addDivText(imageListDiv, memeItem.title);
  addDivText(imageListDiv, memeItem.ups);
}

function addClickableImage(imageListDiv, preview, url) {
  const a = document.createElement("a");
  a.appendChild(document.createElement("img")).src = preview;
  a.href = url;
  imageListDiv.appendChild(a);
}

function addDivText(imageListDiv, text) {
  imageListDiv.appendChild(document.createElement("div")).innerText = text;
}
