#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getRandomJoke() {
  try {
    const jokesPath = join(__dirname, 'jokes.json');
    const data = await readFile(jokesPath, 'utf8');
    const { jokes } = JSON.parse(data);
    
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const joke = jokes[randomIndex];
    
    // Add some delay for better reading experience
    console.log('\x1b[36m%s\x1b[0m', joke.setup); // Cyan color for setup
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('\x1b[32m%s\x1b[0m', joke.punchline); // Green color for punchline
    
  } catch (error) {
    console.error('\x1b[31mError:\x1b[0m Failed to tell a joke!', error.message);
    process.exit(1);
  }
}

getRandomJoke();