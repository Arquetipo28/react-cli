# @arquetipo28/react-cli

react-cli is a nodejs CLI which provide an easy way to generate React stuff, using standarized design patterns as container-component

* Is based on JavasScript
* Allow container component generation

## Installation and Usage

react-cli requires the [Latest NodeJS](https://nodejs.org/en/)

```shell
$ npm install @arquetipo28/react-cli
```

As default it uses a container-component design pattern

### Structure

As default these commands will use the following structure to generate components
```
src
|__ components/
|_____ NavBarComponent.js
|__ containers/
|_____ NavBarContainer.js

```

### Container - Component

You can generate a new component using this design patter with the following command

```shell
$ react-cli <action> <element-type> --name <ComponentName> 
```

Notes that name has to be provided in PascalCasing like `User` or `NavBar` it automatically will be sufixed with `Container` and `Component` respectively

## Examples

Generating component with container-component design pattern

```shell
$ react-cli g component --name ModalBox 
```
