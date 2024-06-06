# Project Setup Guide

Follow these steps to set up your project:

## 1. Clone the Project and Change Directory:

Open your terminal and run the following commands:

```bash
git clone <project_repository_url> && cd <project_directory_name>

```
# Twitter Credentials
TWITTER_PASSWORD="Your Twitter Password"
TWITTER_NAME="Your Twitter UserName"
TWITTER_EMAIL="Your Twitter Email (Sometimes it asks for verification)"
TWITTER_PHONE="Your Twitter Phone (Verification Purpose if Twitter asks)"

# Server Configuration
PORT="Port to run your server"
(most probably try to give 4000 incase of another port please edit the http://localhost:4000/get-hashtags so that 4000 would be replaced by your given port)

# MongoDB Configuration
MONGO_URI="MongoDB URI"

Install the required dependencies
```bash
npm install
```
Run the Project

```bash
node index.js
```

Go to index.html file run the html file by live porting
edit http://localhost:4000/get-hashtags with your backend port like replace the 4000 port with your desired backend run port which you have given on .env file

