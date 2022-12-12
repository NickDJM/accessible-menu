export const oneLevelMenu = /* html */ `
<header>
  <nav>
    <button id="toggle-0">Menu Toggle</button>
    <ul id="menu-0">
      <li id="item-1-0-0"><a id="link-1-0-0" href="#">First item</a></li>
      <li id="item-2-0-0"><a id="link-2-0-0" href="#">Second item</a></li>
      <li id="item-3-0-0"><a id="link-3-0-0" href="#">Third item</a></li>
      <li id="item-4-0-0"><a id="link-4-0-0" href="#">Fourth item</a></li>
      <li id="item-5-0-0"><a id="link-5-0-0" href="#">Fifth item</a></li>
    </ul>
  </nav>
</header>
<main></main>
`;

export const twoLevelMenu = /* html */ `
<header>
  <nav>
    <button id="toggle-0">Menu Toggle</button>
    <ul id="menu-0">
      <li id="item-1-0-0"><a id="link-1-0-0" href="#">First item</a></li>
      <li id="item-2-0-0" class="dropdown">
        <a id="link-2-0-0" href="#">Second item</a>
        <ul id="menu-2">
          <li id="item-2-1-0"><a id="link-2-1-0" href="#">First item</a></li>
          <li id="item-2-2-0"><a id="link-2-2-0" href="#">Second item</a></li>
          <li id="item-2-3-0"><a id="link-2-3-0" href="#">Third item</a></li>
        </ul>
      </li>
      <li id="item-3-0-0" class="dropdown">
        <a id="link-3-0-0" href="#">Third item</a>
        <ul id="menu-3">
          <li id="item-3-1-0"><a id="link-3-1-0" href="#">First item</a></li>
          <li id="item-3-2-0"><a id="link-3-2-0" href="#">Second item</a></li>
          <li id="item-3-3-0"><a id="link-3-3-0" href="#">Third item</a></li>
        </ul>
      </li>
      <li id="item-4-0-0"><a id="link-4-0-0" href="#">Fourth item</a></li>
      <li id="item-5-0-0" class="dropdown">
        <a id="link-5-0-0" href="#">Fifth item</a>
        <ul id="menu-5">
          <li id="item-5-1-0"><a id="link-5-1-0" href="#">First item</a></li>
          <li id="item-5-2-0"><a id="link-5-2-0" href="#">Second item</a></li>
          <li id="item-5-3-0"><a id="link-5-3-0" href="#">Third item</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</header>
<main></main>
`;

export const fullMenu = /* html */ `
<header>
  <nav>
    <button id="toggle-0">Menu Toggle</button>
    <ul id="menu-0">
      <li id="item-1-0-0"><a id="link-1-0-0" href="#">First item</a></li>
      <li id="item-2-0-0" class="dropdown">
        <a id="link-2-0-0" href="#">Second item</a>
        <ul id="menu-2">
          <li id="item-2-1-0"><a id="link-2-1-0" href="#">First item</a></li>
          <li id="item-2-2-0" class="dropdown">
            <a id="link-2-2-0" href="#">Second item</a>
            <ul id="menu-2-2">
              <li id="item-2-2-1"><a id="link-2-2-1" href="#">First item</a></li>
              <li id="item-2-2-2"><a id="link-2-2-2" href="#">Second item</a></li>
              <li id="item-2-2-3"><a id="link-2-2-3" href="#">Third item</a></li>
            </ul>
          </li>
          <li id="item-2-3-0" class="dropdown">
            <a id="link-2-3-0" href="#">Third item</a>
            <ul id="menu-2-3">
              <li id="item-2-3-1"><a id="link-2-3-1" href="#">First item</a></li>
              <li id="item-2-3-2"><a id="link-2-3-2" href="#">Second item</a></li>
              <li id="item-2-3-3"><a id="link-2-3-3" href="#">Third item</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li id="item-3-0-0" class="dropdown">
        <a id="link-3-0-0" href="#">Third item</a>
        <ul id="menu-3">
          <li id="item-3-1-0"><a id="link-3-1-0" href="#">First item</a></li>
          <li id="item-3-2-0"><a id="link-3-2-0" href="#">Second item</a></li>
          <li id="item-3-3-0"><a id="link-3-3-0" href="#">Third item</a></li>
        </ul>
      </li>
      <li id="item-4-0-0"><a id="link-4-0-0" href="#">Fourth item</a></li>
      <li id="item-5-0-0" class="dropdown">
        <a id="link-5-0-0" href="#">Fifth item</a>
        <ul id="menu-5">
          <li id="item-5-1-0"><a id="link-5-1-0" href="#">First item</a></li>
          <li id="item-5-2-0"><a id="link-5-2-0" href="#">Second item</a></li>
          <li id="item-5-3-0"><a id="link-5-3-0" href="#">Third item</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</header>
<main></main>
`;

export const fullTopLinkMenu = /* html */ `
<header>
  <nav>
    <button id="toggle-0">Menu Toggle</button>
    <ul id="menu-0">
      <li id="item-1-0-0"><a id="link-1-0-0" href="#">First item</a></li>
      <li id="item-2-0-0" class="dropdown">
        <a id="link-2-0-0" href="#">Second item</a>
        <button id="toggle-2-0-0" aria-label="Toggle second item"></button>
        <ul id="menu-2">
          <li id="item-2-1-0"><a id="link-2-1-0" href="#">First item</a></li>
          <li id="item-2-2-0" class="dropdown">
            <a id="link-2-2-0" href="#">Second item</a>
            <button id="toggle-2-2-0" aria-label="Toggle second item"></button>
            <ul id="menu-2-2">
              <li id="item-2-2-1"><a id="link-2-2-1" href="#">First item</a></li>
              <li id="item-2-2-2"><a id="link-2-2-2" href="#">Second item</a></li>
              <li id="item-2-2-3"><a id="link-2-2-3" href="#">Third item</a></li>
            </ul>
          </li>
          <li id="item-2-3-0" class="dropdown">
            <a id="link-2-3-0" href="#">Third item</a>
            <button id="toggle-2-3-0" aria-label="Toggle third item"></button>
            <ul id="menu-2-3">
              <li id="item-2-3-1"><a id="link-2-3-1" href="#">First item</a></li>
              <li id="item-2-3-2"><a id="link-2-3-2" href="#">Second item</a></li>
              <li id="item-2-3-3"><a id="link-2-3-3" href="#">Third item</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li id="item-3-0-0" class="dropdown">
        <a id="link-3-0-0" href="#">Third item</a>
        <button id="toggle-3-0-0" aria-label="Toggle third item"></button>
        <ul id="menu-3">
          <li id="item-3-1-0"><a id="link-3-1-0" href="#">First item</a></li>
          <li id="item-3-2-0"><a id="link-3-2-0" href="#">Second item</a></li>
          <li id="item-3-3-0"><a id="link-3-3-0" href="#">Third item</a></li>
        </ul>
      </li>
      <li id="item-4-0-0"><a id="link-4-0-0" href="#">Fourth item</a></li>
      <li id="item-5-0-0" class="dropdown">
        <a id="link-5-0-0" href="#">Fifth item</a>
        <button id="toggle-5-0-0" aria-label="Toggle fifth item"></button>
        <ul id="menu-5">
          <li id="item-5-1-0"><a id="link-5-1-0" href="#">First item</a></li>
          <li id="item-5-2-0"><a id="link-5-2-0" href="#">Second item</a></li>
          <li id="item-5-3-0"><a id="link-5-3-0" href="#">Third item</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</header>
<main></main>
`;
