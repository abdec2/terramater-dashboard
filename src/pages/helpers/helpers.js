import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


export const errorMsg = (msg) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg
    })
}

export const successMsg = (msg) => {
    Swal.fire({
        icon: 'success',
        title: 'Congratulation!',
        text: msg
    })
}