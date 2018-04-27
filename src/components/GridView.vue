<template>
  <div class="grid-view">
    <div>
      <div>
        <label for="inputColNum">Largeur max du container</label>
        <input v-model="containerWidth" type="number" name="inputContainerWith" id="inputContainerWith">
      </div>
      <div>
        <label for="inputColNum">Nombre de colonnes</label>
        <input v-model="columnsNum" type="number" name="inputColNum" id="inputColNum">
      </div>
      <div>
        <label for="inputColNum">Largeur goutière</label>
        <input v-model="gutterWidth" type="number" name="inputGutterWidth" id="inputGutterWidth">
      </div>
    </div>

    <div id="dom-wrap">
      <div id="container" ref="container" class="container" :style="{ maxWidth: containerWidth + 'px'}">
        <div class="row">
          <div
          v-for="(i, index) in Number(columnsNum)"
          :key="index"
          class="col"
          :style="{ flex: '0 0 ' + colWidth, paddingLeft: gutterWidth/2 + 'px', paddingRight: gutterWidth/2 + 'px'}">{{ i }}</div>
        </div>
      </div>
    </div>

    <div>
      <button @click="capture">capturer</button>
    </div>
    <div>
      <img ref="canvasImg" id="canvasImg" alt="Right click to save me!">
    </div>

  </div>
</template>

<script>

import html2canvas from 'html2canvas';
import dom2image from 'dom-to-image'

export default {
  data() {
    return {
      containerWidth: 1000,
      columnsNum: 12,
      gutterWidth : 30
    };
  },
  methods: {
    capture () {
      dom2image.toJpeg(document.getElementById('container')).then( (dataUrl) => {
        // var img = new Image();
        // img.src = dataUrl;
        this.$refs.canvasImg.src = dataUrl;
        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }
  },
  computed: {
    colWidth: function() {
      let colWidth = this.containerWidth / this.columnsNum;
      return colWidth / this.containerWidth * 100 + '%';
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid-view {
  .container {
    padding: 2px 0;
    background-color: red;
    // margin-right: auto;
    // margin-left: auto;
  }

  .row {
    background-color: #eeeeee;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0;
  }

  .col {
    position: relative;
    width: 100%;
    min-height: 1px;
    background-image: linear-gradient(#f7dddd);
    background-clip: content-box;
    height: 400px;
  }

  #dom-wrap {
    display: flex;
    justify-content: center;

    > div {
      flex: 0 0 100%;
    }
  }
}
</style>
