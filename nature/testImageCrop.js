// TODO - future plans are better! Initally full image
// Tesseract to recognize text
const Tesseract = require('tesseract.js');
const url = 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-023-05910-2/MediaObjects/41586_2023_5910_Fig3_HTML.png';
img_coords =  {"x0":0,"y0":6,"x1":19,"y1":24}; // a
// img_coords  = {"x0":217,"y0":18,"x1":230,"y1":36} // something
// img_coords = {"x0":277,"y0":19,"x1":284,"y1":36} // something
// img_coords = {"x0":910,"y0":0,"x1":929,"y1":24} // b 

loadImageAndAnalyzeColor(url, img_coords["x0"], img_coords["y0"], img_coords["x1"], img_coords["y1"])
    .then(averageColor => {
        console.log(averageColor);
    })
    .catch(err => {
        console.error(err);
    });


function loadImageAndAnalyzeColor(imageUrl, x0, y0, x1, y1) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            const width = x1 - x0;
            const height = y1 - y0;
            const imageData = context.getImageData(x0, y0, width, height).data;
            let red = 0;
            let green = 0;
            let blue = 0;
            let alpha = 0;
            const pixels = imageData.length / 4; // Each pixel has 4 values (red, green, blue, alpha)
    
            for (let i = 0; i < imageData.length; i += 4) {
                red += imageData[i];
                green += imageData[i + 1];
                blue += imageData[i + 2];
                alpha += imageData[i + 3];
            }
    
            resolve({
                red: red / pixels,
                green: green / pixels,
                blue: blue / pixels,
                alpha: alpha / pixels
            });
        };
        img.onerror = reject;
        img.src = imageUrl;
    });
}
// works decently
// Tesseract.recognize(
//   url,
//   'eng',
//   { logger: m => console.log(m) }
// )
// .then(({ data: { blocks } }) => {
//   blocks.forEach(block => {
//     block.paragraphs.forEach(paragraph => {
//       paragraph.lines.forEach(line => {
//         line.words.forEach(word => {
//           word.symbols.forEach(symbol => {
//             console.log(`symbol: ${symbol.text}, bounding box: ${JSON.stringify(symbol.bbox)}`);
//           });
//         });
//       });
//     });
//   });
// })
// .catch(err => console.error(err));


// Tesseract.recognize(
//   'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-023-05910-2/MediaObjects/41586_2023_5910_Fig3_HTML.png',
//   'eng',
//   { logger: m => console.log(m) }
// ).then(({ data: { text } }) => {
//   console.log(text);
// });

// JIMP to cut from coordinates
// const Jimp = require('jimp');

// // URL of the image
// const imageUrl = 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-023-05910-2/MediaObjects/41586_2023_5910_Fig3_HTML.png';

// // Coordinates of the area to crop
// const cropArea = { x: 100, y: 100, w: 200, h: 200 };

// Jimp.read(imageUrl)
//     .then(image => {
//         image
//             .crop(cropArea.x, cropArea.y, cropArea.w, cropArea.h)
//             .write('cropped.jpg', (err) => {
//                 if (err) throw err;
//                 console.log('Image cropped and saved as cropped.jpg');
//             });
//     })
//     .catch(err => {
//         console.error(err);
//     });

