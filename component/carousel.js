export default class Carousel {
  constructor(container, images, options = {}) {
    this.container = container;
    this.images = images;
    this.currentIndex = 0;

    //自定义
    this.options = {
      //默认
      showButtons: true, //按钮
      showIndicator: true, //指示点
      autoPlay: true, //自动播放
      autoPlayInterval: 3000, //间隔
      customStyles: {}, //自定义样式
      //若传入则会进行覆盖
      ...options,
    };

    this.init();
  }

  init() {
    const carousel = document.createElement("div");
    carousel.className = "carousel";

    const carouselInner = document.createElement("div");
    carouselInner.className = "carousel-inner";

    this.images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      carouselInner.appendChild(img);
    });

    carousel.appendChild(carouselInner);//注意挂载顺序，先挂载容器
    //在后面挂载会因为平移后引起重排，而使浏览器按元素位置自动重新计算元素层级，从而使容器覆盖按钮，无法监听点击

    if (this.options.showButtons) {
      const prevButton = document.createElement("button");
      prevButton.className = "prev";
      prevButton.textContent = "<";

      const nextButton = document.createElement("button");
      nextButton.className = "next";
      nextButton.textContent = ">";

      carousel.appendChild(prevButton);
      carousel.appendChild(nextButton);

      this.prevButton = prevButton;
      this.nextButton = nextButton;
    }

    if (this.options.showIndicator) {
      const indicators = document.createElement("div");
      indicators.className = "indicators";
      this.indicatorArr = [];

      this.images.forEach((_, index) => {
        const indicator = document.createElement("span");
        indicator.className = "indicator";
        if (index === this.currentIndex) {
          indicator.classList.add("active");
        }
        indicator.dataset.index = index;//储存每个索引，便于点击获取
        indicators.appendChild(indicator);
        this.indicatorArr.push(indicator);
      });

      carousel.appendChild(indicators);

      this.indicators = indicators
    }
    this.container.appendChild(carousel);
    this.carouselInner = carouselInner;

    this.addEventListeners();

    //应用样式
    Object.keys(this.options.customStyles).forEach((key) => {
      carousel.style[key] = this.options.customStyles[key];
    });
    //有平移属性时添加过渡
    this.carouselInner.style.transition = "transform 0.5s ease-in-out";

    if (this.options.autoPlay) {
      this.startAutoPlay();
    }
  }

  updateCarousel() {
    const offset = -this.currentIndex * 100;
    this.carouselInner.style.transform = `translateX(${offset}%)`;

    if (this.options.showIndicator) {
      this.indicatorArr.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === this.currentIndex);
      });
    }
    //如果有回调函数传入，将当前索引返回给回调函数
    if (this.options.onSlideChange) {
      this.options.onSlideChange(this.currentIndex);
    }
  }

  addEventListeners() {
    if (this.options.showButtons) {
      this.prevButton.addEventListener("click", () => {
        this.currentIndex = this.currentIndex > 0  ? this.currentIndex - 1 : this.images.length - 1;
        // this.currentIndex--
        this.updateCarousel();
      });
      
      this.nextButton.addEventListener("click", () => {
        this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
        // this.currentIndex++
        console.log(this.currentIndex,'next')
        this.updateCarousel();
      });
    }

    if (this.options.showIndicator) {
      this.indicators.addEventListener("click", (e) => {
        this.currentIndex = parseInt(e.target.dataset.index, 10);
        this.updateCarousel();
      })
    }

    this.container.addEventListener("mouseover", () => clearInterval(this.autoPlayInterval));
    this.container.addEventListener("mouseout", () => this.startAutoPlay());
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
      // this.currentIndex++ 
      this.updateCarousel();
    }, this.options.autoPlayInterval);
  }
}
