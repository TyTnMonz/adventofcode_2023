import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Maximum number of Cubes per Color
const totalCubes = { 'red': 12, 'green': 13, 'blue': 14 }

const isThisGamePossibile = (sets) => {
    const cubesInSet = sets.split(';');
    // Custom Exception to stop the loop immediately once the Cubes are too many
    const EndOfCubesException = {};
    try {
        cubesInSet.forEach(setOfCubes => {
            const cubesInfo = setOfCubes.split(',');
            cubesInfo.forEach(cubes => {
                const numberOfCubes = +cubes.trim().split(' ')[0];
                const colorOfCubes = cubes.trim().split(' ')[1];
                // If the Number per Color is > than the Total per Color 
                // The Game is NOT Possibile ( throw Exception and return False )
                if (numberOfCubes > totalCubes[colorOfCubes]) throw EndOfCubesException;
            });
        });
    } catch (e) {
        return false;
    }
    // Game Possible
    return true;
}

const verifyGames = (games) => {
    let sumOfIDs = 0;

    games.forEach(game => {
        // Game Info : ID and SETS
        const gameInfo = game.split(':');
        const gameID = gameInfo[0].match(/\d{1,3}/g)[0];
        const sets = gameInfo[1];
        // Check if the current Game is Possibile
        if (isThisGamePossibile(sets)) {
            sumOfIDs += parseInt(gameID);
            console.log(`Game ${gameID} is possibile => Current sum : ${sumOfIDs}`);
        } else { console.log(`Game ${gameID} is NOT possibile.`); }
    });

    return sumOfIDs;
}

const main = () => {
    const filePath = path.join(__dirname, "puzzleInput.txt");
    const fileContent = readFileSync(filePath, { encoding: "utf-8" });
    const lines = fileContent.split("\n");

    const idsSum = verifyGames(lines);
    console.log(`~~ Total Sum of the IDs of Possibile Games: ${idsSum} ~~`);
};

main();