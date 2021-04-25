import Swal from 'sweetalert2'

export const errorCallBack = async (title = "มีบางอย่างผิดพลาด...", text = "มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง!") => {
    return Swal.fire({
        confirmButtonText: 'ตกลง!',
        icon: 'error',
        title: title,
        text: text,
    })

};

export const confirmCallBack = async (title = "คุณแน่ใจไหม?", text = "ข้อความจากระบบ") => {
    return await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    })
};


export const closeShowLoading = async () => {
    return Swal.close()
};

