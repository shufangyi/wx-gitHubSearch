const parser = require('./parser')
const getRichTextNodes = require('./richtext').getRichTextNodes
let windowWidth = 375
Component({
  properties: {
    md: {
      type: String,
      value: '',
      observer() {
        this.parseMd()
      }
    },
    type: {
      type: String,
      value: 'wemark'
    },
    link: {
      type: Boolean,
      value: false
    },
    highlight: {
      type: Boolean,
      value: false
    }
  },
  data: {
    parsedData: {},
    richTextNodes: [],
    images: {}
  },
  created() {
    wx.getSystemInfo({
      success: function(res) {
        windowWidth = res.windowWidth
      }
    })
  },
  methods: {
    parseMd() {
      if (this.data.md) {
        var parsedData = parser.parse(this.data.md, {
          link: this.data.link,
          highlight: this.data.highlight
        })
        // console.log('parsedData:', parsedData);
        if (this.data.type === 'wemark') {
          this.setData({
            parsedData
          })
        } else {
          // var inTable = false;
          var richTextNodes = getRichTextNodes(parsedData)

          // console.log('richTextNodes:', richTextNodes);

          this.setData({
            richTextNodes
          })

          /* // 分批更新
					var update = {};
					var batchLength = 1000;
					console.log(batchLength);
					for(var i=0; i<richTextNodes.length; i++){
						update['richTextNodes.' + i] = richTextNodes[i];
						if(i%batchLength === batchLength - 1){
							console.log(update);
							this.setData(update);
							update = {};
						}
					}
					this.setData(update);
					update = {}; */
        }
      }
    },
    imageLoad(e) {
      var $width = e.detail.width, //获取图片真实宽度
        $height = e.detail.height,
        ratio = $width / $height //图片的真实宽高比例
      let images = this.data.images
      if (e.target.dataset.shrink === 'wemark_inline_image_tagImg') {
        const height = 20
        const width = height * ratio
        images[e.target.dataset.src] = {
          height: height + 'px',
          width: width + 'px'
        }
      } else {
        const width = windowWidth - 20
        const height = $width / ratio
        images[e.target.dataset.src] = {
          height: height + 'px',
          width: width + 'px'
        }
      }
      this.setData({
        images: images
      })
    }
  }
})
