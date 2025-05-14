export const singleLevel =
  /* html */
  `
<nav id="example-menu" aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" class="menu-toggle" aria-label="Example menu">☰</button>
  <ul class="menu">
    <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
    <li class="menu-item"><a class="menu-link" href="#Mammals">Mammals</a></li>
    <li class="menu-item"><a class="menu-link" href="#Reptiles">Reptiles</a></li>
    <li class="menu-item"><a class="menu-link" href="#Amphibians">Amphibians</a></li>
    <li class="menu-item"><a class="menu-link" href="#Birds">Birds</a></li>
    <li class="menu-item"><a class="menu-link" href="#Fish">Fish</a></li>
    <li class="menu-item"><a class="menu-link" href="#Map">Map</a></li>
    <li class="menu-item"><a class="menu-link" href="#Contact">Contact</a></li>
  </ul>
</nav>
`;

export const twoLevel =
  /* html */
  `
<nav id="example-menu" aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" class="menu-toggle" aria-label="Example menu">☰</button>
  <ul class="menu">
    <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#Mammals">Mammals</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#Reptiles">Reptiles</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#Amphibians">Amphibians</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#Birds">Birds</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#Fish">Fish</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#Map">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#Contact">Contact</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#Email">Email</a></li>
        <li class="menu-item"><a class="menu-link" href="#Socials">Socials</a></li>
      </ul>
    </li>
  </ul>
</nav>
`;

export const twoLevelDisclosure =
  /* html */
  `
<nav id="example-menu" aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" class="menu-toggle" aria-label="Example menu">☰</button>
  <ul class="menu">
    <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Mammals</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Reptiles</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Amphibians</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Birds</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Fish</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#Map">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Contact</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#Email">Email</a></li>
        <li class="menu-item"><a class="menu-link" href="#Socials">Socials</a></li>
      </ul>
    </li>
  </ul>
</nav>
`;

export const twoLevelDisclosureTopLink =
  /* html */
  `
<nav id="example-menu"  aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" class="menu-toggle" aria-label="Example menu">☰</button>
  <ul class="menu">
    <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#Mammals">Mammals</a>
      <button class="dropdown-toggle" aria-label="Mammals submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#Reptiles">Reptiles</a>
      <button class="dropdown-toggle" aria-label="Reptiles submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#Amphibians">Amphibians</a>
      <button class="dropdown-toggle" aria-label="Amphibians submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#Birds">Birds</a>
      <button class="dropdown-toggle" aria-label="Birds submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#Fish">Fish</a>
      <button class="dropdown-toggle" aria-label="Fish submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#Map">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#Contact">Contact</a>
      <button class="dropdown-toggle" aria-label="Contact submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#Email">Email</a></li>
        <li class="menu-item"><a class="menu-link" href="#Socials">Socials</a></li>
      </ul>
    </li>
  </ul>
</nav>
`;

export const twoLevelDisclosureTopLinkNoButtons =
  /* html */
  `
<nav id="example-menu"  aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" class="menu-toggle" aria-label="Example menu">☰</button>
  <ul class="menu">
    <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#Mammals">Mammals</a>
      <a class="dropdown-toggle" href="#" aria-label="Mammals submenu"></a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#Reptiles">Reptiles</a>
      <a class="dropdown-toggle" href="#" aria-label="Reptiles submenu"></a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#Amphibians">Amphibians</a>
      <a class="dropdown-toggle" href="#" aria-label="Amphibians submenu"></a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#Birds">Birds</a>
      <a class="dropdown-toggle" href="#" aria-label="Birds submenu"></a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#Fish">Fish</a>
      <a class="dropdown-toggle" href="#" aria-label="Fish submenu"></a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#Wild">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#Domesticated">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#Food">Food</a></li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#Map">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#Contact">Contact</a>
      <a class="dropdown-toggle" href="#" aria-label="Contact submenu"></a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#Email">Email</a></li>
        <li class="menu-item"><a class="menu-link" href="#Socials">Socials</a></li>
      </ul>
    </li>
  </ul>
</nav>
`;

