import path from "path";
import {promises as fs} from "fs";

export async function getBlocksFromTemplate(template: string) {
    const templatePath = path.join('../../../theme', 'templates', template + '.json')
    try {
        try {
            await fs.access(templatePath)
        } catch {
            console.log('Template ' + template + '.json not found in theme/templates')
            return
        }

        const content = await fs.readFile(templatePath, 'utf-8')
        const data = JSON.parse(content)

        const generateNewIndex = () => {
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 9);
            return `${timestamp}-${randomString}`;
        }


        const updateIndices = (obj: any): any => {
            // Base case: if not an object or array, return as is
            if (!obj || typeof obj !== 'object') {
                return obj;
            }

            // Handle arrays
            if (Array.isArray(obj)) {
                return obj.map(item => updateIndices(item));
            }

            // Handle objects
            const newObj = {...obj};

            // Update index if it exists
            if (newObj.hasOwnProperty('index')) {
                newObj.index = generateNewIndex();
            }

            // Recursively process all nested properties
            for (const key in newObj) {
                if (newObj.hasOwnProperty(key)) {
                    newObj[key] = updateIndices(newObj[key]);
                }
            }

            return newObj;
        };

        return updateIndices(data)

    } catch (error) {
        console.log('Error parsing template ('+template+'.json): ' + error + '')
        throw error
    }
}
