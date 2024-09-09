import multer from 'multer';
import path from 'path';

const uploadFolder = path.resolve('__dirname', '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename: (request, file, callback) => {
      const fileName = `${new Date().getTime()}-${file.originalname}`;
      callback(null, fileName);
    }
  })
}
