import type { Component } from 'solid-js';
import { createResource, createSignal } from 'solid-js';

const fetchMemeList = async () =>
  (await fetch('https://meme-api.herokuapp.com/gimme/20')).json();

function Meme(props): Component {
  const [meme, setMeme] = createSignal(props.meme);
  return (
    <div>
      <a href={meme().url}>
        <img src={meme().preview[0]}></img>
      </a>
      <p>{meme().title}</p>
    </div>
  );
}

function MemeList(props): Component {
  const [memeList, setMemeList] = createSignal(props.memeList);
  return (
    <For each={memeList().memes}>
      {(m, i) => <Meme meme={m}></Meme>}
    </For>
  );
}

function App(): Component {
  const [memeList] = createResource(fetchMemeList);
  return (
    <Switch>
      <Match when={memeList.loading}><p>Loading...</p></Match>
      <Match when={memeList.error}><p>Error...</p></Match>
      <Match when={memeList()}>
        {m => <MemeList memeList={m}></MemeList>}
      </Match>
    </Switch>
  );
};

export default App;
