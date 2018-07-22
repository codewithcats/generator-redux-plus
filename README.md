# generator-redux-plus
Yeoman generator for Redux-based project plus Redux-saga and Router5

## Installation
```
# You also need yo in your dependencies
npm install --save-dev yo @tanawat/generator-redux-plus
```
or with `yarn`
```
yarn add --dev yo @tanawat/generator-redux-plus
```

## Initial Redux state
```
# The --install flag will install Redux dependencies for you
npx yo @tanawat/redux-plus:init --install

# or with yarn
yarn yo @tanawat/redux-plus:init --install

# You can also omit :init since it is the default task
yarn yo @tanawat/redux-plus --install
```
