# Use Node.js image to build and run the backend
FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Make sure the entry point is correct (in your case it's `index.js`)
CMD ["node", "index.js"]
