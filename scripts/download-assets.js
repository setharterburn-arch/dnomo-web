const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Ensure directories exist
const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');
const videosDir = path.join(publicDir, 'videos');
const dataDir = path.join(__dirname, '../src/data');

[imagesDir, videosDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const productsPath = path.join(dataDir, 'products.json');
const sitePath = path.join(dataDir, 'site.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(dest);
        protocol.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function main() {
    console.log('Downloading assets...');

    // Download Video
    if (site.site.video_url) {
        const videoName = 'hero.mp4';
        const videoDest = path.join(videosDir, videoName);
        console.log(`Downloading video: ${site.site.video_url}`);
        try {
            await downloadFile(site.site.video_url, videoDest);
            site.site.video_url = `/videos/${videoName}`;
            console.log('Video downloaded.');
        } catch (e) {
            console.error('Failed to download video:', e);
        }
    }

    // Download Product Images
    for (const product of products) {
        if (product.image) {
            const ext = path.extname(product.image).split('?')[0] || '.jpg';
            const imageName = `${product.id}${ext}`;
            const imageDest = path.join(imagesDir, imageName);
            console.log(`Downloading image for ${product.id}...`);
            try {
                await downloadFile(product.image, imageDest);
                product.image = `/images/${imageName}`;
            } catch (e) {
                console.error(`Failed to download image for ${product.id}:`, e);
            }
        }
    }

    // Save updated JSON
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    fs.writeFileSync(sitePath, JSON.stringify(site, null, 2));
    console.log('Assets downloaded and JSON updated.');
}

main();
