export const singleLevel =
  /* html */
  `
<nav id="example-menu" aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" aria-label="Toggle example menu">☰</button>
  <ul>
    <li><a href="#">About</a></li>
    <li><a href="#">Mammals</a></li>
    <li><a href="#">Reptiles</a></li>
    <li><a href="#">Amphibians</a></li>
    <li><a href="#">Birds</a></li>
    <li><a href="#">Fish</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
`;

export const twoLevel =
  /* html */
  `
<nav id="example-menu" aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" aria-label="Toggle example menu">☰</button>
  <ul>
    <li><a href="#">About</a></li>
    <li class="dropdown">
      <a href="#">Mammals</a>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Wild</a></li>
        <li><a href="#">Domesticated</a></li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a href="#">Reptiles</a>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Wild</a></li>
        <li><a href="#">Domesticated</a></li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a href="#">Amphibians</a>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Wild</a></li>
        <li><a href="#">Domesticated</a></li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown dropdown-left">
      <a href="#">Birds</a>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Wild</a></li>
        <li><a href="#">Domesticated</a></li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown dropdown-left">
      <a href="#">Fish</a>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Wild</a></li>
        <li><a href="#">Domesticated</a></li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
`;

export const twoLevelTopLink =
  /* html */
  `
<nav id="example-menu"  aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" aria-label="Toggle example menu">☰</button>
  <ul>
    <li><a href="#">About</a></li>
    <li class="dropdown">
      <a href="#">Mammals</a>
      <button aria-label="Mammals submenu"></button>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Wild</a></li>
        <li><a href="#">Domesticated</a></li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a href="#">Reptiles</a>
      <button aria-label="Reptiles submenu"></button>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Wild</a></li>
        <li><a href="#">Domesticated</a></li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a href="#">Amphibians</a>
      <button aria-label="Amphibians submenu"></button>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Wild</a></li>
        <li><a href="#">Domesticated</a></li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown dropdown-left">
      <a href="#">Birds</a>
      <button aria-label="Birds submenu"></button>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Wild</a></li>
        <li><a href="#">Domesticated</a></li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown dropdown-left">
      <a href="#">Fish</a>
      <button aria-label="Fish submenu"></button>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Wild</a></li>
        <li><a href="#">Domesticated</a></li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
`;

export const threeLevel =
  /* html */
  `
<nav id="example-menu"  aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" aria-label="Toggle example menu">☰</button>
  <ul>
    <li><a href="#">About</a></li>
    <li class="dropdown">
      <a href="#">Mammals</a>
      <ul>
        <li><a href="#">About</a></li>
        <li class="dropdown">
          <a href="#">Wild</a>
          <ul>
            <li><a href="#">Bears</a></li>
            <li><a href="#">Lions</a></li>
            <li><a href="#">Wolves</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#">Domesticated</a>
          <ul>
            <li><a href="#">Cats</a></li>
            <li><a href="#">Dogs</a></li>
            <li><a href="#">Horses</a></li>
          </ul>
        </li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a href="#">Reptiles</a>
      <ul>
        <li><a href="#">About</a></li>
        <li class="dropdown">
          <a href="#">Wild</a>
          <ul>
            <li><a href="#">Snakes</a></li>
            <li><a href="#">Lizards</a></li>
            <li><a href="#">Turtles</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#">Domesticated</a>
          <ul>
            <li><a href="#">Geckos</a></li>
            <li><a href="#">Tortoises</a></li>
            <li><a href="#">Iguanas</a></li>
          </ul>
        </li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a href="#">Amphibians</a>
      <ul>
        <li><a href="#">About</a></li>
        <li class="dropdown">
          <a href="#">Wild</a>
          <ul>
            <li><a href="#">Frogs</a></li>
            <li><a href="#">Toads</a></li>
            <li><a href="#">Salamanders</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#">Domesticated</a>
          <ul>
            <li><a href="#">Axolotls</a></li>
            <li><a href="#">Newts</a></li>
            <li><a href="#">Frogs</a></li>
          </ul>
        </li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown dropdown-left">
      <a href="#">Birds</a>
      <ul>
        <li><a href="#">About</a></li>
        <li class="dropdown">
          <a href="#">Wild</a>
          <ul>
            <li><a href="#">Eagles</a></li>
            <li><a href="#">Hawks</a></li>
            <li><a href="#">Owls</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#">Domesticated</a>
          <ul>
            <li><a href="#">Parakeets</a></li>
            <li><a href="#">Pigeons</a></li>
            <li><a href="#">Chickens</a></li>
          </ul>
        </li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown dropdown-left">
      <a href="#">Fish</a>
      <ul>
        <li><a href="#">About</a></li>
        <li class="dropdown">
          <a href="#">Wild</a>
          <ul>
            <li><a href="#">Trout</a></li>
            <li><a href="#">Carp</a></li>
            <li><a href="#">Perch</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#">Domesticated</a>
          <ul>
            <li><a href="#">Goldfish</a></li>
            <li><a href="#">Koi</a></li>
            <li><a href="#">Betta</a></li>
          </ul>
        </li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
`;