export const threeLevel =
  /* html */
  `
<nav id="example-menu"  aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" class="menu-toggle" aria-label="Example menu">☰</button>
  <ul class="menu">
    <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#Mammals">Mammals</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Wild">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Bears">Bears</a></li>
            <li class="menu-item"><a class="menu-link" href="#Lions">Lions</a></li>
            <li class="menu-item"><a class="menu-link" href="#Wolves">Wolves</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Domesticated">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Cats">Cats</a></li>
            <li class="menu-item"><a class="menu-link" href="#Dogs">Dogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#Horses">Horses</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Food">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#Reptiles">Reptiles</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Wild">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Snakes">Snakes</a></li>
            <li class="menu-item"><a class="menu-link" href="#Lizards">Lizards</a></li>
            <li class="menu-item"><a class="menu-link" href="#Turtles">Turtles</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Domesticated">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Geckos">Geckos</a></li>
            <li class="menu-item"><a class="menu-link" href="#Tortoises">Tortoises</a></li>
            <li class="menu-item"><a class="menu-link" href="#Iguanas">Iguanas</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Food">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#Amphibians">Amphibians</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Wild">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Frogs">Frogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#Toads">Toads</a></li>
            <li class="menu-item"><a class="menu-link" href="#Salamanders">Salamanders</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Domesticated">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Axolotls">Axolotls</a></li>
            <li class="menu-item"><a class="menu-link" href="#Newts">Newts</a></li>
            <li class="menu-item"><a class="menu-link" href="#Frogs">Frogs</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Food">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#Birds">Birds</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Wild">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Eagles">Eagles</a></li>
            <li class="menu-item"><a class="menu-link" href="#Hawks">Hawks</a></li>
            <li class="menu-item"><a class="menu-link" href="#Owls">Owls</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Domesticated">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Parakeets">Parakeets</a></li>
            <li class="menu-item"><a class="menu-link" href="#Pigeons">Pigeons</a></li>
            <li class="menu-item"><a class="menu-link" href="#Chickens">Chickens</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Food">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#Fish">Fish</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Wild">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Trout">Trout</a></li>
            <li class="menu-item"><a class="menu-link" href="#Carp">Carp</a></li>
            <li class="menu-item"><a class="menu-link" href="#Perch">Perch</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Domesticated">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Goldfish">Goldfish</a></li>
            <li class="menu-item"><a class="menu-link" href="#Koi">Koi</a></li>
            <li class="menu-item"><a class="menu-link" href="#Betta">Betta</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Food">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#Map">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#Contact">Contact</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#Email">Email</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Socials">Socials</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Twitter">Twitter</a></li>
            <li class="menu-item"><a class="menu-link" href="#Facebook">Facebook</a></li>
            <li class="menu-item"><a class="menu-link" href="#Instagram">Instagram</a></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</nav>
`;

export const threeLevelDisclosure =
  /* html */
  `
<nav id="example-menu"  aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" class="menu-toggle" aria-label="Example menu">☰</button>
  <ul class="menu">
    <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Mammals</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Wild</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Bears">Bears</a></li>
            <li class="menu-item"><a class="menu-link" href="#Lions">Lions</a></li>
            <li class="menu-item"><a class="menu-link" href="#Wolves">Wolves</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Domesticated</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Cats">Cats</a></li>
            <li class="menu-item"><a class="menu-link" href="#Dogs">Dogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#Horses">Horses</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Food</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Reptiles</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Wild</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Snakes">Snakes</a></li>
            <li class="menu-item"><a class="menu-link" href="#Lizards">Lizards</a></li>
            <li class="menu-item"><a class="menu-link" href="#Turtles">Turtles</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Domesticated</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Geckos">Geckos</a></li>
            <li class="menu-item"><a class="menu-link" href="#Tortoises">Tortoises</a></li>
            <li class="menu-item"><a class="menu-link" href="#Iguanas">Iguanas</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Food</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Amphibians</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Wild</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Frogs">Frogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#Toads">Toads</a></li>
            <li class="menu-item"><a class="menu-link" href="#Salamanders">Salamanders</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Domesticated</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Axolotls">Axolotls</a></li>
            <li class="menu-item"><a class="menu-link" href="#Newts">Newts</a></li>
            <li class="menu-item"><a class="menu-link" href="#Frogs">Frogs</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Food</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Birds</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Wild</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Eagles">Eagles</a></li>
            <li class="menu-item"><a class="menu-link" href="#Hawks">Hawks</a></li>
            <li class="menu-item"><a class="menu-link" href="#Owls">Owls</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Domesticated</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Parakeets">Parakeets</a></li>
            <li class="menu-item"><a class="menu-link" href="#Pigeons">Pigeons</a></li>
            <li class="menu-item"><a class="menu-link" href="#Chickens">Chickens</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Food</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Fish</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Wild</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Trout">Trout</a></li>
            <li class="menu-item"><a class="menu-link" href="#Carp">Carp</a></li>
            <li class="menu-item"><a class="menu-link" href="#Perch">Perch</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Domesticated</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Goldfish">Goldfish</a></li>
            <li class="menu-item"><a class="menu-link" href="#Koi">Koi</a></li>
            <li class="menu-item"><a class="menu-link" href="#Betta">Betta</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Food</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#Map">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Contact</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#Email">Email</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Socials</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Twitter">Twitter</a></li>
            <li class="menu-item"><a class="menu-link" href="#Facebook">Facebook</a></li>
            <li class="menu-item"><a class="menu-link" href="#Instagram">Instagram</a></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</nav>
`;

