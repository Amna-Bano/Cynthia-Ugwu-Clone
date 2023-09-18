const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
var menu = document.querySelector("#menu")
var rightnav = document.querySelector("#rightNav")
var cursor = document.querySelector("#minicircle")

menu.addEventListener("click", function(){
    menu.style.opacity = 0;
    rightnav.style.opacity = 1;
    rightnav.style.marginTop = 0
});
var timeout;
function circleSkew(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;
        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(() => {
            cursor.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
        }, 100);
    })
} 
circleSkew();
 
function circleMouseFollower(xscale, yscale){
window.addEventListener("mousemove", function(dets){
    cursor.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
});
}
circleMouseFollower();
document.querySelectorAll(".mid").forEach(function(mid){
    var rotate = 0;
    var diffRotate = 0;

    mid.addEventListener("mousemove", function(details){

        cursor.style.scale = 5;
        diffRotate = details.clientX - rotate;
        rotate = details.clientX;
        var diff = details.clientY - mid.getBoundingClientRect().top ;

        gsap.to(mid.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            left: details.clientX,
            top: diff,
            rotate: gsap.utils.clamp(-20, 20, diffRotate* 0.5)
        })
    });
    mid.addEventListener("mouseleave", function(){
        cursor.style.scale = 1;
        gsap.to(mid.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration:0.5
        })
    });
})

function landingPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        opacity: 0,
        y: "-10",
        duration: 1.5,
        ease: Expo.easeInOut
    });
    tl.to(".boundingelem", {
        y:"0",
        duration: 1.5,
        ease: Power2,
        delay: -1

    });
    tl.to(".boundingelem2", {
        y:"0",
        duration: 2,
        stagger: .2,
        ease: Expo.easeInOut,
        delay: -1

    });
    tl.from("#bottom", {
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
        delay: -1.5
    });
}

landingPageAnim()