export const threeLevelTopLink =
  /* html */
  `
<nav id="example-menu"  aria-label="example" aria-describedby="disclaimer">
  <button id="example-toggle" aria-label="Toggle example menu">☰</button>
  <ul>
    <li><a href="#">About</a></li>
    <li class="dropdown">
      <a href="#">Mammals</a>
      <button aria-label="Mammals submenu"></button>
      <ul>
        <li><a href="#">About</a></li>
        <li class="dropdown">
          <a href="#">Wild</a>
          <ul>
            <li><a href="#">Bears</a></li>
            <li><a href="#">Lions</a></li>
            <li><a href="#">Wolves</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#">Domesticated</a>
          <ul>
            <li><a href="#">Cats</a></li>
            <li><a href="#">Dogs</a></li>
            <li><a href="#">Horses</a></li>
          </ul>
        </li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a href="#">Reptiles</a>
      <button aria-label="Reptiles submenu"></button>
      <ul>
        <li><a href="#">About</a></li>
        <li class="dropdown">
          <a href="#">Wild</a>
          <ul>
            <li><a href="#">Snakes</a></li>
            <li><a href="#">Lizards</a></li>
            <li><a href="#">Turtles</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#">Domesticated</a>
          <ul>
            <li><a href="#">Geckos</a></li>
            <li><a href="#">Tortoises</a></li>
            <li><a href="#">Iguanas</a></li>
          </ul>
        </li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a href="#">Amphibians</a>
      <button aria-label="Amphibians submenu"></button>
      <ul>
        <li><a href="#">About</a></li>
        <li class="dropdown">
          <a href="#">Wild</a>
          <ul>
            <li><a href="#">Frogs</a></li>
            <li><a href="#">Toads</a></li>
            <li><a href="#">Salamanders</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#">Domesticated</a>
          <ul>
            <li><a href="#">Axolotls</a></li>
            <li><a href="#">Newts</a></li>
            <li><a href="#">Frogs</a></li>
          </ul>
        </li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown dropdown-left">
      <a href="#">Birds</a>
      <button aria-label="Birds submenu"></button>
      <ul>
        <li><a href="#">About</a></li>
        <li class="dropdown">
          <a href="#">Wild</a>
          <ul>
            <li><a href="#">Eagles</a></li>
            <li><a href="#">Hawks</a></li>
            <li><a href="#">Owls</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#">Domesticated</a>
          <ul>
            <li><a href="#">Parakeets</a></li>
            <li><a href="#">Pigeons</a></li>
            <li><a href="#">Chickens</a></li>
          </ul>
        </li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li class="dropdown dropdown-left">
      <a href="#">Fish</a>
      <button aria-label="Fish submenu"></button>
      <ul>
        <li><a href="#">About</a></li>
        <li class="dropdown">
          <a href="#">Wild</a>
          <ul>
            <li><a href="#">Trout</a></li>
            <li><a href="#">Carp</a></li>
            <li><a href="#">Perch</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#">Domesticated</a>
          <ul>
            <li><a href="#">Goldfish</a></li>
            <li><a href="#">Koi</a></li>
            <li><a href="#">Betta</a></li>
          </ul>
        </li>
        <li><a href="#">Habitats</a></li>
        <li><a href="#">Food</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
`;
