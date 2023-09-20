import {
  Form,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
} from '../../script/form'

class SignupForm extends Form {
  FIELD_NAME = {
    EMAIL: 'email',
    PASSWORD: 'password',
    PASSWORD_AGAIN: 'passwordAgain',
    ROLE: 'role',
    IS_CONFIRM: 'isConfirm',
  }

  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Занадто довге значення. Пориберіть зайве',
    EMAIL: 'Значення e-mail адреси введене не коректно',
    PASSWORD:
      'Пароль повинен складатись не менше ніж з 8 символів, включаючи малі та Великі літери (Aa-Zz) та цифри(1-9)',
    PASSWORD_AGAIN:
      'Паролі не співпадають, перевірте коректність введення паролю',
    NOT_CONFIRM: 'Ви не погоджуєтесь з правилами',
    ROLE: 'Оберіть роль',
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }
    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG
    }
    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL
      }
    }
    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value)))
        return this.FIELD_ERROR.PASSWORD
    }
    if (name === this.FIELD_NAME.PASSWORD_AGAIN) {
      if (
        String(value) !=
        this.value[this.FIELD_NAME.PASSWORD]
      )
        return this.FIELD_ERROR.PASSWORD_AGAIN
    }
    if (name === this.FIELD_NAME.IS_CONFIRM) {
      if (Boolean(value) !== true) {
        return this.FIELD_ERROR.NOT_CONFIRM
      }
    }
    if (name === this.FIELD_NAME.ROLE) {
      if (isNaN(value)) {
        return this.FIELD_ERROR.ROLE
      }
    }
  }

  submit = async () => {
    if (this.disabled === true) {
      this.validateAll()
    } else {
      console.log(this.value)

      this.setAlert('progress', 'Завантаження...')

     console.log( this.convertData())

      try {
        
        const res = await fetch('/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'aplication/json' },
          body: this.convertData(),
        })

        const data = await res.json()

        if (res.ok) {
          this.setAlert('success', data.message)
        } else {
          this.setAlert('error', data.message)
        }
      } catch (error) {
        this.setAlert('error', error.message)
      }
    }
  }

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]:
        this.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.PASSWORD]:
        this.value[this.FIELD_NAME.PASSWORD],
      [this.FIELD_NAME.ROLE]:
        this.value[this.FIELD_NAME.ROLE],
    })
  }
}

window.signupForm = new SignupForm()
