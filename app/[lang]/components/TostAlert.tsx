"use client"

import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function AccountSidebar(props: any) {

    const MySwal = withReactContent(Swal);
    const topMessageAlart = () => {
        MySwal.fire({
            icon: "success",
            title: 'Example notification text.',
            toast: true,
            position: props.lang == 'ar' ? 'top-start' : 'top-end',
            showConfirmButton: false,
            timer: 15000,
            showCloseButton: true,
            background: '#004B7A',
            color: '#FFFFFF',
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
        });
    };

    return (
        <>

        </>
    );
}