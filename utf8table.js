const fs = require('fs');
const path = require('path');

module.exports = {

    async getAll() {

        let dataTable = []     
        let directory = path.join(__dirname, './utf8')
        let files = await fs.readdirSync(directory, function (err, data) {
            if (err) throw err
            return data
        });

        if (Array.isArray(files)) {

            await files.forEach(async i => {
                
                let fileName = i.replace('.json','')
                let fileData = await fs.readFileSync(`${directory}/${i}`, 'utf8', function (err, data) {
                    if (err) throw err
                    return data
                })

                dataTable.push(JSON.parse(fileData))

            })

            return dataTable;

        } else {
            return []
        }

    },

    async get(table) {

        if (Array.isArray(table)) {

            let dataTable = [];

            await table.forEach(async i => {
                
                let file = path.join(__dirname, `./utf8/${i}.json`);
                try {
                    if (fs.existsSync(file)) {

                        let fileData = await fs.readFileSync(`${file}`, 'utf8', function (err, data) {
                            if (err) throw err
                            return data
                        })

                        dataTable[i] = JSON.parse(fileData)

                    }

                } catch(err) {
                    console.error(err)
                }
                
            })

            return dataTable
            
        } else {

            let file = path.join(__dirname, `./utf8/${table}.json`);
            
            try {
                if (fs.existsSync(file)) {
                    
                    return await fs.readFileSync(file, 'utf8', function (err, data) {
                        if (err) throw err
                        return JSON.parse(data)
                    });

                }
            } catch(err) {
                console.error(err)
            }


        }


    }

    
};