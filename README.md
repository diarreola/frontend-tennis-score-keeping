# TennisPal

A ReactJS, web based tennis score-keeping tracker. Access [here](https://tennispal.herokuapp.com).

## Features
- Create an account that will store all your matches
- Add players and checkout your list of players
- Begin new matches from your players list! 
- Score-keep new matches via our interface

## Installation
1. Clone this repo
2. Install dependencies by running `yarn install`
3. Create a firebase project and create a `.env` file in the root directory containing:
      
        ```
        REACT_APP_FB_API_KEY=yourapiKey
        REACT_APP_AUTH_DOMAIN=yourauthDomain
        REACT_APP_PROJECT_ID=yourprojectId
        REACT_APP_STORAGE_BUCKET=yourstorageBucket
        REACT_APP_MESSENGER_SENDER_ID=yourmessagingSenderId
        REACT_APP_APP_ID=yourappId
        ```

## Usage
1. Run `yarn start` to locally test
