//=============================
//        Class Fantasy
//           Part 2
//=============================

// creating the basic character class
export class Character {
  // every character has the same max health
  static MAX_HEALTH = 100;

  constructor(name) {
    this.name = name;
    this.health = Character.MAX_HEALTH;
    this.inventory = [];
  }

  // giving every character the ability to roll
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;

    console.log(`${this.name} rolled a ${result}.`);

    // returning the number so the duel can compare rolls
    return result;
  }
}
