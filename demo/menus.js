export const singleLevel =
  /* html */
  `
<nav id="example-menu" aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" class="menu-toggle" aria-label="Example menu">☰</button>
  <ul class="menu">
    <li class="menu-item"><a class="menu-link" href="#">About</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Mammals</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Reptiles</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Amphibians</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Birds</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Fish</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Map</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Contact</a></li>
  </ul>
</nav>
`;

export const twoLevel =
  /* html */
  `
<nav id="example-menu" aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" class="menu-toggle" aria-label="Example menu">☰</button>
  <ul class="menu">
    <li class="menu-item"><a class="menu-link" href="#">About</a></li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#">Mammals</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#">Reptiles</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#">Amphibians</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#">Birds</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#">Fish</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#">Contact</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">Email</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Socials</a></li>
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
    <li class="menu-item"><a class="menu-link" href="#">About</a></li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Mammals</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Reptiles</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Amphibians</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Birds</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Fish</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Contact</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">Email</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Socials</a></li>
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
    <li class="menu-item"><a class="menu-link" href="#">About</a></li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#">Mammals</a>
      <button class="dropdown-toggle" aria-label="Mammals submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#">Reptiles</a>
      <button class="dropdown-toggle" aria-label="Reptiles submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#">Amphibians</a>
      <button class="dropdown-toggle" aria-label="Amphibians submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#">Birds</a>
      <button class="dropdown-toggle" aria-label="Birds submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#">Fish</a>
      <button class="dropdown-toggle" aria-label="Fish submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Wild</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Domesticated</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Food</a></li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#">Contact</a>
      <button class="dropdown-toggle" aria-label="Contact submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">Email</a></li>
        <li class="menu-item"><a class="menu-link" href="#">Socials</a></li>
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
    <li class="menu-item"><a class="menu-link" href="#">About</a></li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#">Mammals</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Bears</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Lions</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Wolves</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Cats</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Dogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Horses</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#">Reptiles</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Snakes</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Lizards</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Turtles</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Geckos</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Tortoises</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Iguanas</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link dropdown-toggle" href="#">Amphibians</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Frogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Toads</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Salamanders</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Axolotls</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Newts</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Frogs</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#">Birds</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Eagles</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Hawks</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Owls</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Parakeets</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Pigeons</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Chickens</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#">Fish</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Trout</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Carp</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Perch</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Goldfish</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Koi</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Betta</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link dropdown-toggle" href="#">Contact</a>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">Email</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Socials</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Twitter</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Facebook</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Instagram</a></li>
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
    <li class="menu-item"><a class="menu-link" href="#">About</a></li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Mammals</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Wild</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Bears</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Lions</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Wolves</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Domesticated</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Cats</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Dogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Horses</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Food</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Reptiles</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Wild</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Snakes</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Lizards</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Turtles</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Domesticated</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Geckos</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Tortoises</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Iguanas</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Food</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <button class="menu-link dropdown-toggle">Amphibians</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Wild</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Frogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Toads</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Salamanders</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Domesticated</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Axolotls</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Newts</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Frogs</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Food</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Birds</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Wild</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Eagles</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Hawks</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Owls</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Domesticated</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Parakeets</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Pigeons</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Chickens</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Food</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Fish</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Wild</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Trout</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Carp</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Perch</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Domesticated</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Goldfish</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Koi</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Betta</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Food</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <button class="menu-link dropdown-toggle">Contact</button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">Email</a></li>
        <li class="menu-item dropdown">
          <button class="menu-link dropdown-toggle">Socials</button>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Twitter</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Facebook</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Instagram</a></li>
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
    <li class="menu-item"><a class="menu-link" href="#">About</a></li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#">Mammals</a>
      <button class="dropdown-toggle" aria-label="Mammals submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Bears</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Lions</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Wolves</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Cats</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Dogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Horses</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#">Reptiles</a>
      <button class="dropdown-toggle" aria-label="Reptiles submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Snakes</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Lizards</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Turtles</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Geckos</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Tortoises</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Iguanas</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown">
      <a class="menu-link" href="#">Amphibians</a>
      <button class="dropdown-toggle" aria-label="Amphibians submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Frogs</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Toads</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Salamanders</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Axolotls</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Newts</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Frogs</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#">Birds</a>
      <button class="dropdown-toggle" aria-label="Birds submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Eagles</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Hawks</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Owls</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Parakeets</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Pigeons</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Chickens</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#">Fish</a>
      <button class="dropdown-toggle" aria-label="Fish submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">About</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Wild</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Trout</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Carp</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Perch</a></li>
          </ul>
        </li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Domesticated</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Goldfish</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Koi</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Betta</a></li>
          </ul>
        </li>
        <li class="menu-item"><a class="menu-link" href="#">Habitats</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Food</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Can Eat</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Can't Eat</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu-item"><a class="menu-link" href="#">Map</a></li>
    <li class="menu-item dropdown dropdown-left">
      <a class="menu-link" href="#">Contact</a>
      <button class="dropdown-toggle" aria-label="Contact submenu"></button>
      <ul class="dropdown-menu">
        <li class="menu-item"><a class="menu-link" href="#">Email</a></li>
        <li class="menu-item dropdown">
          <a class="menu-link dropdown-toggle" href="#">Socials</a>
          <ul class="dropdown-menu">
            <li class="menu-item"><a class="menu-link" href="#">Twitter</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Facebook</a></li>
            <li class="menu-item"><a class="menu-link" href="#">Instagram</a></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</nav>
`;
