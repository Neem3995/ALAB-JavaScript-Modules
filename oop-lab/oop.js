import { Character } from "./modules/Character.js";
import { Adventurer } from "./modules/Adventurer.js";
import { Companion } from "./modules/Companion.js";

//=============================
//     Humble Beginnings
//          Part 1
//=============================

// creating our adventurer object
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],

  // adding Robins companion
  companion: {
    name: "Leo",
    type: "Cat",

    // giving Leo his own companion
    companion: {
      name: "Frank",
      type: "Flea",
      belongings: ["small hat", "sunglasses"],
    },
  },

  // creating a dice roll method
  // mod can add a bonus to the final roll
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;

    console.log(`${this.name} rolled a ${result}.`);
  },
};

// looping through Robins inventory
// this logs each item one at a time
for (const item of adventurer.inventory) {
  console.log(item);
}

// testing Robins roll method a few times
adventurer.roll();
adventurer.roll();
adventurer.roll(5);

//=============================
//        Class Features
//           Part 3
//=============================

//=============================
//       Adventurer Factory
//           Part 5
//=============================

// factory used to create adventurers with the same role
class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }

  // creating a new adventurer
  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);

    this.adventurers.push(newAdventurer);

    // returning the new adventurer
    return newAdventurer;
  }

  // finding an adventurer by their position
  findByIndex(index) {
    return this.adventurers[index];
  }

  // finding an adventurer by their name
  findByName(name) {
    return this.adventurers.find((adventurer) => {
      return adventurer.name === name;
    });
  }
}

// creating a factory for Fighters
const fighterFactory = new AdventurerFactory("Fighter");

// creating Robin with the factory
const robin = fighterFactory.generate("Robin");

// adding Robins adventure items
// push keeps the bedroll and gold already in the inventory
robin.inventory.push("sword", "potion", "artifact");

// creating Leo using the Companion class
robin.companion = new Companion("Leo", "Cat");

// giving Leo his own companion
robin.companion.companion = new Companion("Frank", "Flea");

// adding Franks belongings
robin.companion.companion.inventory.push("small hat", "sunglasses");

// checking the new party
console.log(robin);
console.log(robin.companion);
console.log(robin.companion.companion);

// testing their specialized methods
robin.scout();
robin.companion.assist();
robin.companion.companion.assist();

// checking the fighter factory
console.log(fighterFactory.adventurers);

// finding Robin by position
console.log(fighterFactory.findByIndex(0));

// finding Robin by name
console.log(fighterFactory.findByName("Robin"));

//=============================
//            Duel
//           Part 6
//=============================

// creating another Fighter for Robin to battle
const giorno = fighterFactory.generate("Giorno");

// two adventurers battle until one reaches 50 health
function duel(adventurerOne, adventurerTwo) {
  console.log(
    `${adventurerOne.name} and ${adventurerTwo.name} are starting a duel!`
  );

  while (adventurerOne.health > 50 && adventurerTwo.health > 50) {
    // both adventurers roll once each round
    const firstRoll = adventurerOne.roll();
    const secondRoll = adventurerTwo.roll();

    // the lower roll loses one health
    if (firstRoll > secondRoll) {
      adventurerTwo.health--;

      console.log(`${adventurerTwo.name} loses 1 health.`);
    } else if (secondRoll > firstRoll) {
      adventurerOne.health--;

      console.log(`${adventurerOne.name} loses 1 health.`);
    } else {
      console.log("The round was a tie.");
    }

    // checking their health after every round
    console.log(`${adventurerOne.name}: ${adventurerOne.health} health`);
    console.log(`${adventurerTwo.name}: ${adventurerTwo.health} health`);
    console.log("-----------------------------");
  }

  // announcing the winner
  if (adventurerOne.health === 50) {
    console.log(`${adventurerTwo.name} wins the duel!`);
  } else {
    console.log(`${adventurerOne.name} wins the duel!`);
  }
}

// starting the duel
duel(robin, giorno);

//=============================
//       Experimentation
//           Part 7
//=============================

// Enemy inherits everything from Character
class Enemy extends Character {
  constructor(name, type) {
    super(name);

    // adding the enemy type
    this.type = type;
  }

  // enemies can attack another character
  attack(character) {
    console.log(`${this.name} attacks ${character.name}!`);

    character.health--;

    console.log(`${character.name} now has ${character.health} health.`);
  }
}

// creating an enemy
const goblin = new Enemy("Grim", "Goblin");

console.log(goblin);

// testing the enemy attack method
goblin.attack(robin);
