# Google Sheets API Setup

## Current Status ✅
Your Gatsby app is running successfully at http://localhost:8000/

All technical issues have been resolved. You just need to add your Google API key to complete the Google Sheets integration.

## Add Google API Key

### Step 1: Get Google API Key
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the generated API key

### Step 2: Add API Key to Environment File
```bash
echo "GOOGLE_API_KEY=your_actual_api_key_here" >> .env.development
```

### Step 3: Make Spreadsheet Public
1. Open your Google Spreadsheet
2. Click "Share" → "Change to anyone with the link can view"

### Step 4: Restart Development Server
```bash
npm run develop
```

## Your Spreadsheet
Already configured: `1kTtTcxcn1HAkvI33dy4D4LL4nA7cHw9Z2eGvKr_vCcc`

Once you add the API key, your improv games data will load automatically! 