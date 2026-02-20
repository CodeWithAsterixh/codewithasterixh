const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_DIR = path.join(__dirname, '../data');
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Ensure directories exist
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Download file helper
function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {}); // Delete partial file
            reject(err);
        });
    });
}

async function processProfile() {
    console.log('Processing profile.json...');
    const filePath = path.join(DATA_DIR, 'profile.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const profileImagesDir = path.join(IMAGES_DIR, 'profile');
    ensureDir(profileImagesDir);

    // Hero Image
    if (data.images && data.images.hero && data.images.hero.src.includes('cdn.sanity.io')) {
        const url = data.images.hero.src;
        const ext = path.extname(url).split('?')[0] || '.png'; // Default to png if no ext
        const filename = `hero${ext}`;
        const localPath = path.join(profileImagesDir, filename);
        const publicPath = `/images/profile/${filename}`;

        try {
            await downloadFile(url, localPath);
            console.log(`Downloaded ${filename}`);
            data.images.hero.src = publicPath;
        } catch (err) {
            console.error(`Error downloading ${url}:`, err.message);
        }
    }

    // About Image
    if (data.images && data.images.about && data.images.about.src.includes('cdn.sanity.io')) {
        const url = data.images.about.src;
        const ext = path.extname(url).split('?')[0] || '.png';
        const filename = `about${ext}`;
        const localPath = path.join(profileImagesDir, filename);
        const publicPath = `/images/profile/${filename}`;

        try {
            await downloadFile(url, localPath);
            console.log(`Downloaded ${filename}`);
            data.images.about.src = publicPath;
        } catch (err) {
            console.error(`Error downloading ${url}:`, err.message);
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('Updated profile.json');
}

async function processProjects() {
    console.log('Processing projects.json...');
    const filePath = path.join(DATA_DIR, 'projects.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const projectsImagesDir = path.join(IMAGES_DIR, 'projects');
    ensureDir(projectsImagesDir);

    for (const project of data) {
        if (project.thumbnail && project.thumbnail.includes('cdn.sanity.io')) {
            const url = project.thumbnail;
            // Handle Sanity URL quirks if necessary, but path.extname usually works
            // Sanity URLs often look like .../image-name-dimensions.png
            const ext = path.extname(url).split('?')[0] || '.png';
            const filename = `${project.slug}${ext}`;
            const localPath = path.join(projectsImagesDir, filename);
            const publicPath = `/images/projects/${filename}`;

            try {
                await downloadFile(url, localPath);
                console.log(`Downloaded ${filename}`);
                project.thumbnail = publicPath;
            } catch (err) {
                console.error(`Error downloading ${url}:`, err.message);
            }
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('Updated projects.json');
}

async function main() {
    try {
        await processProfile();
        await processProjects();
        console.log('Done!');
    } catch (err) {
        console.error('Script failed:', err);
    }
}

main();
