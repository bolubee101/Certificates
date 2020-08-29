
// Typing animation (sort of)
let sunkanmi_temp = 0;
const speed = 100;
const text = 'Thank you for all your efforts and work as a member of DSC Unilag!';
const paragraph = document.querySelector("#thanks");


window.onload = function typingAnimation(){
    if(sunkanmi_temp < text.length){
        paragraph.textContent += text.charAt(sunkanmi_temp);
        sunkanmi_temp++;
        setTimeout(typingAnimation, speed);
    }
    else{
        //animate conffetti
    }
}