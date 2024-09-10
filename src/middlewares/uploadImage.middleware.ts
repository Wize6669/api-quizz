import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se almacenarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
});

// Filtro para validar tipos de archivos
const imageFileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
};

// Configuración de Multer
const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de tamaño de archivo: 5MB
}).array('images', 10); // Hasta 10 archivos

// Middleware para manejar la carga de imágenes
const imageUploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }
    next();
  });
};

export { imageUploadMiddleware };