export const threeLevelDisclosureTopLink =
  /* html */
  `
<nav id="example-menu"  aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" class="menu-toggle" aria-label="Example menu">☰</button>
  <ul class="menu">
    <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#Mammals">Mammals</a>
      <button class="dropdown-toggle" aria-label="Mammals submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Wild">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Bears">Bears</a></li>
            <li class="menu-item"><a class="menu-link" href="#Lions">Lions</a></li>
            <li class="menu-item"><a class="menu-link" href="#Wolves">Wolves</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Domesticated">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Cats">Cats</a></li>
            <li class="menu-item"><a class="menu-link" href="#Dogs">Dogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#Horses">Horses</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Food">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#Reptiles">Reptiles</a>
      <button class="dropdown-toggle" aria-label="Reptiles submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Wild">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Snakes">Snakes</a></li>
            <li class="menu-item"><a class="menu-link" href="#Lizards">Lizards</a></li>
            <li class="menu-item"><a class="menu-link" href="#Turtles">Turtles</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Domesticated">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Geckos">Geckos</a></li>
            <li class="menu-item"><a class="menu-link" href="#Tortoises">Tortoises</a></li>
            <li class="menu-item"><a class="menu-link" href="#Iguanas">Iguanas</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Food">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#Amphibians">Amphibians</a>
      <button class="dropdown-toggle" aria-label="Amphibians submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Wild">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Frogs">Frogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#Toads">Toads</a></li>
            <li class="menu-item"><a class="menu-link" href="#Salamanders">Salamanders</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Domesticated">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Axolotls">Axolotls</a></li>
            <li class="menu-item"><a class="menu-link" href="#Newts">Newts</a></li>
            <li class="menu-item"><a class="menu-link" href="#Frogs">Frogs</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Food">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#Birds">Birds</a>
      <button class="dropdown-toggle" aria-label="Birds submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Wild">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Eagles">Eagles</a></li>
            <li class="menu-item"><a class="menu-link" href="#Hawks">Hawks</a></li>
            <li class="menu-item"><a class="menu-link" href="#Owls">Owls</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Domesticated">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Parakeets">Parakeets</a></li>
            <li class="menu-item"><a class="menu-link" href="#Pigeons">Pigeons</a></li>
            <li class="menu-item"><a class="menu-link" href="#Chickens">Chickens</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Food">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#Fish">Fish</a>
      <button class="dropdown-toggle" aria-label="Fish submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#About">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Wild">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Trout">Trout</a></li>
            <li class="menu-item"><a class="menu-link" href="#Carp">Carp</a></li>
            <li class="menu-item"><a class="menu-link" href="#Perch">Perch</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Domesticated">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Goldfish">Goldfish</a></li>
            <li class="menu-item"><a class="menu-link" href="#Koi">Koi</a></li>
            <li class="menu-item"><a class="menu-link" href="#Betta">Betta</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#Habitats">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Food">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Can">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#Can">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#Map">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#Contact">Contact</a>
      <button class="dropdown-toggle" aria-label="Contact submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#Email">Email</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#Socials">Socials</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#Twitter">Twitter</a></li>
            <li class="menu-item"><a class="menu-link" href="#Facebook">Facebook</a></li>
            <li class="menu-item"><a class="menu-link" href="#Instagram">Instagram</a></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</nav>
`;

export default {
  singleLevel,
  twoLevel,
  twoLevelDisclosure,
  twoLevelDisclosureTopLink,
  threeLevel,
  threeLevelDisclosure,
  threeLevelDisclosureTopLink,
};
