import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsDashLg, BsPlusLg } from 'react-icons/bs'

// import { sendCollection } from '../../services/sendCollection'

function AddCollection() {
  const [fieldNumber, setFieldNumber] = useState(3)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return <></>
}
export default AddCollection
