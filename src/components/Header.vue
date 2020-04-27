<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Vue</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#" @click="go('/test')">Test</b-nav-item>
                <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    methods: {
        go(path) {
            console.log('path?', path);
            console.log('rotuer?', this.$router);
            //this.$router.push(path).catch(err => console.log(err))
            this.$router.replace({
                path: path,
                query: {
                    term: 'lorem',
                    sort: 'alphabetical'
                }
            }).catch(err => { console.log(err)})
        }
    }
}
</script>