import { Request } from 'express';
import fs from 'fs';
import multer, { diskStorage } from 'multer';
import path from 'path';
import secret from '../app/secret';
import { IMulterConfig } from '../app/types';

const multerUploader = (config: IMulterConfig) => {
  const {
    uploadPath = 'public/images',
    maxSize = 0.5,
    allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ],
    single = true,
    fieldName,
  } = config;

  // Ensure upload directory exists
  const fullPath = path.join(process.cwd(), uploadPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  const storage = diskStorage({
    destination: (_req: Request, _file, cb) => {
      cb(null, fullPath);
    },
    filename: (_req: Request, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${uniqueSuffix}${ext}`);
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: maxSize * 1024 * 1024, // Convert MB to bytes
    },
    fileFilter: (_req: Request, file, cb) => {
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`Only ${allowedMimeTypes.join(', ')} files are allowed!`));
      }
    },
  });

  return single ? upload.single(fieldName) : upload.array(fieldName, 10);
};

export const avatarUpload = multerUploader({
  uploadPath: secret.users_image_path,
  maxSize: 0.3, // 300KB
  allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  single: true,
  fieldName: 'avatar',
});

export default multerUploader;
