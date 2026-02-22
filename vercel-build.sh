#!/bin/bash
cd frontend
npm ci
npm run build
# Copy index.html to 404.html for SPA routing
cp build/index.html build/404.html
