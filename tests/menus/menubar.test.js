/**
 * Test the BaseMenu class.
 *
 * @jest-environment jsdom
 */

import { Menubar } from "../../index";

const dom = `
<nav>
  <button id="toggle-0">Menu Toggle</button>
  <ul id="menu-0">
    <li id="item-1-0-0"><a id="link-1-0-0" href="#">Item 1.0.0</a></li>
    <li id="item-2-0-0" class="dropdown">
      <a id="link-2-0-0" href="#">Item 2.0.0</a>
      <ul id="menu-2">
        <li id="item-2-1-0"><a id="link-2-1-0" href="#">Item 2.1.0</a></li>
        <li id="item-2-2-0"><a id="link-2-2-0" href="#">Item 2.2.0</a></li>
        <li id="item-2-3-0"><a id="link-2-3-0" href="#">Item 2.3.0</a></li>
      </ul>
    </li>
    <li id="item-3-0-0" class="dropdown">
      <a id="link-3-0-0" href="#">Item 3.0.0</a>
      <ul id="menu-3">
        <li id="item-3-1-0"><a id="link-3-1-0" href="#">Item 3.1.0</a></li>
        <li id="item-3-2-0" class="dropdown">
          <a id="link-3-2-0" href="#">Item 3.2.0</a>
          <ul id="mednu-3-2">
            <li id="item-3-2-1"><a id="link-3-2-1" href="#">Item 3.2.1</a></li>
            <li id="item-3-2-2"><a id="link-3-2-2" href="#">Item 3.2.2</a></li>
            <li id="item-3-2-3"><a id="link-3-2-3" href="#">Item 3.2.3</a></li>
          </ul>
        </li>
        <li id="item-3-3-0"><a id="link-3-3-0" href="#">Item 3.3.0</a></li>
      </ul>
    </li>
    <li id="item-4-0-0"><a id="link-4-0-0" href="#">Item 4.0.0</a></li>
    <li id="item-5-0-0" class="dropdown">
      <a id="link-5-0-0" href="#">Item 5.0.0</a>
      <ul id="menu-5">
        <li id="item-5-1-0"><a id="link-5-1-0" href="#">Item 5.1.0</a></li>
        <li id="item-5-2-0"><a id="link-5-2-0" href="#">Item 5.2.0</a></li>
        <li id="item-5-3-0"><a id="link-5-3-0" href="#">Item 5.3.0</a></li>
      </ul>
    </li>
  </ul>
</nav>
`;

document.body.innerHTML = dom;

const menuParams = {
  menuElement: document.querySelector("#menu-0"),
  submenuItemSelector: "li.dropdown",
  containerElement: document.querySelector("nav"),
  controllerElement: document.querySelector("#toggle-0"),
};

test("Menubar initializes", () => {
  // Mock console.error.
  console.error = jest.fn((error) => {
    throw new Error(error.message);
  });

  expect(() => {
    const menu = new Menubar(menuParams);
  }).not.toThrow(Error);
});
