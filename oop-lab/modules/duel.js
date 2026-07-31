// two adventurers battle until one reaches 50 health
export function duel(adventurerOne, adventurerTwo) {
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
