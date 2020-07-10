import { Request } from 'express';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const filenameGenerator = (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    try {
        let fileExtName = extname(file.originalname);
        if (!fileExtName) {
            switch (file.mimetype) {
                case 'image/png':
                    fileExtName = '.png';
                    break;
                case 'image/jpeg':
                    fileExtName = '.jpg';
                    break;
                case 'image/gif':
                    fileExtName = '.gif';
                    break;
                default:
                    break;
            }
        }
        const randomName = uuidv4();
        callback(null, `${randomName}${fileExtName}`);
    } catch (error) {
        callback(error, '');
    }
}