import {NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const {className} = await request.json();
        const safelistPath = path.join(process.cwd(), 'safelist.txt');

        const classNames = className.split(' ');

        // Read existing content
        let existingClasses: string[] = [];
        try {
            const content = fs.readFileSync(safelistPath, 'utf-8');
            existingClasses = content.split('\n').filter(className => className.trim() !== '');
        } catch (error) {
            // File doesn't exist yet, that's okay
        }


        // Filter out classes that already exist
        const newClasses = classNames.filter(className =>
            className.trim() !== '' && !existingClasses.includes(className)
        );

        // If we have new classes, append them
        if (newClasses.length > 0) {
            const contentToAdd = newClasses.join('\n');
            fs.appendFileSync(safelistPath,
                (existingClasses.length > 0 ? '\n' : '') + contentToAdd
            );
        }

        return NextResponse.json({message: 'Class added to safelist'});
    } catch (error) {
        console.error('Error updating safelist:', error);
        return NextResponse.json(
            {message: 'Error updating safelist'},
            {status: 500}
        );
    }
}