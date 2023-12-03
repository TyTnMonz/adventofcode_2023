import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateGamePower = (sets) => {
    const cubesInSet = sets.split(';');
    // Set the initial number to 0
    let numberOfReds = 0;
    let numberOfGreens = 0;
    let numberOfBlues = 0;
    cubesInSet.forEach(setOfCubes => {
        const cubesInfo = setOfCubes.split(',');
        cubesInfo.forEach(cubes => {
            const numberOfCubes = +cubes.trim().split(' ')[0];
            const colorOfCubes = cubes.trim().split(' ')[1];
            // Check the Color of the current Cubes
            // if the Number of the current Set is > than the higest found till now
            // update the highest
            switch (colorOfCubes.trim()) {
                case 'red':
                    if (numberOfCubes > numberOfReds) { numberOfReds = numberOfCubes; }
                    break;
                case 'green':
                    if (numberOfCubes > numberOfGreens) { numberOfGreens = numberOfCubes; }
                    break;
                case 'blue':
                    if (numberOfCubes > numberOfBlues) { numberOfBlues = numberOfCubes; }
                    break;
            }
        });
    });
    // Calculate the Power and return to sum
    return numberOfReds * numberOfGreens * numberOfBlues;
}

const calculatePower = (games) => {
    let gamesPower = 0;

    games.forEach(game => {
        const gameInfo = game.split(':');
        const sets = gameInfo[1];
        // Calculate the Power of the Current Game
        gamesPower += calculateGamePower(sets);
    });

    return gamesPower;
}

const main = () => {
    const filePath = path.join(__dirname, "puzzleInput.txt");
    const fileContent = readFileSync(filePath, { encoding: "utf-8" });
    const lines = fileContent.split("\n");

    const totalPower = calculatePower(lines);
    console.log(`~~ The total Power of the Games Sets is : ${totalPower} ~~`);
};

main();
