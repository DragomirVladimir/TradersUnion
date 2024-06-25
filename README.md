This project uses Gulp for automating tasks such as SCSS compilation, file minification, and browser reloading.

**Install dependencies**

    Make sure you have [Node.js](https://nodejs.org/) installed. Then, install Gulp globally:

    ```bash
    npm install -g gulp-cli
    ```

    Next, install the project dependencies:

    ```bash
    npm install
    ```

### Usage

#### Basic Gulp Commands

- **Run Gulp**

  To run the main Gulp tasks, execute:

  ```bash
  gulp
  ```

  This will run the default task, which typically includes SCSS compilation, file minification, and starting a development server with browser reloading.

- **Build the project**

  To build the project (e.g., for production), run:

  ```bash
  gulp build
  ```

  This command performs all the necessary tasks to prepare the project for release.
