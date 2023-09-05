"use strict";

window.addEventListener("DOMContentLoaded", start);

const Animal = {
  name: "default name",
  desc: "",
  type: "",
  age: 0,
};

const allAnimals = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    const animal = Object.create(Animal);

    // vi finder de korrekte indextal for positionen af firstSpace, secondSpace og lastSpace 
    const fullname = jsonObject.fullname;
    console.log(fullname);

    const firstSpace = fullname.indexOf(" ");
    const secondSpace = fullname.indexOf(" ", firstSpace + 1);
    const lastSpace = fullname.lastIndexOf(" ");

    console.log(firstSpace);

    // ud fra disse indextal kan vi nu isolere firstname desc og type fra hinanden
    const name = fullname.substring(0, firstSpace);
    const description = fullname.substring(secondSpace + 1, lastSpace);
    const type = fullname.substring(lastSpace + 1);

    console.log(name, description, type);

    // indsætter propertyvalues til vores nye Animal array
    animal.name = name;
    animal.desc = description;
    animal.type = type;

    animal.age = jsonObject.age;

    // pusher det nye animal objekt til det tomme allAnimals array
    allAnimals.push(animal);
   
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
