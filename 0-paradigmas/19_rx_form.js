;
/*((c, d)=> {
  c('**********Formulario Reactivo con VanillaJS**********')

  const form = d.forms[0],
    inputs = d.querySelectorAll('[required]')

  c(inputs)

  form.addEventListener('submit', e => {
    e.preventDefault()
    alert('Se ha enviado el formulario')
  })

  inputs.forEach(input => {
    let span = d.createElement('span')
    span.id = input.name
    input.insertAdjacentElement('afterend', span)

    input.addEventListener('keyup', e => {
      if ( input.pattern ) {
        let regex = new RegExp( input.pattern )
        return ( !regex.exec(input.value) )
          ? d.querySelector(`#${input.name}`).textContent = `Formato inválido, escribe ${input.title}`
          : d.querySelector(`#${input.name}`).textContent = null
      } else {
        return ( !input.value )
          ? d.querySelector(`#${input.name}`).textContent = `${input.title} es requerido`
          : d.querySelector(`#${input.name}`).textContent = null
      }
    })
  })
})(console.log, document);*/

((c, d)=> {
  c('**********Formulario Reactivo con RxJS**********')
  //http://reactivex.io/rxjs/manual/overview.html#introduction

  const form = d.forms[0],
    inputs = d.querySelectorAll('[required]')
    formSubmit = Rx.Observable.fromEvent(form, 'submit'),
    inputsKeyup = Rx.Observable.fromEvent(d, 'keyup')

  formSubmit
    .subscribe(e => {
      e.preventDefault()
      alert('Se ha enviado el formulario')
    })


  inputs.forEach(input => {
    let span = d.createElement('span')
    span.id = input.name
    input.insertAdjacentElement('afterend', span)

    input = inputsKeyup
      .filter( e => e.target.required )
      .map( e => e.target )
      .subscribe( el => {
        if ( el.pattern ) {
          let regex = new RegExp( el.pattern )
          return ( !regex.exec(el.value) )
            ? d.querySelector(`#${el.name}`).textContent = `Formato inválido, escribe ${el.title}`
            : d.querySelector(`#${el.name}`).textContent = null
        } else {
          return ( !el.value )
            ? d.querySelector(`#${el.name}`).textContent = `${el.title} es requerido`
            : d.querySelector(`#${el.name}`).textContent = null
        }
      })
  })
})(console.log, document);