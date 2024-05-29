/* Product Showcase */
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.imgButton button');
    const showcaseImage = document.getElementById('showcaseImage');
    const productSection = document.querySelector('.product'); 

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const photo = this.getAttribute('data-photo');
            switch (photo) {
                case 'photo1':
                    showcaseImage.src = 'imgPsAllenKey.png';
                    productSection.style.backgroundColor = '#1e3e67'; 
                    break;
                case 'photo2':
                    showcaseImage.src = 'imgPsBmcFrame.png';
                    productSection.style.backgroundColor = '#88908e'; 
                    break;
                case 'photo3':
                    showcaseImage.src = 'imgPsGiroHelmet.png';
                    productSection.style.backgroundColor = '#161817'; 
                    break;
                case 'photo4':
                    showcaseImage.src = 'imgPsRynoxTailBag.png';
                    productSection.style.backgroundColor = '#161817'; 
                    break;
                case 'photo5':
                    showcaseImage.src = 'imgPsShinanoCogs.png';
                    productSection.style.backgroundColor = '#d63f3e'; 
                    break;
            }
        });
    });
});