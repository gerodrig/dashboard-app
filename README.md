# DashboardApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

# Setting Environment Variables

This guide explains how to set environment variables in an Angular project based on the provided code snippet.

## Step 1: Create environment files

In your Angular project, locate the `src/environments` directory. Inside this directory, create two environment files: `environment.ts` and `environment.prod.ts`. check `environment.template.ts` file. These files will contain your environment-specific configuration.

## Step 2: Configure environment variables

Open the `environment.ts` file and add the following code:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
    measurementId: 'YOUR_MEASUREMENT_ID',
  },
};

```

Replace the placeholder values (YOUR_API_KEY, YOUR_AUTH_DOMAIN, etc.) with your actual Firebase configuration details.


## Step 3: Configure production environment

Open the `environment.prod.ts` file and add the following code:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
    measurementId: 'YOUR_MEASUREMENT_ID',
  },
};

```

Similar to Step 2, replace the placeholder values with your actual Firebase configuration details.

## Step 4: Set environment variables

To access these environment variables in your Angular application, open the `angular.json` file located in the root of your project.

Under the "architect" section, find the configuration for your desired build target (e.g., **"build"** or **"serve"**).

Inside the **"configurations"** property of the build target, add the following code:

```typescript
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ],
    "optimization": true,
    "outputHashing": "all",
    // ...
  }
}
```

This configuration replaces the `environment.ts` file with `environment.prod.ts` during the production build.

Additionally, you can set specific environment variables for each build target by adding a **"fileReplacements"** entry for each target's configuration.

For example, if you have a development build target, you can add the following code:

```typescript
"configurations": {
  "development": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.dev.ts"
      }
    ],
    // ...
  },
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ],
    // ...
  }
}

```
In this case, you would create an `environment.dev.ts` file and provide the appropriate configuration for the development environment.

## Step 5: Access environment variables

To access the environment variables in your Angular components or services, import the environment file at the top of your code:

```typescript
import { environment } from '../environments/environment';
```

You can then access the variables using `environment.firebase.apiKey`, `environment.firebase.authDomain`, etc.

For example, to access the Firebase API key in a component, you can use `environment.firebase.apiKey`:

```typescript
import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-my-component',
  template: `
    <p>Firebase API Key: {{ firebaseApiKey }}</p>
  `
})
export class MyComponent {
  firebaseApiKey = environment.firebase.apiKey;
}

```

## Step 6: Build your project

To build your Angular project with the production environment variables, run the following command:

```typescript
ng build --configuration=production
```

This command will generate the production-ready files with the correct environment configuration.

Congratulations! You have successfully set up environment variables in your Angular project.