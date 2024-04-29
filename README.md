# Task Manager API

Task Manager API is a RESTful API built with Node.js and Express.js that allows users to perform CRUD operations on tasks. Users can create, read, update, and delete tasks with this API.

## Table of Contents

- [Task Manager API](#task-manager-api)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Testing](#testing)

## Introduction

Task Manager API provides a platform for managing tasks. It supports various operations such as creating, retrieving, updating, and deleting tasks. This README provides an overview of the project structure, installation instructions, usage guidelines, available endpoints, testing procedures, and contribution guidelines.

## Features

- Create new tasks
- Retrieve tasks
- Update existing tasks
- Delete tasks
- Filter and sort tasks
- Assign priority levels to tasks

## Installation

To run the Task Manager API locally, follow these steps:

1. Clone the repository
```bash
git clone https://github.com/mehul1504/Task-Manager-API.git

## Navigate to the project directory

```bash
cd task-manager-api

## Install dependencies:

```bash
npm install

## Start the Server:

```bash
npm start

## Usage
Once the server is running, you can interact with the API using tools like Postman or curl. Here are some example API requests:
Endpoints:

1. GET /tasks: Retrieve all tasks.
2. GET /tasks/:id: Retrieve a single task by its ID.
3. POST /tasks: Create a new task.
4. PUT /tasks/:id: Update an existing task.
5. DELETE /tasks/:id: Delete a task.

## Testing
# Run the tests for Task Manager API

```bash
npm test



