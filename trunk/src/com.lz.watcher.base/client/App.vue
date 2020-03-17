<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
html, body, #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: url('./assets/bg.jpg') no-repeat fixed;
    background-size: 100% 2600px;
    height: 100%;
    overflow-y: hidden;
}
</style>
