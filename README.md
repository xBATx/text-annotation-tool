## About

This project is implementation of text annotation tool as desktop web application.
Tool was created for annotating text - marking and visualisation of words that have specific semantic.
Annotations are created by selecting text and clicking on specific value from popover or hitting number on keyboard. 
Relations between annotations can be created by clicking on other annotation while one is selecting annotation and holding `ctrl` or `cmd` or `alt` key.
Relations and annotation can be removed by clicking backspace when annotation or relation is selected. 

#### You can try it yourself on [heroku](https://text-a8n-tool.herokuapp.com) 

Basic purpose of this application is to `import text` -> `annotate it` -> `export text with data`.

#### Keyboard shortcuts:

- `(ctrl or alt)+click` on other annotation when one is selected - creates relation between these 2
- when the text is marked - numbers from `1` to `N` annotates selected text with specific category related to this number.
- same when creating relation between annotations
- `escape` - cancel creating annotation/relation
- `backspace` - remove selected annotation/relation

#### This tool was implemented with:

React + Redux + Typescript 

- https://github.com/juliankrispel/react-text-selection-popover - for popovers on selected text
- https://github.com/kdeloach/react-lineto - for drawing lines between annotations
- https://github.com/littlebits/react-popover - for showing selected annotation or relation
- https://github.com/mojotech/json-type-validation - for checking types while importing JSON data

## Data Import & Export
To import text or exported data use button in top right corner. After that, you will see popup with text field where you 
can import raw text or json in export format. Entered JSON is validated immediately and after submit you should see 
the data in app. After annotation process, data can be exported by hitting download button in the top right corner.

 
#### Export and import data format:
```
{
    "annotations": [
        {
            "category": ann_category,
            "from": start_text_index,
            "id": string,
            "text": string,
            "to": end_text_index
        },
    ],
    "relations": [
        {
            "category": category,
            "from": ann_id - string,
            "id": ann_id - string,
            "to": "2085:2093:LAST_NAME"
        }
    ],
    "text": string
}
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run tsc`

Run typescript to check types.

### `npm run lint`

Run tslint and check best coding practices.
