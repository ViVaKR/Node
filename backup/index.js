// const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Promise Example
const fileOps = async () => {
    try {

        // Read
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');

        console.log(data);

        // Unlink
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));

        // Write
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data, 'utf8');

        // Append
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you', 'utf8');

        // Rename
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'rename-promiseWrite.txt'));

        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'rename-promiseWrite.txt'), 'utf8');
        console.log(newData);

    } catch (error) {
        console.error(error);
    }
};

fileOps();

// Callback Hell Example
/* fs.writeFile(
    path.join(__dirname, 'files', 'reply.txt'),
    'Nice to meet you!\n',
    (error) => {
        if (error) throw error;
        console.log('Write completed successfully');

        fs.appendFile(
            path.join(__dirname, 'files', 'reply.txt'),
            '\n\nYes it is.\n',
            (error) => {
                if (error) {
                    throw error;
                }
                console.log('Appended successfully');

                fs.rename(
                    path.join(__dirname, 'files', 'reply.txt'),
                    path.join(__dirname, 'files', 'reply_rename.txt'),
                    (error) => {
                        if (error) throw error;
                        console.log('Renamed successfully');
                    }
                );
            }
        );
    }
); */

// exit on uncaught erors
process.on('uncaughtException', (error) => {
    console.clear();
    console.error(`There was an uncaught error:\n=> ${error.stack}`);
    process.exit(1);
});
