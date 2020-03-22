<template>
      <div id="test">
        <input type="text" id="txt">
        <p id="show"></p>
    </div>
</template>

<script>
export default {
    
    mounted(){
        var obj = { }
         Object.defineProperty(obj, 'txt', {
        get: function () {
            return obj
        },
        set: function (newValue) {
            document.getElementById('txt').value = newValue
            document.getElementById('show').innerHTML = newValue
        }
    })
    document.addEventListener('keyup', function (e) {
        obj.txt = e.target.value
    })

    }
}
</script>

<style scoped lang="less">

</style>