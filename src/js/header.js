export default function(){
    const headerBtn = document.querySelector('.header__btn'),
        headerAbs = document.querySelector('.header__abs'),
        headerList = document.querySelector('.header__list');
    
    headerBtn.addEventListener('click', openClose);
    function openClose(){
        const bool = !headerBtn.classList.contains('active');
        headerBtn.classList[bool ? 'add' : 'remove']('active');
        headerAbs.classList[bool ? 'add' : 'remove']('active');
        headerList.classList[bool ? 'add' : 'remove']('active');
        document.body.classList[bool ? 'add' : 'remove']('hidden');
    }
    headerAbs.addEventListener('click', openClose);
}