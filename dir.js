const fs = require('fs');

// Check if the dir exists rmdir the directory
if (fs.existsSync('./new')) {
    fs.rmdirSync('./new');
}

// Make directory
fs.mkdir('./new', (error) => {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('\nDirectory created');
});
