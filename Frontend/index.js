function submitData(){
    let firstNameDOM = document.querySelector('input[name="firstname"]');
    let lastNameDOM = document.querySelector('input[name="lastname"]');
    let ageDOM = document.querySelector('input[name="age"]');

    let genderDOM = document.querySelector('input[name="gender"]');
    let interestsDOM = document.querySelectorAll('input[name="interest"]:checked');

    let descriptionDOM = document.querySelector('textarea[name="description"]');

    let interest = ''
    for (let i = 0; i <interestsDOM.length; i++){
        interest += interestsDOM[i].value
        if( i != interestsDOM.length - 1){
            interest += ','
        }
    }
    let userData = {
        firstName: firstNameDOM.value,
        lastName: lastNameDOM.value,
        age: ageDOM.velue,
        gender: genderDOM.value,
        description: descriptionDOM.value,
        interest : interest
    }
    console.log('submit data',userData)
}