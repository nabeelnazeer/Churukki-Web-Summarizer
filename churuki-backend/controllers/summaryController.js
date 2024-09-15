const puppeteer = require('puppeteer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const scrapePage = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Scrape the entire text content from the page
    const text = await page.evaluate(() => document.body.innerText);
    
    await browser.close();
    return text;
};

const summarizeText = async (text) => {
    // Create the model instance
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create the prompt for summarization
    const prompt = `Summarize the following text in Markdown format. Please include:
        
        1. A brief overview of the main topics.
        2. Key points organized as bullet points.
        3. Important and relevant details that capture the essence of the content.
        
        Ensure the summary is clear, concise, and formatted using Markdown for readability. Here is the text to summarize: ${text}`;

    // Generate content using the model
    const result = await model.generateContent(prompt);

    // Get the response text
    return result.response.text();
};

const getSummary = async (req, res) => {
    try {
        console.log(req.body); 

        const url = req.body.url;
        if (!url) {
            return res.json({ summary: 'No URL provided', error: true });  // Changed from 'data' to 'summary'
        }

        // Scrape the webpage
        const text = await scrapePage(url);
        console.log(text)

        // Get the summary using Gemini
        const summary = await summarizeText(text);

        // Return the summary
        res.json({ summary, error: false });
    } catch (error) {
        console.error(error);
        res.json({ summary: 'Unable to process the request', error: true });  // Changed from 'data' to 'summary'
    }
};

module.exports = {
    getSummary
};
