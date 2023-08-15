
export const firebaseLogInErrorTextToLocalString = (errorText) => {
    switch (errorText) {
        case 'Firebase: Error (auth/user-not-found).':
            return 'ไม่พบผู้ใช้งานนี้';
        case 'Firebase: Error (auth/wrong-password).':
            return 'รหัสผ่านไม่ถูกต้อง';
        case 'Firebase: Error (auth/network-request-failed).':
            return 'เครือข่ายมีปัญหา กรุณาลองใหม่อีกครั้ง';
        default:
            return 'บางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง';
    }
}

export const firebaseSignUpErrorTextToLocalString = (errorText) => {
    switch (errorText) {
        case 'Firebase: Error (auth/email-already-in-use).':
            return 'อีเมลนี้มีผู้ใช้งานแล้ว';
        case 'Firebase: Error (auth/network-request-failed).':
            return 'เครือข่ายมีปัญหา กรุณาลองใหม่อีกครั้ง';
        default:
            return 'บางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง';
    }
}