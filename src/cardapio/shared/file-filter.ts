import { Request } from 'express'

export const fileFilter = (req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Somente imagens são permitidas'), false);
    }
    callback(null, true);
}