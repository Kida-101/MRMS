import ImageKit from 'imagekit';
import busboy from 'busboy';
import { Readable } from 'stream';

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

const MAX_RETRIES = 3;

// Function to retry uploads
async function retryUpload(fileBuffer, fileName, folder, retries = MAX_RETRIES) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const result = await imagekit.upload({
        file: fileBuffer,
        fileName,
        folder,
      });
      return result;
    } catch (error) {
      attempt++;
      if (attempt >= retries) {
        console.error(`Error: ${error.message}`);
      }
      console.log(`Retrying upload (${attempt}/${retries}) for file: ${fileName}`);
    }
  }
  throw new Error('Unexpected error: Upload failed after retries.');
}

// CONTROLLER IMAGE UPLOAD
export const uploadImage = async (req, res) => {
  try {
    const headers = req.headers;
    const bb = busboy({ headers });

    const files = [];
    let directory = '';

    // Handle file uploads
    bb.on('file', (name, file, info) => {
      const { filename, mimeType } = info;
      const chunks = [];

      file.on('data', (data) => chunks.push(data));

      file.on('close', () => {
        files.push({
          fileBuffer: Buffer.concat(chunks),
          fileName: filename,
          mimeType,
        });
      });
    });

    // Capture directory field
    bb.on('field', (name, val) => {
      if (name === 'directory') {
        directory = val;
      }
    });

    const readableStream = Readable.from(req);

    // Wait for processing to complete
    await new Promise((resolve, reject) => {
      bb.on('close', resolve);
      bb.on('error', reject);
      readableStream.pipe(bb);
    });

    // Validate request
    if (!files.length) return res.status(400).json({ message: 'No files found in request.' });
    if (!directory) return res.status(400).json({ message: 'No directory specified.' });

    // Upload images
    const uploadPromises = files.map(({ fileBuffer, fileName }) =>
      retryUpload(fileBuffer, fileName, directory)
    );

    const uploadResults = await Promise.all(uploadPromises);

    // Generate image URLs with transformations
    const urls = uploadResults.map(result =>
      imagekit.url({
        src: result.url,
      })
    );
    console.log("Image Url:", urls)

    return res.status(200).json({ success: true, message: 'Upload successful!', data: urls });
  } catch (error) {
    console.error('Error uploading images:', error.message);
    return res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
  }
};
