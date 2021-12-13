
export const campoRequerido = (x) => {
    if (x.trim().length > 0) {
      return true;
    } else {
      return false;
    }
  };
  
  export function validarUrl(input) {
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if (
      input.value.trim() != "" &&
      patron.test(input.value.trim(input.value.trim()))
    ) {
      input.className = "form-control rounded-pill border-1 is-valid";
      return true;
    } else {
      input.className = "form-control rounded-pill border-1 is-invalid";
      return false;
    }
  }

  export function validarEmail(x) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x)) {
      
      return true;
    } else {
     
      return false;
    }
  }

  

  