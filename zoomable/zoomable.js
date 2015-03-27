$.fn.zoomable = function() {
  return this.each(function() {
    new $.Zoomable(this);
  });
};

$.Zoomable = function(el) {
  this.$el = $(el);
  this.boxSize = 50;
  this.borderWidth = 2;
  this.$el.parent().one('change', function () {
    this.$el.outerHeight(this.$el.find('img').outerHeight);
  }.bind(this));
  this.$el.on('mouseenter', this.showFocusBox.bind(this));
  this.$el.on('mouseenter', function() {
    console.log("we bound a function");
  });
  this.$el.on('mouseleave', this.removeFocusBox.bind(this));
};

$.Zoomable.prototype = {
  showFocusBox: function (event) {
    console.log('wazzup!');
    var $fb = this.$focusBox = $('<div class="focus-box"></div>');
    var coords = this.limitBox(event);
    $fb.css({
      width: this.boxSize - this.borderWidth * 2 + "px",
      height: this.boxSize - this.borderWidth * 2 + "px",
      left: coords.x + "px",
      top: coords.y + "px",
      border: this.borderWidth + "px solid purple"
    });
    this.$el.append($fb);
    this.$el.on('mousemove', this.moveFocusBox.bind(this));
    this.showZoom();
  },

  showZoom: function() {
    var $zi = this.$zi = $('<div class="zoomed-image"></div>');
    $('body').append($zi);
    var bigsize = $(window).height();
    $zi.css({
      "width": bigsize,
      "height": bigsize,
      "background-image": "url('" + this.$el.find('img').attr("src") +"')",
      "background-size": (100 * bigsize / this.boxSize) +"%",
    });
    // $zi.css({
    //   "width": bigsize + "px",
    //   "height": bigsize + "px"
    // })
    this.moveZoom();
  },

  moveZoom: function () {
    var x = 100 * (parseInt(this.$focusBox.css('left')) - this.$el.offset().left) / this.$el.width();
    var y = 100 * (parseInt(this.$focusBox.css('top')) - this.$el.offset().top) / this.$el.height();
    this.$zi.css("background-position", x + "% " + y + "%");
  },


// write some code
  removeFocusBox: function(event) {
    this.$focusBox.remove();
    this.$zi.remove();
    this.$el.off('mousemove');
  },

  moveFocusBox: function(event) {
    var coords = this.limitBox(event);
    this.$focusBox.css({
      left: coords.x + "px",
      top: coords.y + "px"
    });
    this.moveZoom();
  },

  limitBox: function(event) {
    return {
      x: this.limitRange(
        event.pageX - this.boxSize / 2,
        this.$el.offset().left,
        this.$el.offset().left + this.$el.outerWidth() - this.boxSize
      ),

      y: this.limitRange(
        event.pageY - this.boxSize / 2,
        this.$el.offset().top,
        this.$el.offset().top + this.$el.outerHeight() - this.boxSize
      )
    };
  },

  limitRange: function(num, min, max) {
    if (num < min) {
      return min;
    } else if (num < max) {
      return num;
    } else {
      return max;
    }
  }
};
