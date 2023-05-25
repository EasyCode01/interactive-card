
const inputs = document.querySelectorAll('.card__form__text__field input');
let cardHolder = document.getElementById('card__name');
let cardNumber = document.getElementById('card__number');
let cardMonth = document.getElementById('card__month');
let cardYear = document.getElementById('card__year');
let cvc = document.getElementById('card__cvc__inner');
let cardForm = document.getElementById('card__form');
let toastNotification = document.querySelector('.toast__notify');
let closeToast = document.getElementById('close__toast');

closeToast.addEventListener('click', () => {
    toastNotification.classList.remove('toast__notify__visible');
})


let toast = {
   hideTimeout:null,
   show(message, state){
    clearTimeout(this.hideTimeout)
       let toastMessage = toastNotification.querySelector('.toast__message');
        toastNotification.classList.add('toast__notify__visible');
        if(state){
            toastNotification.classList.add(`${state}`)
        }

        this.hideTimeout = setTimeout(() => {
             toastNotification.classList.remove('toast__notify__visible')
        }, 3000);
        toastMessage.innerText = message;
        

   }
}



cardForm.addEventListener('submit', (e) =>{
    inputs.forEach(input => {
     
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value.trim() === ''){
            toast.show(`All fields are required`, 'error')
            e.preventDefault();
            return;
        }

        else if(inputs[i].classList.contains('invalid')){
            toast.show(`invalid card ${inputs[i].attributes.name.value}`, 'error');
            e.preventDefault();
            return;
        }
    }

    toast.show('Successful! valid card details', 'success');
    e.preventDefault();
    setTimeout(()=>{
        window.location.href = '../thankyou.html';

    }, 3000);
      

        // let inputFieldValue = input.value.trim();
        // if(inputFieldValue === ''){
        //     toast.show(`All fields are required`, 'error')
        //     e.preventDefault();
        // }
        
        // else if(inputs[0].classList.contains('invalid')){
        //     toast.show('Invalid card details', 'error');
        //     e.preventDefault();
        // }

        // else{
        //     toast.show('Successful! valid card details', 'success');
        //     e.preventDefault();
        // }
    })
})






inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        let inputValue = e.target.value;
        let inputNameAttribute = e.target.attributes.name.value;

        if(inputNameAttribute == 'name'){
            if(inputValue.length > 23 ){
                inputValue = inputValue.slice(0, 23);
            }
            cardHolder.innerText = inputValue;
            console.log('true')
        }

        if(inputNameAttribute == 'number'){
            if(inputValue.length > 16){
                inputValue = inputValue.slice(0, 16);
            }

            cardNumber.innerText = inputValue;

        }

        if(inputNameAttribute == 'month'){
            if(inputValue.length > 2){
                inputValue = inputValue.slice(0, 2);
            }

            cardMonth.innerText = inputValue;
        }
        
        if(inputNameAttribute == 'year'){
            if(inputValue.length > 2){
                inputValue = inputValue.slice(0, 2);
            }

            cardYear.innerText = inputValue;
        }

        if(inputNameAttribute == 'cvc'){
            if(inputValue.length > 3){
                inputValue = inputValue.slice(0, 3);
            }

            cvc.innerText = inputValue;
        }
        validateCardForm(e.target, patterns[inputNameAttribute]);
    })
});




function validateCardForm(field, regExp){
    if(regExp.test(field.value)){
        field.className = 'valid';
    }
    else{
        field.className = 'invalid';
    }
}

// validate card form input 


const patterns = {
    name:/^[a-zA-Z\s]{3,23}$/,
    number:/^[\d]{16}$/,
    month:/^[0-1][1-9]$/,
    year:/^[2][3-5]$/,
    cvc:/^[0-9]{3}$/
}


