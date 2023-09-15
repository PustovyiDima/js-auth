class FieldSelect {
  static toggle = (target) => {
    const option = target.nextElementSibling
    option.toggleAttribute('active')

    setTimeout(() => {
      window.addEventListener(
        'click',
        (e) => {
          if (!option.parentElement.contains(e.target)) {
            option.removeAttribute('active')
          }
        },
        {
          once: true,
        },
      )
    })
  }

  static change = (target) => {
    const parent = target.parentElement.parentElement
    const list = target.parentElement
    const active = list.querySelector('*[active]')

    if (active) {
      active.toggleAttribute('active')
    }

    target.toggleAttribute('active')

    const value = parent.querySelector('.field__value')

    if (value) {
      value.innerText = target.innerText
      value.classList.remove('field__value--placeholder')
      list.toggleAttribute('active')
    }
  }
}
window.fieldSelect = FieldSelect
