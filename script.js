class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
       
        this.tracker =
            this.slider.querySelector(".slider-track");
        
            this.originalSlides =
            Array.from(this.tracker.children);
        
            this.prevBtn =
            this.slider.querySelector(".prev");
        
            this.nextBtn =
            this.slider.querySelector(".next");
        this.dotsContainer =
            this.slider.querySelector(".slider-dots");
       
            this.currentIndex = 1;
        this.autoSlide = null;
        this.isMoving = false;
        this.createClones();
        this.slides =
        
        Array.from(this.tracker.children);
        this.init();
    }


    createClones() {

        const firstClone =
            this.originalSlides[0].cloneNode(true);

        const lastClone =
            this.originalSlides[
                this.originalSlides.length - 1
            ].cloneNode(true);

        this.tracker.appendChild(firstClone);

        this.tracker.insertBefore(
            lastClone,
            this.tracker.firstChild
        );
    }


    init() {

        this.createDots();

        this.bindEvents();

        this.updateSlidePosition(false);

        this.startAutoSlide();
    }


    createDots() {
        this.dotsContainer.innerHTML = "";
        this.originalSlides.forEach(
            (slide, index) => {
                const dot =
                    document.createElement("button");
                dot.classList.add("dot");
                dot.type = "button";
                dot.setAttribute(
                    "aria-label",
                    `Go to slide ${index + 1}`
                );
                dot.addEventListener(
                    "click",
                    () => {
                        this.goToSlide(index);

                    }
                );
                this.dotsContainer.appendChild(dot);
            }
        );
        this.dots =
            Array.from(
                this.dotsContainer
                    .querySelectorAll(".dot")
            );
    }


    updateSlidePosition(animate = true) {
        if (animate) {
            this.tracker.style.transition =
                "transform 0.6s ease-in-out";
        } else {

            this.tracker.style.transition =
                "none";
        }
        const offset =
            -this.currentIndex * 100;
        this.tracker.style.transform =
            `translateX(${offset}%)`;
        this.updateDots();
    }


    nextSlide() {

        if (this.isMoving) return;

        this.isMoving = true;

        this.currentIndex++;

        this.updateSlidePosition(true);
    }


    prevSlide() {

        if (this.isMoving) return;

        this.isMoving = true;

        this.currentIndex--;

        this.updateSlidePosition(true);
    }


    goToSlide(index) {

        if (this.isMoving) return;

        this.isMoving = true;

        this.currentIndex =
            index + 1;

        this.updateSlidePosition(true);
    }


    handleTransitionEnd() {

        if (
            this.currentIndex ===
            this.slides.length - 1
        ) {

            this.currentIndex = 1;

            this.updateSlidePosition(false);

        }

        else if (
            this.currentIndex === 0
        ) {

            this.currentIndex =
                this.originalSlides.length;

            this.updateSlidePosition(false);
        }
        this.isMoving = false;

        this.updateDots();
    }


    updateDots() {

        if (!this.dots) return;

        let realIndex =
            this.currentIndex - 1;

        if (realIndex < 0) {

            realIndex =
                this.originalSlides.length - 1;
        }

        if (
            realIndex >=
            this.originalSlides.length
        ) {

            realIndex = 0;
        }

        this.dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === realIndex
                );

            }
        );
    }


    startAutoSlide() {

        clearInterval(this.autoSlide);

        this.autoSlide =
            setInterval(() => {

                this.nextSlide();

            }, 5000);
    }

    stopAutoSlide() {

        clearInterval(this.autoSlide);
    }


    bindEvents() {

        this.nextBtn.addEventListener(
            "click",
            () => {

                this.stopAutoSlide();

                this.nextSlide();

                this.startAutoSlide();
            }
        );


        this.prevBtn.addEventListener(
            "click",
            () => {

                this.stopAutoSlide();

                this.prevSlide();

                this.startAutoSlide();
            }
        );


        this.tracker.addEventListener(
            "transitionend",
            () => {

                this.handleTransitionEnd();

            }
        );


        this.slider.addEventListener(
            "mouseenter",
            () => {

                this.stopAutoSlide();

            }
        );


        this.slider.addEventListener(
            "mouseleave",
            () => {

                this.startAutoSlide();

            }
        );
    }
}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        new ImageSlider(".slider");

    }
);