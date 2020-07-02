import { Request } from 'express';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const filenameGenerator = (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    try {
        const fileExtName = extname(file.originalname);
        const randomName = uuidv4();
        callback(null, `${randomName}${fileExtName}`);
    } catch (error) {
        callback(error, '');
    }
}