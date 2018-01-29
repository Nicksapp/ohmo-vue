<template>
    <div>
        <div class="ball"></div>
    </div>
</template>

<script>
import { tween, styler, easing } from 'popmotion';
export default {
    name: 'home',
    data () {
        return {}    
    },
    mounted () {
        const ball = document.querySelector('.ball');
        const ballStyler = styler(ball);

        tween({
            from: { x: 0, scale: 1 },
            to: { x: 300, scale: 2 },
            ease: easing.easeInOut,
            flip: 'Infinity',
            duration: 1000
        }).start(ballStyler.set);
    }
}
</script>

<style lang="scss" scoped>
.ball {
    display: inline-block;
    width: 100px;
    height: 100px;
    background: red;
    margin-top: 100px;
}
</style>

